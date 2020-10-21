import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

const propTypes = {
  users: PropTypes.object.isRequired,
};

const defaultProps = {};

class blankInitialScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      triggered: false,
    };
  }

  componentWillMount() {
    if (this.props.users.loggedIn) {
      this.state = { loggedIn: true };
    }
  }

  componentWillReceiveProps(newProps) {
    if (!this.state.triggered) {
      if (newProps.users.loggedIn) {
        this.setState({ triggered: true });
        Actions.welcomeBack();
      }
      if (!newProps.users.loggedIn) {
        this.setState({ triggered: true });
        Actions.home();
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }} >
        <Text style={{ color: 'white' }}>You Should Not See This Screen</Text>
      </View>

    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({ users: state.users, api: state.api });

blankInitialScreen.propTypes = propTypes;
blankInitialScreen.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(blankInitialScreen);
