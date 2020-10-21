import React, { Component } from 'react';
import {
  View,
  Text,
  Keyboard,
  Alert,
} from 'react-native';
import Moment from 'moment';
import DatePicker from 'react-native-datepicker';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
/* eslint-disable import/extensions */
import LinearGradient from 'react-native-linear-gradient';
/* eslint-enable import/extensions */
import Analytics from '@segment/analytics-react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import SimpleButton from '../components/simpleButton';
import styles from './viewStyles/ageVerification.style';

const propTypes = {
  user: PropTypes.object.isRequired,
  userUpdate: PropTypes.func.isRequired,
};

const defaultProps = {};

class AgeVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyBoardShowing: false,
      selectedDate: '',
    };
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      this.setState({ keyBoardShowing: true });
    });
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      this.setState({ keyBoardShowing: false });
    });
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  verifyAge() {
    if (this.state.selectedDate === '') {
      Alert.alert(
        'Select Date of Birth',
        'Please enter your date of birth to continue.',
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
      return;
    }
    const DOB = new Date(this.state.selectedDate);
    const currentDate = new Date();
    const age = Moment.duration(currentDate - DOB).years();

    if (age < 5) {
      Alert.alert(
        'Oops',
        'That date of birth seems improbable.  Please enter your actual birth date to proceed.',
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
      return;
    }

    if (age > 12) {
      Analytics.screen('Create Account');
      Actions.createAccount();
    } else {
      Analytics.screen('Age Verification Fail');
      Actions.ageVerificationFailed();
    }
  }

  render() {
    return (
      <LinearGradient colors={['#000000', '#131313', '#272727']} style={styles.container}>
        <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={[styles.textStyle, { fontSize: 16, color: '#ce0e2d' }]}>This App Requires Age Verification</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.textStyle}>Welcome, please enter your</Text>
            <Text style={styles.textStyle}>date of birth to proceed.</Text>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <DatePicker
            iconSource={null}
            style={{ width: 200 }}
            mode="date"
            placeholder={this.state.selectedDate ? Moment(this.state.selectedDate).format('MMMM Do YYYY') : 'select date'}
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 0,
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={date => this.setState({ selectedDate: date })}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ alignContent: 'center' }}>
            <SimpleButton
              onPress={() => {
                this.verifyAge();
              }}
            > Next </SimpleButton>
          </View>
        </View>
      </LinearGradient >
    );
  }
}

const mapStateToProps = state => ({ user: state.users });

AgeVerification.propTypes = propTypes;
AgeVerification.defaultProps = defaultProps;

export default connect(mapStateToProps, actions)(AgeVerification);
