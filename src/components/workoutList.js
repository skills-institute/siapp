import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import StarRating from './starRating';
import styles from './componentStyles/workoutList.style';

const propTypes = {
  workout: PropTypes.object.isRequired,
};

const defaultProps = {};

const WorkoutList = ({workout}) => {
  const {viewStyle} = styles;
  return (
    <View style={viewStyle}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>{workout.workoutName}</Text>
        <Text
          style={[
            styles.headerText,
            {textAlign: 'right', marginRight: 10, flex: 1, color: '#fff'},
          ]}>
          Last Attempt
        </Text>
      </View>
      {workout.exercises.map((exercise) => (
        <View key={exercise.exerciseName} style={styles.workoutView}>
          <Text style={styles.workoutText}>{exercise.exerciseName}</Text>
          <StarRating onPress={() => null} rating={exercise.confidenceRating} />
        </View>
      ))}
    </View>

  );
};

WorkoutList.propTypes = propTypes;
WorkoutList.defaultProps = defaultProps;

export default WorkoutList;
