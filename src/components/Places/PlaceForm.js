import {useCallback, useState} from 'react';
import {View, Text, ScrollView, TextInput} from 'react-native';
import styles from './PlaceForm.styles';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../UI/Button';
import {Place} from '../../models/place';

const PlaceForm = ({onCreatePlace}) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  const onChangeTextHandler = enteredText => {
    setEnteredTitle(enteredText);
  };

  const takeImageHandler = imageUri => {
    setSelectedImage(imageUri);
  };

  const pickLocationHandler = useCallback(location => {
    //usecallback to avoid fn pickedLocation recreated unnecesarily and avoid futher loop of useffct in locationpicker
    setPickedLocation(location);
  }, []);

  const savePlaceHandler = () => {
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
    onCreatePlace(placeData);
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Label</Text>
        <TextInput
          onChangeText={onChangeTextHandler}
          value={enteredTitle}
          style={styles.input}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Submit</Button>
    </ScrollView>
  );
};

export default PlaceForm;
