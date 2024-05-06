import PlaceForm from '../components/Places/PlaceForm';

const AddPlace = ({navigation, route}) => {
  // Destructure the parameters from route.params //merge-routing
  // const {imageData, pickedLat, pickedLng} = route.params || {};
  const createPlaceHandler = place => {
    navigation.navigate('AllPlaces', {
      place: place
    });
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
