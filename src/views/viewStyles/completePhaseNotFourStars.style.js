import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textStyle: {
    fontSize: 14,
    color: '#9B9B9B',
    fontFamily: 'WorkSans-Regular',
    backgroundColor: 'transparent',
  },
  headerTextStyle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ce0e2d',
    fontFamily: 'WorkSans-Regular',
    backgroundColor: 'transparent',
  },
  skillsTextStyle: {
    fontSize: 48,
    color: '#9B9B9B',
    fontFamily: 'Roboto-Regular',
    backgroundColor: 'transparent',
  },
  imageStyle: {
    width: width * 0.50,
    height: height * 0.50 * 0.5625,
  },
  completeText: {
    fontSize: 18,
    color: '#4A4A4A',
    fontFamily: 'WorkSans-Regular',
    backgroundColor: 'transparent',
  },
  confidenceText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ce0e2d',
    fontFamily: 'Roboto-Regular',
    backgroundColor: 'transparent',
  },
  improveStyle: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'WorkSans-Regular',
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  exerciseTitleStyle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular',
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  supplementalHeader: {
    backgroundColor: 'transparent',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'WorkSans-Regular',
    color: '#ce0e2d',
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
  lockIconStyle: {
    height: 16,
    width: 16,
  }
});
