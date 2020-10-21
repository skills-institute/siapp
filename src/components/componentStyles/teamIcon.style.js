import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: width * 0.80,
  },
  text: {
    fontSize: 11,
    color: '#FFFFFF',
    fontFamily: 'WorkSans-Regular',
  },
  team: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamIconView: {
    marginBottom: 5,
    height: 79,
    width: 79,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
  },
  teamImageStyle: {
    borderRadius: 8,
    height: 75,
    width: 75,
  },
});
