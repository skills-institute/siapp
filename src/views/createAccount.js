import React, {Component} from 'react';
import {View, Text, Keyboard} from 'react-native';
import PropTypes from 'prop-types';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import LinearGradient from 'react-native-linear-gradient';
import Analytics from '@segment/analytics-react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import * as actions from '../actions';
import SimpleButton from '../components/simpleButton';
import {Input} from '../components/input';
import styles from './viewStyles/createAccount.style';

const propTypes = {
  user: PropTypes.object.isRequired,
  userUpdate: PropTypes.func.isRequired,
};

const defaultProps = {};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyBoardShowing: false,
    };
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        this.setState({keyBoardShowing: true});
      },
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        this.setState({keyBoardShowing: false});
      },
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  render() {
    return (
      <LinearGradient
        colors={['#000000', '#131313', '#272727']}
        style={styles.container}>
        {!this.state.keyBoardShowing ? (
          <View>
            <Text style={styles.textStyle}>Welcome! Please enter the info</Text>
            <Text style={styles.textStyle}>
              required below to create an account.
            </Text>
          </View>
        ) : null}

        <Input
          label="FIRST NAME"
          placeholder="First Name"
          value={this.props.user.firstName}
          onChangeText={(value) =>
            this.props.userUpdate({prop: 'firstName', value})
          }
        />
        <View style={{height: 20}} />
        <Input
          label="LAST NAME"
          placeholder="Last Name"
          value={this.props.user.lastName}
          onChangeText={(value) =>
            this.props.userUpdate({prop: 'lastName', value})
          }
        />
        <View style={{height: 20}} />
        <Input
          keyboardType="email-address"
          label="Email"
          placeholder="mail@soccermail.com"
          value={this.props.user.email}
          onEndEditing={() => {
            Keyboard.dismiss();
            Analytics.screen('Create Password');
            Actions.createPassword();
          }}
          onChangeText={(value) =>
            this.props.userUpdate({prop: 'email', value})
          }
        />
        <View style={{height: 20}} />
        <SimpleButton
          onPress={() => {
            Keyboard.dismiss();
            Analytics.screen('Create Password');
            Actions.createPassword();
          }}>
          {' '}
          Next{' '}
        </SimpleButton>
        <KeyboardSpacer />
      </LinearGradient>
    );
  }
}

const mapStateToProps = (state) => ({user: state.users});

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default connect(mapStateToProps, actions)(Login);
