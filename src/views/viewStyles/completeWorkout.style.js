import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingTop: 10,
  },
  iconStyle: {
    height: 40,
    width: 40,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Regular',
    color: '#FFFFFF',
  },
  completionText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'WorkSans-Regular',
    color: '#FFFFFF',
    opacity: 0.8,
    textAlign: 'center',
  },
  buttonView: {
    backgroundColor: '#2C2C2C',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.70,
    borderRadius: 20,
    height: 40,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'WorkSans-Regular',
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
  trophyStyle: {
    height: 81,
    width: 81,
    backgroundColor: 'blue',
  },
  ringStyle: {
    height: 250,
    width: 250,
    backgroundColor: 'transparent',
  },
});
