import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Alert,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { readEndpoint } from 'redux-json-api';
/* eslint-disable import/extensions */
import LinearGradient from 'react-native-linear-gradient';
/* eslint-enable import/extensions */
import Analytics from '@segment/analytics-react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import CustomButton from '../components/customButton';
import SimpleButton from '../components/simpleButton';
import Header from '../components/header';
import { setPrivacyPolicy } from '../actions/userActions';
import styles from './viewStyles/privacyPolicy.style';

const propTypes = {
  users: PropTypes.object.isRequired,
  readEndpoint: PropTypes.func.isRequired,
};

const defaultProps = {};

const PPDeclined = () => { // TODO Create a util/alert.js file to house alerts.
  Alert.alert(
    'Privacy Policy',
    'You must accept the Privacy Policy to use the Rise App.',
    [
      { text: 'OK' },
    ],
    { cancelable: false },
  );
};

class PrivacyPolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      privacyPolicy: '',
    };
  }
  componentWillMount() {
    this.props.readEndpoint('snippets/privacy-policy');
  }

  render() {
    return (
      <LinearGradient colors={['#000000', '#131313', '#272727']} style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', marginTop: 10 }}>
          <Header headerText={'PRIVACY POLICY'} />
        </View>
        <View style={{ flex: 4, justifyContent: 'center' }}>
          <ScrollView style={{ backgroundColor: 'transparent' }}>
            <Text style={styles.textStyle}>{this.props.users.privacyPolicy}</Text>
          </ScrollView>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <CustomButton
            onPress={() => {
              Analytics.screen('Pyramid');
              Actions.landing({ pullData: true });
            }}
          >
            ACCEPT
          </CustomButton>
          <View style={{ alignSelf: 'center', alignItems: 'center' }}>
            <SimpleButton onPress={() => PPDeclined()}>Decline</SimpleButton>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
  readEndpoint: (endpoint) => {
    dispatch(readEndpoint(endpoint))
      .then((response) => {
        dispatch(setPrivacyPolicy(response.data.attributes.content));
      })
      .catch(() => {
        Alert.alert(
          'Error',
          'Unable to Read Snippets Data.',
          [
            { text: 'OK' },
          ],
          { cancelable: false },
        );
      });
  },
});

PrivacyPolicy.propTypes = propTypes;
PrivacyPolicy.defaultProps = defaultProps;

const mapStateToProps = state => ({ users: state.users });

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy);
