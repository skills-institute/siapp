import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#000000',
    marginLeft: 20,
    marginRight: 20,
  },
  buttonStyle: {
    alignSelf: 'flex-end',
    backgroundColor: '#4BE88A',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4BE88A',
    marginLeft: 5,
    marginRight: 5,
    width: 130,
  },
  textStyle: {
    alignSelf: 'center',
    color: '#000000',
    fontSize: 14,
    fontWeight: '500',
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'WorkSans-Regular',
  },
  teamImageStyle: {
    borderRadius: 6,
    height: 35,
    width: 35,
  },
});
