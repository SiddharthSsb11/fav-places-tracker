import {useEffect, useLayoutEffect, useState} from 'react';
import {ScrollView, Image, View, Text, StyleSheet} from 'react-native';

import OutlinedButton from '../components/UI/OutlinedButton';
import {useIsFocused} from '@react-navigation/native';
import styles from './PlaceDetails.styles';

const PlaceDetails = ({route, navigation}) => {
  const [fetchedPlace, setFetchedPlace] = useState();

  const isFocused = useIsFocused();

  const showOnMapHandler = () => {
    navigation.navigate('Map', {
      initialLat: fetchedPlace.location.lat,
      initialLng: fetchedPlace.location.lng
    });
  };

  useEffect(() => {
    if (isFocused && route.params?.place) {
      const place = route.params.place;
      console.log('--place placeDetails--', place);
      setFetchedPlace(place);
    }
  }, [route, isFocused]);

  useLayoutEffect(() => {
    // dynamically setting navigation options
    navigation.setOptions({
      title: fetchedPlace?.title
    });
  }, [fetchedPlace]);

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: fetchedPlace.imageUri}} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;
