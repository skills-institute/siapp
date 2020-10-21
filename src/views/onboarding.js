import React, { Component } from 'react';
import {
  View,
  Button,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Analytics from '@segment/analytics-react-native';
import * as actions from '../actions';
import Header from '../components/header';
import styles from './viewStyles/oboarding.style';

class Onboarding extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header headerText="Welcome to Your Club Name Here" />
        <Button
          onPress={() => {
            Analytics.screen('Pyramid');
            Actions.landing();
          }}
          title="Get Started"
          color="#841584"
          accessibilityLabel="Get Started"
        />
      </View>

    );
  }
}

const mapStateToProps = state => ({ users: state.users });

export default connect(mapStateToProps, actions)(Onboarding);
