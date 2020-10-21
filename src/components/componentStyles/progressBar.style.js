import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  dayWithBorder: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#454545',
    padding: 5,
    borderRadius: 5,
  },
  dayWithoutBorder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  textDate: {
    alignSelf: 'center',
    fontSize: 11,
    color: '#6D6D6D',
    fontFamily: 'WorkSans-Regular',
  },
  textMonth: {
    alignSelf: 'center',
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'WorkSans-Regular',
  },
  textStatus: {
    alignSelf: 'center',
    fontSize: 12,
    color: '#9B9B9B',
    fontFamily: 'WorkSans-Regular',
  },
  imageStyle: {
    height: 18,
    width: 18,
  },
  imageXStyle: {
    height: 8,
    width: 8,
  },
});
