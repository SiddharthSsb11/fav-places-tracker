import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 4,
    backgroundColor: Colors.primary100,
    borderRadius: 4
  }
});

export default styles;
