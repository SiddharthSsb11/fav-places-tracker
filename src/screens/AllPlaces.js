import {useLayoutEffect, useEffect, useState} from 'react';
import PlacesList from '../components/Places/PlacesList';
import IconButton from '../components/UI/IconButton';
import {useIsFocused} from '@react-navigation/native';

const AllPlaces = ({navigation, route}) => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedPlaces(curPlaces => [...curPlaces, route.params.place]);
    }
  }, [isFocused, route]);

  const addIconPressHandler = () => {
    navigation.navigate('AddPlace');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({tintColor}) => {
        return (
          <IconButton
            onPress={addIconPressHandler}
            color={tintColor}
            size={26}
            icon="circle-with-plus"
          />
        );
      }
    });
  }, [navigation, addIconPressHandler]);

  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
