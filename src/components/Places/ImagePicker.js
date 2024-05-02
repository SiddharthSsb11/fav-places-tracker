import {Text, View} from 'react-native';
import OutlinedButton from '../UI/OutlinedButton';

import {useNavigation} from '@react-navigation/native';
import styles from './ImagePicker.styles';
const ImagePicker = () => {
  const navigation = useNavigation();

  const openCamera = () => {
    navigation.navigate('Camera');
  };

  let imagePreview = <Text>No image taken yet.</Text>;

  // if (pickedImage) {
  //   imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  // }

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
