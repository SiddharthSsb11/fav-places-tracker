import {useEffect} from 'react';
import PlaceForm from '../components/Places/PlaceForm';
// import {useRoute} from '@react-navigation/native';

const AddPlace = ({navigation, route}) => {
  // const route = useRoute();

  if (route.params?.imageData) {
    const dataReceived = route.params.imageData;
    console.log('Data received:', dataReceived);
    // Now you can use the received data in your component
  }

  useEffect(() => {
    // Check if dataToSendBack exists in route.params
    if (route.params?.imageData) {
      const dataReceived = route.params.imageData;
      console.log('Data received:', dataReceived);
      // Now you can use the received data in your component
    }
  }, []);

  return <PlaceForm />;
};

export default AddPlace;
