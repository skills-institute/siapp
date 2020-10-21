import React, {Component} from 'react';
import {View, Text, Alert, Keyboard, ActivityIndicator} from 'react-native';
import {
  setEndpointHost,
  setEndpointPath,
  setHeader,
  readEndpoint,
} from 'redux-json-api';
import PropTypes from 'prop-types';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import LinearGradient from 'react-native-linear-gradient';
import Analytics from '@segment/analytics-react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {Input} from '../components/input';
import SimpleButton from '../components/simpleButton';
import Base64 from '../util/Base64';
import {
  logUserIn,
  loggingIn,
  loading,
  loggedIn,
  userUpdate,
  readModulesAndPhases,
  readPyramidData,
  updateConfidenceRatings,
} from '../actions/userActions';
import * as paths from '../util/apiPaths';
import styles from './viewStyles/createPassword.style';

const Intercom = require('react-native-intercom');

const endpointHost = paths.endpointHost;
const endpointPath = paths.endpointPath;
const createUserPath = paths.createUserPath;
const logInPath = paths.logInPath;
const pyramidReadPath = paths.pyramidReadPath;

const propTypes = {
  user: PropTypes.object.isRequired,
  userUpdate: PropTypes.func.isRequired,
  loggingIn: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired,
  setEndpointHost: PropTypes.func.isRequired,
  setEndpointPath: PropTypes.func.isRequired,
  logUserIn: PropTypes.func.isRequired,
  setHeader: PropTypes.func.isRequired,
  loggedIn: PropTypes.func.isRequired,
  readUserEndpoint: PropTypes.func.isRequired,
};

const defaultProps = {};

class CreatePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authToken: '',
      creatingAccount: false,
    };
  }

  logIn() {
    this.props.loggingIn(true);
    this.props.loading(true);
    this.props.setEndpointHost(endpointHost);
    this.props.setEndpointPath(endpointPath);
    const email = this.props.user.email;
    const password = this.props.user.password;
    const encoded = Base64.btoa(`${email}:${password}`);
    const authHeader = `Basic ${encoded}`;
    fetch(logInPath, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        if (responseJSON.error) {
          this.props.loggingIn(false);
          this.showLoginAlert();
        } else {
          const authToken = responseJSON.meta.authentication_token;
          this.props.setHeader({
            Accept: 'application/json',
            'X-User-Email': email,
            'X-User-Token': authToken,
            'Content-Type': 'application/json',
          });
          Intercom.registerIdentifiedUser({email: this.props.user.email});
          this.props.readUserEndpoint(
            `users/${responseJSON.meta.user_id}`,
            authToken,
          );
        }
      })
      .catch(() => {
        loggingIn(false);
      });
  }

  createAccount() {
    console.log('create');
    this.setState({creatingAccount: true});
    const emailAddress = this.props.user.email;
    const userPassword = this.props.user.password;
    const passwordConfirmation = this.props.user.confirmPassword;
    const firstName = this.props.user.firstName;
    const lastName = this.props.user.lastName;
    fetch(createUserPath, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          type: 'users',
          attributes: {
            first_name: firstName,
            last_name: lastName,
            email: emailAddress,
            password: userPassword,
            password_confirmation: passwordConfirmation,
          },
        },
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        if (responseJSON.errors) {
          Alert.alert('Error', responseJSON.errors[0].title, [{text: 'OK'}], {
            cancelable: false,
          });
          this.setState({creatingAccount: false});
        } else {
          this.props.logUserIn(
            null,
            responseJSON.meta.user_id,
            responseJSON.meta.authentication_token,
          );
          this.setState({authToken: responseJSON.meta.authentication_token});
          this.logIn();
          Keyboard.dismiss();
          this.setState({creatingAccount: false});
          this.props.loggedIn(true);
          Analytics.screen('Enter Code');
          Actions.enterCode();
        }
      })
      .catch((error) => {
        console.log('Create Account Error', error);
      });
  }

  render() {
    return (
      <LinearGradient
        colors={['#000000', '#131313', '#272727']}
        style={styles.container}>
        <Text style={styles.textStyle}>
          Enter a unique password for your account.
        </Text>
        <Input
          label="PASSWORD"
          placeholder="Password"
          secureTextEntry
          value={this.props.user.password}
          onChangeText={(value) =>
            this.props.userUpdate({prop: 'password', value})
          }
        />
        <View style={{height: 20}} />
        <Input
          label="CONFIRM PASSWORD"
          placeholder="Password"
          secureTextEntry
          value={this.props.user.confirmPassword}
          onEndEditing={() => null} // this.createAccount()
          onChangeText={(value) =>
            this.props.userUpdate({prop: 'confirmPassword', value})
          }
        />
        <View style={{height: 20}} />
        {this.state.creatingAccount ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : null}
        <SimpleButton onPress={() => this.createAccount()}>
          {' '}
          Create Account{' '}
        </SimpleButton>
        <KeyboardSpacer />
      </LinearGradient>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  userUpdate: (data) => {
    dispatch(userUpdate(data));
  },
  loading: (isLoading) => {
    dispatch(loading(isLoading));
  },
  loggedIn: (isLoggedIn) => {
    dispatch(loggedIn(isLoggedIn));
  },
  loggingIn: (newLogInStatus) => {
    dispatch(loggingIn(newLogInStatus));
  },
  logUserIn: (attributes, id, token) => {
    dispatch(logUserIn(attributes, id, token));
  },
  setEndpointHost: (hostEndPoint) => {
    dispatch(setEndpointHost(hostEndPoint));
  },
  setEndpointPath: (pathEndPoint) => {
    dispatch(setEndpointPath(pathEndPoint));
  },
  setHeader: (headers) => {
    dispatch(setHeader(headers));
  },
  readEndpoint: (endpoint) => {
    dispatch(readEndpoint(endpoint))
      .then((response) => {
        dispatch(readPyramidData(response));
      })
      .catch(() => {
        Alert.alert('Error', 'Unable to Read Exercise Data.', [{text: 'OK'}], {
          cancelable: false,
        });
      });
  },
  readUserEndpoint: (endpoint, authToken) => {
    dispatch(readEndpoint(endpoint))
      .then((response) => {
        dispatch(
          logUserIn(response.data.attributes, response.data.id, authToken),
        );
      })
      .catch(() => {
        Alert.alert('Error', 'Unable to Read User Data.', [{text: 'OK'}], {
          cancelable: false,
        });
      });
  },
  readModuleAndPhaseEndpoint: (endpoint) => {
    dispatch(readEndpoint(endpoint))
      .then((response) => {
        dispatch(readModulesAndPhases(response));
      })
      .catch(() => {
        Alert.alert('Error', 'Unable to Read Exercise Data.', [{text: 'OK'}], {
          cancelable: false,
        });
      });
  },
  readConfidenceRatingsEndpoint: (confidenceRatingEndPoint) => {
    dispatch(readEndpoint(confidenceRatingEndPoint))
      .then((confidenceRatingResponse) => {
        dispatch(updateConfidenceRatings(confidenceRatingResponse.data));
        const moduleAndPhasePath = 'unlocked_pyramid_modules';
        dispatch(readEndpoint(moduleAndPhasePath))
          .then((moduleAndPhaseResponse) => {
            dispatch(readModulesAndPhases(moduleAndPhaseResponse));
            dispatch(readEndpoint(pyramidReadPath))
              .then((pyramidResponse) => {
                dispatch(readPyramidData(pyramidResponse));
              })
              .catch(() => {
                Alert.alert(
                  'Error',
                  'Unable to Read Exercise Data.',
                  [{text: 'OK'}],
                  {cancelable: false},
                );
              });
          })
          .catch(() => {
            Alert.alert(
              'Error',
              'Unable to Read Exercise Data.',
              [{text: 'OK'}],
              {cancelable: false},
            );
          });
      })
      .catch(() => {
        Alert.alert(
          'Error',
          'Unable to Read Confidence Ratings.',
          [{text: 'OK'}],
          {cancelable: false},
        );
      });
  },
});

const mapStateToProps = (state) => ({user: state.users});

CreatePassword.propTypes = propTypes;
CreatePassword.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(CreatePassword);
