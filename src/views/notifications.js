import React, { Component } from 'react';
import {
  View,
} from 'react-native';
/* eslint-disable import/extensions */
import LinearGradient from 'react-native-linear-gradient';
/* eslint-enable import/extensions */
import Analytics from '@segment/analytics-react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import styles from './viewStyles/notifications.style';

const Intercom = require('react-native-intercom');

class Notifications extends Component {
  render() {
    Intercom.registerIdentifiedUser({ email: this.props.users.email });
    Intercom.displayMessageComposer();
    return (
      <LinearGradient colors={['#000000', '#131313', '#272727']} style={styles.container}>
        <View style={{ height: 20 }} />
        <View style={{ height: 20 }} />
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => ({ users: state.users });

export default connect(mapStateToProps, actions)(Notifications);
