import {useState} from 'react';
import {View, Text, ScrollView, TextInput, Button} from 'react-native';
import styles from './PlaceForm.styles';
import {useNavigation} from '@react-navigation/native';
import OutlinedButton from '../UI/OutlinedButton';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import {useRoute} from '@react-navigation/native';
import {useEffect} from 'react';

const PlaceForm = () => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const route = useRoute();

  const onChangeTextHandler = enteredText => {
    setEnteredTitle(enteredText);
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
      <ImagePicker />
      <LocationPicker />
    </ScrollView>
  );
};

export default PlaceForm;
