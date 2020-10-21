import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#41E893',
    alignItems: 'center',
  },
  iconStyle: {
    height: 40,
    width: 40,
    marginLeft: 3,
    marginRight: 3,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Regular',
    color: '#FFFFFF',
  },
  completionText: {
    fontSize: 18,
    fontFamily: 'WorkSans-Regular',
    color: '#FFFFFF',
    opacity: 0.8,
  },
  buttonView: {
    backgroundColor: '#000000',
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
});

export default styles;
