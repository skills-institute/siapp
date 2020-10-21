import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  gradientView: {
    flex: 1,
    width,
  },
  container: {
    flex: 1,
    marginTop: 8,
    marginBottom: 10,
    flexDirection: 'column',
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  playerInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'transparent',
  },
  playerView: {
    flex: 3,
    marginTop: 15,
  },
  infoView: {
    flex: 2,
  },
  exitButtonStyle: {
    height: 20,
    width: 20,
    marginRight: 20,
  },
  exitButtonViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 40,
    width: 40,
  },
});
