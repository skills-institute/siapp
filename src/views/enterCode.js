import React, {Component} from 'react';
import {View, Text, Alert, Keyboard, Linking} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {readEndpoint, createResource} from 'redux-json-api';
import PropTypes from 'prop-types';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import LinearGradient from 'react-native-linear-gradient';
import Analytics from '@segment/analytics-react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Input} from '../components/input';
import Header from '../components/header';
import CustomButton from '../components/customButton';
import CustomText from '../components/customText';
import {userUpdate} from '../actions/userActions';
import styles from './viewStyles/enterCode.style';

let teamName = '';
let teamLogoURL = '';

const propTypes = {
  user: PropTypes.object.isRequired,
  userUpdate: PropTypes.func.isRequired,
  addTeamCode: PropTypes.func.isRequired,
};

const defaultProps = {};

class EnterCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyBoardShowing: false,
    };
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardWillShow',
      () => {
        this.setState({keyBoardShowing: true});
      },
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => {
        this.setState({keyBoardShowing: false});
      },
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  addNewTeamCode() {
    const teamCodePost = {
      type: 'affiliations',
      attributes: {
        team_code: this.props.user.code,
      },
    };
    const authToken = this.props.user.authToken;
    this.props.addTeamCode(teamCodePost, authToken);
  }

  hideKeyboard = () => {
    Keyboard.dismiss();
    this.setState({keyBoardShowing: false});
  };

  render() {
    return (
      <LinearGradient
        colors={['#000000', '#131313', '#272727']}
        style={styles.container}>
        <KeyboardAwareScrollView style={{flex: 1}} scrollEnabled={false}>
          {!this.state.keyBoardShowing ? (
            <View style={{flex: 1}}>
              <Text style={[styles.textStyle, {paddingHorizontal: 15}]}>
                Enter class code if provided by your Skills Institute facility
              </Text>
            </View>
          ) : null}
          <View style={{flex: 1}}>
            <Input
              blurOnSubmit
              label="ENTER CODE"
              placeholder="Enter Code"
              value={this.props.user.code}
              onChangeText={(value) =>
                this.props.userUpdate({prop: 'code', value})
              }
              returnKeyType={'done'}
            />
            <Text
              style={[
                styles.textStyle,
                {paddingHorizontal: 15, marginTop: 24},
              ]}>
              <Text
                style={{color: 'white', fontWeight: 'bold'}}
                onPress={() => {
                  Linking.openURL('http://risefutbol.com/clubs');
                }}>
              </Text>
            </Text>
          </View>
          {!this.state.keyBoardShowing ? (
            <View style={{flex: 6}}>
              <View
                style={{
                  flex: 2,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  marginTop: 20,
                  marginBottom: 40,
                }}>
                <CustomButton onPress={() => this.addNewTeamCode()}>
                  Submit Class Code
                </CustomButton>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 35,
                }}>
                <Header headerText="DON'T HAVE A CLASS CODE?" />
                <View style={{height: 20}} />
                <CustomText
                  style={{
                    marginBottom: 35,
                    paddingHorizontal: 15,
                    textAlign: 'center',
                  }}>
                  Enter as an individual athlete and receive access to our Free
                  Development Training Program which includes a comprehensive
                  Training Guide, guided workouts & instructional videos
                </CustomText>
                <View style={{height: 20}} />
              </View>
              <View style={styles.requestButtonView}>
                <CustomButton
                  onPress={() => {
                    Analytics.screen('Welcome To');
                    Actions.welcomeTo();
                  }}>
                  Proceed as individual below
                </CustomButton>
              </View>
            </View>
          ) : (
            <View style={{flex: 4}} />
          )}
        </KeyboardAwareScrollView>
        <KeyboardSpacer />
      </LinearGradient>
    );
  }
}

const readTeamEndpoint = (dispatch, teamId) => {
  const endpoint = `teams/${teamId}`;
  dispatch(readEndpoint(endpoint))
    .then((response) => {
      teamName = response.data.attributes.name;
      teamLogoURL = response.data.attributes.logo_image_url;
      const clubEndpoint = 'clubs';
      dispatch(readEndpoint(clubEndpoint))
        .then((clubResponse) => {
          const clubWelcomeText =
            clubResponse.data[0].attributes.welcome_message;
          Analytics.screen('Welcome To');
          Actions.welcomeTo({teamName, teamLogoURL, clubWelcomeText});
        })
        .catch(() => {
          Alert.alert('Error', 'Unable to Read Club Data.', [{text: 'OK'}], {
            cancelable: false,
          });
        });
    })
    .catch(() => {
      Alert.alert('Error', 'Unable to Read Team Data.', [{text: 'OK'}], {
        cancelable: false,
      });
    });
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  readEndpoint: (endpoint) => {
    dispatch(readEndpoint(endpoint))
      .then(() => {})
      .catch(() => {
        Alert.alert('Error', 'Unable to Read Team Data.', [{text: 'OK'}], {
          cancelable: false,
        });
      });
  },
  createResource: (entity) => {
    dispatch(createResource(entity)).then(
      () => {},
      (error) => {
        error.response.json().then(
          () => {},
          () => {},
        );
      },
    );
  },
  userUpdate: (data) => {
    dispatch(userUpdate(data));
  },
  addTeamCode: (teamToAdd) => {
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
        readTeamEndpoint(dispatch, addTeamResponse.data.attributes.team_id);
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
});

const mapStateToProps = (state) => ({user: state.users});

EnterCode.propTypes = propTypes;
EnterCode.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(EnterCode);
