import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    position: 'absolute',
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  textStyle: {
    marginTop: 20,
    color: 'white',
  },
  imageStyle: {
    height: 133,
    width: 99,
  },
  alertView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
