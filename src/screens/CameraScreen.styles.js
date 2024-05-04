import {StyleSheet} from 'react-native';
import {Colors} from '../constants/colors';
const styles = StyleSheet.create({
  click: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'red',
    borderRadius: 50,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    padding: 8
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: '85%',
    marginTop: 8
  },
  image: {
    width: '85%',
    height: '70%',
    marginBottom: 16,
    borderRadius: 4
  },

  imagePreview: {
    width: '85%',
    height: '70%',
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4
  }
});

export default styles;
