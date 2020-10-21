import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const moduleSquareSize = width / 6.0;
const moduleBorderRadius = moduleSquareSize / 2.0;
const moduleMarginOffsetTop = 0;
const moduleMarginOffsetLeft = 4;

export default StyleSheet.create({
  moduleLocked: {
    height: moduleSquareSize,
    width: moduleSquareSize,
    borderRadius: moduleBorderRadius,
    borderWidth: moduleBorderRadius,
    borderColor: '#000000',
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moduleMarginOffsetTop,
    marginLeft: moduleMarginOffsetLeft,
  },
  moduleUnlocked: {
    height: moduleSquareSize,
    width: moduleSquareSize,
    borderRadius: moduleBorderRadius,
    borderWidth: moduleBorderRadius,
    borderColor: '#4A4A4A',
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moduleMarginOffsetTop,
    marginLeft: moduleMarginOffsetLeft,
  },
  moduleComplete: {
    height: moduleSquareSize,
    width: moduleSquareSize,
    borderRadius: moduleBorderRadius,
    borderWidth: moduleBorderRadius,
    borderColor: '#ce0e2d',
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moduleMarginOffsetTop,
    marginLeft: moduleMarginOffsetLeft,
  },
  imageStyle: {
    height: 25,
    width: 25,
  },
  lockImageStyle: {
    height: 15,
    width: 15,
  },
  moduleNameStyle: {
    fontFamily: 'WorkSans-Regular',
    fontSize: 11,
    color: '#a6a6a6',
    alignSelf: 'center',
  },
  dayStreak: {
    textAlign: 'center',
    fontFamily: 'WorkSans-Regular',
    fontSize: 9,
    color: '#FFFFFF',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 12,
  },
  progressBarStyle: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: -4,
    height: 104,
    width: 104,
  },
  moduleWithProgressStyle: {
    alignItems: 'center',
    marginLeft: 3,
    marginRight: 3,
  },
});
