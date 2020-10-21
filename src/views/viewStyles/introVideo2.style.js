import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  linearGradient: {
    flex: 1,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  imageStyle: {
    height: 127,
    width: 185,
  },
  trackingCircleEmptyView: {
    height: 10,
    width: 10,
    marginLeft: 3,
    marginRight: 3,
    borderRadius: 5,
    backgroundColor: '#6F7276',
  },
  trackingCircleFullView: {
    height: 10,
    width: 10,
    marginLeft: 3,
    marginRight: 3,
    borderRadius: 5,
    backgroundColor: '#ce0e2d',
  },
});
