import {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission
} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';

const ImagePicker = () => {
  const [isCameraView, setIsCameraView] = useState(false);
  //   const [imageData, setImageData] = useState('');
  //   const cameraRef = useRef(null);

  //   const {hasPermission, requestPermission} = useCameraPermission();
  //   const device = useCameraDevice('back');

  //   const openCamera = () => {
  //     if (!hasPermission) {
  //       requestPermission();
  //     }
  //     setIsCameraView(true);
  //   };

  //   const takePicture = async () => {
  //     if (cameraRef.current && isCameraView) {
  //       const photo = await cameraRef.current.takePhoto({
  //         quality: 0.5 // Adjust the quality as needed
  //       });
  //       setImageData(photo.path);
  //       console.log('Photo captured:', photo);
  //     }
  //     setIsCameraView(false);
  //   };

  //   if (!device) return <ActivityIndicator />;

  const navigation = useNavigation();

  const openCamera = () => {
    navigation.navigate('Camera');
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <TouchableOpacity
        onPress={openCamera}
        style={{backgroundColor: 'white', padding: 15, borderRadius: 10}}>
        <Text style={{color: 'black'}}>Take Picture</Text>
      </TouchableOpacity>
    </View>
  );
  //   return (
  //     <View style={{flex: 1}}>
  //       {isCameraView ? (
  //         <View style={{flex: 1}}>
  //           <Camera
  //             style={StyleSheet.absoluteFill}
  //             device={device}
  //             isActive={true}
  //             ref={cameraRef}
  //             photo={true}
  //           />

  //           <TouchableOpacity
  //             onPress={takePicture}
  //             style={{
  //               position: 'absolute',
  //               bottom: 20,
  //               alignSelf: 'center',
  //               backgroundColor: 'red',
  //               borderRadius: 50,
  //               height: 50,
  //               width: 50,
  //               alignItems: 'center',
  //               justifyContent: 'center',
  //               zIndex: 1,
  //               padding: 8
  //             }}>
  //             <Text
  //               style={{
  //                 color: 'black'
  //               }}>
  //               Click
  //             </Text>
  //           </TouchableOpacity>
  //         </View>
  //       ) : (
  //         <View
  //           style={{
  //             flex: 1,
  //             alignItems: 'center',
  //             justifyContent: 'center'
  //           }}>
  //           {imageData !== '' && (
  //             <Image
  //               source={{uri: 'file://' + imageData}}
  //               style={{width: '80%', height: '60%', marginBottom: 8}}
  //             />
  //           )}
  //           <TouchableOpacity
  //             onPress={openCamera}
  //             style={{backgroundColor: 'white', padding: 15, borderRadius: 10}}>
  //             <Text style={{color: 'black'}}>Take Picture</Text>
  //           </TouchableOpacity>
  //         </View>
  //       )}
  //     </View>
  //   );
};

export default ImagePicker;
