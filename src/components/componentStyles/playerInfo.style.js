import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const playerImageSquareSize = width / 4.0;
const PlayerImageBorderRadius = width / 8.0;

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  nickText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#85E482',
    fontFamily: 'Montserrat-Regular',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular',
  },
  team: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleCircle: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 2,
    left: 2,
    height: 127,
    width: 127,
  },
  innerCircle: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 1,
    left: 2,
    height: 116,
    width: 116,
  },
  imageStyle: {
    height: playerImageSquareSize,
    width: playerImageSquareSize,
    borderRadius: PlayerImageBorderRadius,
  },
  imageView: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 1,
    left: 1,
    height: 104,
    width: 104,
  },
  shadowView: {
    backgroundColor: 'transparent',
    height: 104,
    width: 104,
  },
});
