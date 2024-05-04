import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  StatusBar,
  Button
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission
} from 'react-native-vision-camera';
import styles from './CameraScreen.styles';

const CameraScreen = ({route, navigation}) => {
  const [isCameraView, setIsCameraView] = useState(false);
  const [imageData, setImageData] = useState('');
  const cameraRef = useRef(null);

  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');

  const openCamera = () => {
    if (!hasPermission) {
      requestPermission();
    }
    if (hasPermission) {
      setIsCameraView(true);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current && isCameraView) {
      const photo = await cameraRef.current.takePhoto({
        quality: 0.5
      });
      setImageData(photo.path);
    }
    setIsCameraView(false);
  };

  useEffect(() => {
    openCamera();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: !isCameraView // Hide the header for CameraScreen
      //  headerLeft: () => null
    });
  }, [navigation, isCameraView]);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('beforeRemove', e => {
  //     if (imageData) {
  //       console.log('----camera imagedata----', imageData);
  //       navigation.setParams({imageData});
  //     }
  //   });

  //   return unsubscribe;
  // }, [imageData, navigation]);

  if (!device) return <ActivityIndicator />;

  return (
    <View style={{flex: 1}}>
      {isCameraView && <StatusBar hidden />}
      {isCameraView ? (
        <>
          <Camera
            style={[StyleSheet.absoluteFill, {flex: 1}]}
            device={device}
            isActive={true}
            ref={cameraRef}
            photo={true}
          />

          <TouchableOpacity onPress={takePicture} style={styles.click}>
            <Text style={styles.text}>Click</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.buttonContainer}>
          {imageData !== '' ? (
            <Image source={{uri: 'file://' + imageData}} style={styles.image} />
          ) : (
            <Text style={styles.imagePreview}>No image taken yet.</Text>
          )}
          <View style={styles.button}>
            <Button title="Take Image" onPress={openCamera}></Button>
          </View>
        </View>
      )}
    </View>
  );
};

export default CameraScreen;
