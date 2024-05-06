import {Text, View, FlatList} from 'react-native';
import PlaceItem from './PlaceItem';
import styles from './PlacesList.styles';
import {useNavigation} from '@react-navigation/native';

const PlacesList = ({places}) => {
  const navigation = useNavigation();

  // todo: flashlist implementation

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  const selectedPLaceHandler = item => {
    navigation.navigate('PlaceDetails', {
      place: item
    });
  };

  const placeRenderItem = ({item}) => {
    return (
      <PlaceItem place={item} onPress={selectedPLaceHandler.bind(this, item)} />
    );
  };

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={item => item.id}
      renderItem={placeRenderItem}
    />
  );
};

export default PlacesList;
