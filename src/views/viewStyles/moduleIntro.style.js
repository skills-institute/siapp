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
  playIntroText: {
    fontSize: 14,
    fontFamily: 'WorkSans-Regular',
    textAlign: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    backgroundColor: 'transparent',
  },
  subHeaderText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    backgroundColor: 'transparent',
  },
  headerText: {
    color: '#FFFFFF',
    opacity: 0.5,
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'bold',
    fontSize: 55,
    backgroundColor: 'transparent',
  },
  iconStyle: {
    height: 20,
    width: 20,
    marginBottom: 5,
  },
  playButtonStyle: {
    height: 27,
    width: 27,
    marginRight: 5,
  },
  exitButtonStyle: {
    height: 25,
    width: 25,
  },
  phaseStyle: {
    borderRadius: 100,
    height: 200,
    width: 200,
  },
  goButtonView: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ce0e2d',
    height: 64,
    width: 64,
    borderRadius: 32,
  },
  playIntroView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  attemptsView: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  ratingView: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  goView: {
    flex: 1,
    alignItems: 'center',
  },
  attemptsAndRatingTexts: {
    color: '#FFFFFF',
    fontFamily: 'WorkSans-Regular',
    fontSize: 11,
    backgroundColor: 'transparent',
    opacity: 0.7,
  },
  phaseText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'bold',
    fontSize: 30,
    backgroundColor: 'transparent',
  },
  phaseNumberText: {
    margin: -10,
    color: '#FFFFFF',
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
    fontSize: 100,
    backgroundColor: 'transparent',
  },
  exitButtonViewStyle: {
    height: 40,
    width: 40,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
