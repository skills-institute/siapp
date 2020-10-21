import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions';
import styles from './componentStyles/skillsMastered.style';

const propTypes = {
  user: PropTypes.object.isRequired,
};

const defaultProps = {
  skillsMastered: 0,
};

class SkillsMastered extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skillsMastered: 0,
    };
  }
  componentWillMount() {
    let moduleNumber = 0;
    let exercisesAtFour = 0;
    const tallyExercises = (phase, phaseIndex) => {
      phase.workouts.forEach((workout) => {
        workout.exercises.forEach((exercise) => {
          if (exercise.confidenceRating === 4 && phaseIndex < 3) {
            exercisesAtFour += 1;
          }
        });
      });
    };
    for (moduleNumber = 1; moduleNumber < 16; moduleNumber += 1) {
      const moduleBeingTallied = this.props.user[`module${moduleNumber}`];
      moduleBeingTallied.phases.forEach(tallyExercises);
    }
    this.setState({ skillsMastered: exercisesAtFour });
  }

  render() {
    const { skillsMastered } = this.props.user;
    return (
      <View style={styles.container}>
        <View style={styles.skillsView}>
          <Text style={styles.header}>{`${skillsMastered}`}</Text>
          <Text style={styles.text}>SKILLS MASTERED</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({ user: state.users });

SkillsMastered.propTypes = propTypes;
SkillsMastered.defaultProps = defaultProps;

export default connect(mapStateToProps, actions)(SkillsMastered);
