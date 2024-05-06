import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import styles from './PlaceItem.styles';

const PlaceItem = ({place, onPress}) => {
  return (
    <Pressable
      style={({pressed}) => [styles.item, pressed && styles.pressed]}
      onPress={onPress}>
      <Image style={styles.image} source={{uri: place.imageUri}} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;
