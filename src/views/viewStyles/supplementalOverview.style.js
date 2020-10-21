import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#232323',
  },
  imageStyle: {
    width: width - 2,
    height: width * 0.5625,
  },
  startWorkoutView: {
    backgroundColor: '#41E893',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.70,
    borderRadius: 20,
    height: 40,
  },
  startWorkoutText: {
    color: '#4A4A4A',
    backgroundColor: 'transparent',
  },
  iconStyle: {
    height: 17,
    width: 20,
  },
  playButtonStyle: {
    height: 27,
    width: 27,
    marginRight: 10,
  },
  subHeaderText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  iconText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    backgroundColor: 'transparent',
    opacity: 0.7,
  },
  attemptsView: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  ratingView: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  tabBarStyle: {
    flexDirection: 'row',
    width: width * 0.80,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockIconStyle: {
    height: 14,
    width: 14,
  },
  tabPhaseText: {
    flex: 1,
    color: '#FFFFFF',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    fontWeight: '500',
  },
  attemptsAndRatingTexts: {
    color: '#FFFFFF',
    fontFamily: 'WorkSans-Regular',
    fontSize: 11,
    backgroundColor: 'transparent',
    opacity: 0.7,
  },
  workoutText: {
    color: '#959595',
    backgroundColor: 'transparent',
    fontFamily: 'WorkSans-Regular',
    fontSize: 14,
  },
  keyFramePlayButton: {
    position: 'absolute',
    top: (width * 0.5625 * 0.50) - 13,
    left: (width * 0.50) - 13,
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    width: 32,
  },
  supplementalHeader: {
    backgroundColor: 'transparent',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'WorkSans-Regular',
    color: '#41E893',
    marginTop: 15,
    marginBottom: 15,
    paddingLeft: 15,
  },
  supplementalText: {
    fontSize: 15,
    fontFamily: 'WorkSans-Regular',
    color: '#FFFFFF',
    paddingLeft: 15,
    paddingBottom: 15,
  },
  supplementalDividerView: {
    marginTop: 10,
    backgroundColor: '#000000',
    height: 5,
    width,
  },
  supplementalImageStyle: {
    width: 80,
    height: 80,
  },
  supplementalView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
});
