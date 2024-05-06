import {useEffect, useState} from 'react';

import {View, Alert, PermissionsAndroid, Text, Image} from 'react-native';
import OutlinedButton from '../UI/OutlinedButton';
import styles from './LocationPicker.styles';
import Geolocation from 'react-native-geolocation-service';
import {useNavigation, useRoute, useIsFocused} from '@react-navigation/native';
import {getMapPreview, getAddress} from '../../util/location';

const LocationPicker = ({onPickLocation}) => {
  const [pickedLocation, setPickedLocation] = useState();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();

  const verifyPermission = async () => {
    try {
      const status = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

      if (!status) {
        const requestResult = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (requestResult === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the location');
          return true;
        } else {
          console.log('location permission denied');
          Alert.alert(
            'Insufficient Permissions!',
            'You need to grant location permissions to use this app feature.'
          );
          return false;
        }
      } else {
        console.log('---already status access gratned---');
        return true;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        console.log('--positions---', position);
        setPickedLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
    );
  };

  useEffect(() => {
    if (isFocused && route.params?.pickedLat && route.params?.pickedLng) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    const handleLocation = async () => {
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation.lat,
          pickedLocation.lng
        );
        onPickLocation({...pickedLocation, address: address});
      }
    };

    handleLocation();
  }, [onPickLocation, pickedLocation]); //usecallback to onpicklocation handler in parent to avoid unnc=ecesary loop function

  const pickOnMapHandler = () => {
    navigation.navigate('Map');
  };

  let locationPreview = <Text>No location picked yet.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) // pickedLocation.lat || defaultconst, pickedLocation.lng
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <View style={{flex: 1}}>
          <OutlinedButton icon="location-pin" onPress={getLocationHandler}>
            Locate User
          </OutlinedButton>
        </View>
        <View style={{flex: 1}}>
          <OutlinedButton icon="map" onPress={pickOnMapHandler}>
            Pick on Map
          </OutlinedButton>
        </View>
      </View>
    </View>
  );
};

export default LocationPicker;
