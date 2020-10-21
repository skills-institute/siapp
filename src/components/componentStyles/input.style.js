import {StyleSheet, Dimensions} from 'react-native';

const containerWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  containerStyle: {
    width: containerWidth * 0.8,
    paddingTop: 10,
    paddingRight: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  dividerView: {
    width: containerWidth * 0.8,
    borderBottomColor: '#7F8288',
    borderBottomWidth: 1,
  },
  labelStyle: {
    fontSize: 11,
    height: 20,
    width: containerWidth * 0.8,
    color: '#94989E',
    backgroundColor: 'transparent',
    fontFamily: 'WorkSans-Regular',
  },
  inputStyle: {
    color: '#FFFFFF',
    paddingRight: 5,
    paddingLeft: 10,
    fontSize: 16,
    lineHeight: 23,
    height: 40,
    width: containerWidth * 0.8,
    fontFamily: 'WorkSans-Regular',
  },
});
