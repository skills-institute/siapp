import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 84,
    paddingLeft: 20,
    paddingTop: 70,
  },
  imageViewStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  imageStyle: {
    height: 58,
    width: 58,
    borderRadius: 29,
  },
  textViewStyle: {
    flex: 4,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  textStyle: {
    fontSize: 14,
    color: '#9B9B9B',
    fontFamily: 'WorkSans-Regular',
    backgroundColor: 'transparent',
  },
});
