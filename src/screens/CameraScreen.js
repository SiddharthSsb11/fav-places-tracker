import {useEffect, useLayoutEffect, useRef, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  StatusBar,
  Button,
  Alert
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission
} from 'react-native-vision-camera';
import styles from './CameraScreen.styles';
import IconButton from '../components/UI/IconButton';

const CameraScreen = ({route, navigation}) => {
  const [isCameraView, setIsCameraView] = useState(false);
  const [imageData, setImageData] = useState('');
  const cameraRef = useRef(null);

  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');

  const takePicture = async () => {
    if (cameraRef.current && isCameraView) {
      const photo = await cameraRef.current.takePhoto({
        quality: 0.5
      });
      setImageData(photo.path);
    }
    setIsCameraView(false);
  };

  const openCamera = () => {
    if (!hasPermission) {
      requestPermission();
    }
    if (hasPermission) {
      setIsCameraView(true);
    }
  };

  useEffect(() => {
    openCamera();
  }, []);

  const saveClickedImageHandler = useCallback(() => {
    //avoiding function loop
    if (!imageData) {
      Alert.alert('No Image clicked!', 'You have to click an image first!');
      return;
    }

    navigation.navigate('AddPlace', {
      imageData: imageData
      // merge: true, // Merge the current route params with the new ones
    });
  }, [navigation, imageData]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: !isCameraView, // Hide the header for CameraScreen
      //  headerLeft: () => null
      headerRight: ({tintColor}) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={saveClickedImageHandler}
        />
      )
    });
  }, [navigation, isCameraView, saveClickedImageHandler]);

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
