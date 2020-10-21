import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions';
import styles from './componentStyles/alertsAndStreaks.style';

const propTypes = {
  user: PropTypes.object.isRequired,
};

const defaultProps = {
  dayStreak: '0',
};

class AlertsAndStreaks extends Component {
  render() {
    const { dayStreak } = this.props.user;
    return (
      <View style={styles.container}>
        <View style={styles.streakView}>
          <Text onPress={null} style={styles.header}>{`${dayStreak}`}</Text>
          <Text onPress={null} style={styles.text}>DAY STREAK</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({ user: state.users });

AlertsAndStreaks.propTypes = propTypes;
AlertsAndStreaks.defaultProps = defaultProps;

export default connect(mapStateToProps, actions)(AlertsAndStreaks);
