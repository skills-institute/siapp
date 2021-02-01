import React, {Component} from 'react';
import {View, Alert, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import {
  setEndpointHost,
  setEndpointPath,
  setHeader,
  readEndpoint,
} from 'redux-json-api';
import LinearGradient from 'react-native-linear-gradient';
import Analytics from '@segment/analytics-react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {Input} from '../components/input';
import SimpleButton from '../components/simpleButton';
import CustomButton from '../components/customButton';
import Base64 from '../util/Base64';
import {
  readModulesAndPhases,
  readPyramidData,
  unlockModulesFromAPI,
  unlockModules,
  userUpdate,
  logUserIn,
  loading,
  loggingIn,
  loggedIn,
  updateConfidenceRatings,
} from '../actions/userActions';
import * as paths from '../util/apiPaths';
import styles from './viewStyles/welcomeBack.style';

const Intercom = require('react-native-intercom');

const propTypes = {
  user: PropTypes.object.isRequired,
  userUpdate: PropTypes.func.isRequired,
  setEndpointHost: PropTypes.func.isRequired,
  setEndpointPath: PropTypes.func.isRequired,
  logUserIn: PropTypes.func.isRequired,
  loggingIn: PropTypes.func.isRequired,
  loggedIn: PropTypes.func.isRequired,
  setHeader: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired,
};

const defaultProps = {};

const endpointHost = paths.endpointHost;
const endpointPath = paths.endpointPath;
const logInPath = paths.logInPath;

class WelcomeBack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  componentWillMount() {
    this.props.loggingIn(false);
    if (this.props.user.loggedIn) {
      this.state = {loggedIn: true};
      Actions.refresh({hideNavBar: true});
      this.logIn();
    }
  }

  sendPasswordReset() {
    const resetPasswordBody = {
      user: {
        email: this.props.user.email,
      },
    };
    const resetPasswordPath = paths.resetPasswordPath;

    fetch(resetPasswordPath, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resetPasswordBody),
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        if (!responseJSON.errors) {
          Alert.alert(
            'Password Reset',
            'Password reset request sent. Please check your email.',
            [{text: 'OK'}],
            {cancelable: false},
          );
        }
      })
      .catch(() => {});
  }

  showLoginAlert() {
    this.props.loggedIn(false);
    Alert.alert(
      'Error Logging In',
      'Incorrect email or password.',
      [{text: 'OK'}],
      {cancelable: false},
    );
  }

  forgotPassword() {
    const email = this.props.user.email;
    Alert.alert(
      'Reset Password',
      `Send password reset email to ${email}?`,
      [
        {
          text: 'Reset Password',
          onPress: () => this.sendPasswordReset(),
          style: 'cancel',
        },
        {text: 'Cancel'},
      ],
      {cancelable: false},
    );
  }

  logIn() {
    if (this.props.user.loggingIn) {
      return;
    }
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
        console.log('responseJSON', responseJSON);
        if (responseJSON.error) {
          this.props.loggingIn(false);
          this.props.loggedIn(false);
          this.setState({loggedIn: false});
          this.showLoginAlert();
        } else {
          const authToken = responseJSON.meta.authentication_token;
          this.props.setHeader({
            Accept: 'application/json',
            'X-User-Email': email,
            'X-User-Token': authToken,
            'Content-Type': 'application/json',
          });
          this.props.logUserIn(null, responseJSON.meta.user_id, authToken);
          Intercom.registerIdentifiedUser({email});
          Analytics.screen('Pyramid');
          Actions.landing({pullData: true});
        }
      })
      .catch(() => {
        loggingIn(false);
      });
  }
  render() {
    if (!this.state.loggedIn) {
      return (
        <LinearGradient
          colors={['#000000', '#131313', '#272727']}
          style={styles.container}>
          <Input
            keyboardType="email-address"
            label="EMAIL"
            placeholder="Email"
            value={this.props.user.email}
            onChangeText={(value) =>
              this.props.userUpdate({prop: 'email', value})
            }
          />
          <View style={{height: 20}} />
          <Input
            label="PASSWORD"
            placeholder="Password"
            secureTextEntry
            value={this.props.user.password}
            onSubmitEditing={() => this.logIn()}
            onChangeText={(value) =>
              this.props.userUpdate({prop: 'password', value})
            }
          />
          <View style={{height: 20}} />
          <SimpleButton onPress={() => this.forgotPassword()}>
            {' '}
            Forgot Password{' '}
          </SimpleButton>
          {this.props.user.loggingIn ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          ) : (
            <View />
          )}
          <View style={{height: 20}} />
          <CustomButton onPress={() => this.logIn()}>SUBMIT</CustomButton>
        </LinearGradient>
      );
    }
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  unlockModules: () => {
    dispatch(unlockModules());
  },
  unlockModulesFromAPI: (modules) => {
    dispatch(unlockModulesFromAPI(modules));
  },
  updateConfidenceRatings: (ratings) => {
    dispatch(updateConfidenceRatings(ratings));
  },
  loading: (isLoading) => {
    dispatch(loading(isLoading));
  },
  loggingIn: (newLogInStatus) => {
    dispatch(loggingIn(newLogInStatus));
  },
  loggedIn: (newLoggedInStatus) => {
    dispatch(loggedIn(newLoggedInStatus));
  },
  logUserIn: (data, id, authToken) => {
    dispatch(logUserIn(data, id, authToken));
  },
  userUpdate: (props) => {
    dispatch(userUpdate(props));
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
  readModuleAndPhaseEndpoint: (moduleAndPhasesEndpoint) => {
    dispatch(readEndpoint(moduleAndPhasesEndpoint))
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
        const moduleAndPhasePath = paths.moduleAndPhasePath;
        const pyramidReadPath = paths.pyramidReadPath;
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

const mapStateToProps = (state) => ({user: state.users, api: state.api});

WelcomeBack.propTypes = propTypes;
WelcomeBack.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeBack);
