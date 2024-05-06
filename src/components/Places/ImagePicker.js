import {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import OutlinedButton from '../UI/OutlinedButton';

import {useNavigation, useRoute, useIsFocused} from '@react-navigation/native';
import styles from './ImagePicker.styles';

const ImagePicker = ({onTakeImage}) => {
  const [pickedImage, setPickedImage] = useState();

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (isFocused && route.params?.imageData) {
      const pickedImageData = route.params.imageData;
      setPickedImage(pickedImageData);
      onTakeImage(`file://${pickedImageData}`);
    }
  }, [route, isFocused]);

  const openCamera = () => {
    navigation.navigate('Camera');
  };

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = (
      <Image style={styles.image} source={{uri: 'file://' + pickedImage}} />
    );
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={openCamera}>
        Take Image
      </OutlinedButton>
    </View>
  );
};
export default ImagePicker;
