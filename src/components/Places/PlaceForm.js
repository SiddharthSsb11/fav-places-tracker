import {useEffect, useState} from 'react';
import {View, Text, ScrollView, TextInput} from 'react-native';
import styles from './PlaceForm.styles';
import ImagePicker from './ImagePicker';

const PlaceForm = () => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [absoluteFill, setAbsoluteFill] = useState(false);

  const onChangeTextHandler = enteredText => {
    console.log(enteredText);
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
    </ScrollView>
  );
};

export default PlaceForm;
