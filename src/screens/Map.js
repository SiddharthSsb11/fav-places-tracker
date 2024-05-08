import {useCallback, useLayoutEffect, useState} from 'react';
import {Alert} from 'react-native';

import MapView, {Marker} from 'react-native-maps';
import IconButton from '../components/UI/IconButton';

import styles from './Map.styles';

const Map = ({navigation, route}) => {
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng
  };

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const region = {
    latitude: initialLocation ? initialLocation.lat : 28.590442602701113,
    longitude: initialLocation ? initialLocation.lng : 77.16544945398815,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const selectLocationHandler = event => {
    if (initialLocation) {
      return;
    }

    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

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
    if (initialLocation) {
      return;
    }
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
  }, [navigation, savePickedLocationHandler, initialLocation]);

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
