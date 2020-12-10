import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {
  setHeader,
  readEndpoint,
  updateResource,
  createResource,
} from 'redux-json-api';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Analytics from '@segment/analytics-react-native';
import SimpleButton from '../components/simpleButton';
import {Input} from '../components/input';
import CustomButton from '../components/customButton';
import {pullData, logout, userUpdate, logUserIn} from '../actions/userActions';
import styles from './componentStyles/updatePlayerInfo.style';

const Intercom = require('react-native-intercom');

const propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  updateResource: PropTypes.func.isRequired,
  addTeamCode: PropTypes.func.isRequired,
  userUpdate: PropTypes.func.isRequired,
  readUserEndpoint: PropTypes.func.isRequired,
};

const defaultProps = {};

class UpdatePlayerInfo extends Component {
  updatePlayerProfile() {
    const {
      id,
      firstName,
      lastName,
      nickName,
      email,
      password,
      confirmPassword,
    } = this.props.user;
    const newPlayerInfo = {
      id,
      type: 'users',
      attributes: {
        first_name: firstName,
        last_name: lastName,
        nickname: nickName,
        email,
        password,
        password_confirmation: confirmPassword,
      },
    };
    this.props.updateResource(newPlayerInfo);
  }

  addNewTeamCode() {
    const {newCode, authToken, id} = this.props.user;
    const teamCodePost = {
      type: 'affiliations',
      attributes: {
        team_code: newCode,
      },
    };
    const endpoint = `/users/${id}`;

    if (newCode) {
      const readUser = () =>
        this.props.readUserEndpoint(`/users/${id}`, authToken);
      this.props.addTeamCode(teamCodePost, readUser, endpoint, authToken);
    } else {
      Alert.alert(
        'PROMO CODE',
        'Code Must Not Be Blank.',
        [
          {
            text: 'OK',
            onPress: () => {},
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    }
  }

  render() {
    const {
      nickName,
      firstName,
      lastName,
      password,
      confirmPassword,
      newCode,
    } = this.props.user;

    return (
      <View colors={['#000000', '#131313', '#272727']} style={styles.container}>
        <View style={{height: 10}} />
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <SimpleButton
              onPress={() => {
                Alert.alert(
                  'Review Intro',
                  'Would you like to review the intro videos?',
                  [
                    {
                      text: 'Review',
                      onPress: () => {
                        Analytics.screen('Intro Video 1');
                        Actions.introVideo1({reviewOnboarding: true});
                      },
                      style: 'cancel',
                    },
                    {text: 'Cancel'},
                  ],
                  {cancelable: false},
                );
              }}>
              Review Intro Videos
            </SimpleButton>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                Alert.alert(
                  'Logout',
                  'Are you sure you want to log out?',
                  [
                    {
                      text: 'Logout',
                      onPress: () => {
                        Intercom.logout();
                        this.props.logout();
                        Analytics.screen('Launch');
                        Actions.home();
                      },
                      style: 'cancel',
                    },
                    {text: 'Cancel'},
                  ],
                  {cancelable: false},
                );
              }}>
              <Text style={styles.textStyle}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height: 10}} />
        <Input
          label="FIRSTNAME"
          placeholder="First Name"
          value={firstName}
          onChangeText={(value) =>
            this.props.userUpdate({prop: 'firstName', value})
          }
        />
        <View style={{height: 20}} />
        <Input
          label="LASTNAME"
          placeholder="Last Name"
          value={lastName}
          onChangeText={(value) =>
            this.props.userUpdate({prop: 'lastName', value})
          }
        />
        <View style={{height: 20}} />
        <Input
          label="NICKNAME"
          placeholder="Nick Name"
          value={nickName}
          onChangeText={(value) =>
            this.props.userUpdate({prop: 'nickName', value})
          }
        />
        <View style={{height: 20}} />
        <View style={{height: 20}} />
        <Input
          label="PASSWORD"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(value) =>
            this.props.userUpdate({prop: 'password', value})
          }
        />
        <View style={{height: 20}} />
        <Input
          label="CONFIRM PASSWORD"
          placeholder="Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(value) =>
            this.props.userUpdate({prop: 'confirmPassword', value})
          }
        />
        <View style={{height: 10}} />
        <Input
          label="ADD NEW TEAM"
          placeholder="ENTER PROMO CODE"
          value={newCode}
          onChangeText={(value) =>
            this.props.userUpdate({prop: 'newCode', value})
          }
        />
        <View style={{height: 10}} />
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => this.addNewTeamCode()}>
          <Text style={styles.textStyle}>Submit Code</Text>
        </TouchableOpacity>
        <Text
          style={[
            styles.textStyle,
            {color: '#94989E', alignSelf: 'flex-start'},
          ]}>
          Subscription Expires on {this.props.user.subscriptionExpires}
        </Text>
        <SimpleButton
          onPress={() => {
            Analytics.screen('Privacy Policy');
            Actions.privacyPolicy();
          }}>
          Privacy Policy
        </SimpleButton>
        <SimpleButton
          onPress={() => {
            Analytics.screen('Terms of Service');
            Actions.termsOfService({review: true});
          }}>
          Terms and Conditions
        </SimpleButton>
        <View style={{height: 10}} />
        <CustomButton onPress={() => this.updatePlayerProfile()}>
          UPDATE PROFILE
        </CustomButton>
      </View>
    );
  }
}

const pullUserData = (dispatch, endpoint, authToken) => {
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
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  pullData: (pullNewData) => {
    dispatch(pullData(pullNewData));
  },
  userUpdate: (update) => {
    dispatch(userUpdate(update));
  },
  logout: () => {
    dispatch(logout());
  },
  setHeader: (headers) => {
    dispatch(setHeader(headers));
  },
  readEndpoint: (endpoint) => {
    dispatch(readEndpoint(endpoint))
      .then(() => console.log('read our pyramid data'))
      .catch((error) => console.log(error));
  },
  updateResource: (entity) => {
    dispatch(updateResource(entity))
      .then(() => {
        Analytics.screen('Pyramid');
        Actions.landing({pullData: true});
      })
      .catch(() => {
        Alert.alert('Error', 'Unable to Update Player Info.', [{text: 'OK'}], {
          cancelable: false,
        });
      });
  },
  addTeamCode: (teamToAdd, readUser, endpoint, authToken) => {
    dispatch(createResource(teamToAdd))
      .then((addTeamResponse) => {
        if (addTeamResponse.errors) {
          Alert.alert(
            'Error',
            addTeamResponse.errors[0].title,
            [{text: 'OK'}],
            {cancelable: false},
          );
        }
        readUser();
        pullUserData(dispatch, endpoint, authToken);
      })
      .catch((error) => {
        error.response.json().then((errorJSON) => {
          const errorMessage = errorJSON.errors[0].detail
            ? errorJSON.errors[0].detail
            : errorJSON.errors[0].title;
          Alert.alert('Error', errorMessage, [{text: 'OK'}], {
            cancelable: false,
          });
        });
      });
  },
  readUserEndpoint: (endpoint, authToken) => {
    pullUserData(dispatch, endpoint, authToken);
  },
});

const mapStateToProps = (state) => ({user: state.users});

UpdatePlayerInfo.propTypes = propTypes;
UpdatePlayerInfo.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePlayerInfo);
