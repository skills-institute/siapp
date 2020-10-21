import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  header: {
    fontSize: 52,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
  },
  text: {
    fontSize: 9,
    color: '#FFFFFF',
    fontFamily: 'WorkSans-Regular',
    opacity: 0.9,
  },
  iconView: {
    flex: 1,
    alignSelf: 'flex-end',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  skillsView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
