import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import PropTypes from 'prop-types';
import {
  setEndpointHost,
  setEndpointPath,
  setHeader,
  readEndpoint,
} from 'redux-json-api';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Analytics from '@segment/analytics-react-native';
import CustomButton from '../components/customButton';
import SimpleButton from '../components/simpleButton';
import Header from '../components/header';
import styles from './viewStyles/home.style';

const propTypes = {
  users: PropTypes.object.isRequired,
};

const defaultProps = {};

class athletefitapp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      connected: false,
    };
  }

  componentWillMount() {
    if (this.props.users.loggedIn) {
      this.state = {loggedIn: true};
    }
  }

  componentDidMount() {
    Analytics.screen('Launch');
  }

  render() {
    if (this.state.loggedIn) {
      Analytics.screen('Welcome Back');
      Actions.welcomeBack();
      return null;
    }

    return (
      <LinearGradient
        colors={['#000', '#131313', '#272727']}
        style={styles.container}>
        <View style={styles.imageViewStyle}>
          <Image
            resizeMode="contain"
            style={styles.imageStyle}
            source={require('../..//assets/images/Rise.png')}
          />
        </View>
        <Header headerText={'Welcome to SKILLS INSTITUTE'} />
        <View style={{height: 20}} />
        <Text
          style={{
            color: '#94989E',
            backgroundColor: 'transparent',
            fontSize: 14,
            fontFamily: 'WorkSans-Regular',
          }}>
          Powered by LIL’ KICKERS, INC.
        </Text>
        <View style={{height: 20}} />
        <Text />
        {this.props.users.loggedIn ? (
          <View style={{alignItems: 'center'}}>
            <Text style={styles.textStyle}>
              Welcome back {this.props.users.firstName}
            </Text>
            <View style={{height: 20}} />
            <View style={{alignSelf: 'center'}}>
              <CustomButton
                onPress={() => {
                  Analytics.screen('Welcome Back');
                  Actions.welcomeBack();
                }}>
                {' '}
                Continue{' '}
              </CustomButton>
            </View>
          </View>
        ) : (
          <View>
            <CustomButton
              onPress={() => {
                Analytics.screen('Age Verification');
                Actions.ageVerification();
              }}>
              CREATE ACCOUNT
            </CustomButton>
            <View style={{height: 20}} />
            <View style={{alignSelf: 'center'}}>
              <SimpleButton
                onPress={() => {
                  Analytics.screen('Welcome Back');
                  Actions.welcomeBack();
                }}>
                Login
              </SimpleButton>
            </View>
          </View>
        )}
      </LinearGradient>
    );
  }
}

const mapStateToProps = (state) => ({users: state.users, api: state.api});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  setEndpointHost: (endpointHost) => {
    dispatch(setEndpointHost(endpointHost));
  },
  setEndpointPath: (endpointPath) => {
    dispatch(setEndpointPath(endpointPath));
  },
  setHeader: (headers) => {
    dispatch(setHeader(headers));
  },
  readEndpoint: (endpoint) => {
    dispatch(readEndpoint(endpoint))
      .then(() => console.log('read our pyramid data'))
      .catch((error) => console.log(error));
  },
});

athletefitapp.propTypes = propTypes;
athletefitapp.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(athletefitapp);
