import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingTop: 80,
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  points: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 72,
    left: 56,
    width: 90,
    textAlign: 'center',
    color: '#7591af',
    fontSize: 20,
    fontWeight: '100',
  },
  middleCircle: {
    backgroundColor: 'blue',
    position: 'absolute',
    top: 13,
    left: 13,
    height: 95,
    width: 95,
  },
  innerCircle: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 13,
    left: 13,
    width: 90,
  },
  pyramidRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
