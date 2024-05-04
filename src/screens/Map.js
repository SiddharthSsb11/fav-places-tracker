import {useCallback, useLayoutEffect, useState} from 'react';
import {Alert} from 'react-native';

import MapView, {Marker} from 'react-native-maps';
import IconButton from '../components/UI/IconButton';

import styles from './Map.styles';

const Map = ({navigation, route}) => {
  const [selectedLocation, setSelectedLocation] = useState();

  const region = {
    latitude: 28.634005967586805,
    longitude: 77.21820519329377,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const selectLocationHandler = event => {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    console.log('--lat--', lat, '--lng--', lng);
    setSelectedLocation({lat: lat, lng: lng});
  };

  const savePickedLocationHandler = useCallback(() => {
    //avoiding function loop
    if (!selectedLocation) {
      Alert.alert(
        'No location picked!',
        'You have to pick a location (by tapping on the map) first!'
      );
      return;
    }

    navigation.navigate('AddPlace', {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng
      // merge: true, // Merge the current route params with the new ones
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({tintColor}) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      )
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView
      zoomControlEnabled={true}
      zoomEnabled={true}
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}>
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
          }}
        />
      )}
    </MapView>
  );
};

export default Map;
