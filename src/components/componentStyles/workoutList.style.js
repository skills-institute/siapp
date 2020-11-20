import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerView: {
    backgroundColor: '#404040',
    width,
    height: 22,
    justifyContent: 'center',
    paddingLeft: 10,
    marginBottom: 5,
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'WorkSans-Regular',
    color: '#fff',
  },
  workoutView: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#232323',
    width,
    height: 34,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
  },
  workoutText: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'WorkSans-Regular',
    color: '#FFFFFF',
  },
});
