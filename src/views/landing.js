import React, {Component} from 'react'; // TODO: Fix Linter Errors in file
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import {Crashlytics} from 'react-native-fabric';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';
import {
  setEndpointHost,
  setEndpointPath,
  setHeader,
  readEndpoint,
} from 'redux-json-api';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import Analytics from '@segment/analytics-react-native';
import {connect} from 'react-redux';
import CustomText from '../components/customText';
import PyramidRow from '../components/pyramidRow';
import ProgressBar from '../components/progressBar';
import TeamIcons from '../components/teamIcons';
import AlertsAndStreaks from '../components/alertsAndStreaks';
import PlayerInfo from '../components/playerInfo';
import SkillsMastered from '../components/skillsMastered';
import {
  updatePhaseAttempts,
  readModulesAndPhases,
  readPyramidData,
  unlockModulesFromAPI,
  unlockModules,
  userUpdate,
  logUserIn,
  loading,
  loggingIn,
  updateConfidenceRatings,
} from '../actions/userActions';
import * as paths from '../util/apiPaths';
import styles from './viewStyles/landing.style';
import intercom from '@segment/analytics-react-native-intercom';
import Moment from 'moment';

const Intercom = require('react-native-intercom');

const {width, height} = Dimensions.get('window');

const propTypes = {
  user: PropTypes.object.isRequired,
  loggingIn: PropTypes.func.isRequired,
  readUserEndpoint: PropTypes.func.isRequired,
  readEndpoint: PropTypes.func.isRequired,
  readConfidenceRatingsEndpoint: PropTypes.func.isRequired,
};

const defaultProps = {};

const pyramidReadPath = paths.pyramidReadPath;

const displayLevelBar = (levelBarText) => (
  <View style={styles.dividerView}>
    <View style={styles.dividerBar} />
    <Text style={styles.levelDividerText}>{levelBarText}</Text>
    <View style={styles.dividerBar} />
  </View>
);

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      loggingIn: true,
      pullData: true,
      unreadCount: 0,
    };
    this.xscrollView;
  }

  componentDidUpdate = (prevProps) => {
    if (JSON.stringify(prevProps.user) !== JSON.stringify(this.props.user)) {
      this.updateIntercomData();
    }
  };

  updateIntercomData = () => {
    const {
      user: {
        firstName,
        lastName,
        price,
        code,
        lastSeen,
        firstSeen,
        signedUp,
        createdAt,
        promoCode,
        stripeCustomer,
        stripePlan,
        stripePlanPrices,
        discountCode,
        roleList,
        highestPyramidLevel,
        lastModulePlayed,
        lastPhasePlayed,
        dayStreak,
        subscription,
        myClubs,
        myTeams,
        skillsMastered: userSkillsMastered,
      },
    } = this.props;

    const currentMoment = new Moment();
    const currDate = currentMoment.format('YYYY-MM-DD');
    const createdDate = new Moment(createdAt).format('YYYY-MM-DD');

    if (!firstSeen && signedUp) {
      this.props.userUpdate({
        prop: 'firstSeen',
        value: currDate,
      });
    }

    this.props.userUpdate({
      prop: 'lastSeen',
      value: currDate,
    });

    Intercom.registerIdentifiedUser({
      email: this.props.user.email,
    });

    Intercom.updateUser({
      custom_attributes: {
        ['First Name']: firstName,
        ['Last Name']: lastName,
        ['Price']: price,
        ['User']: `${firstName} ${lastName}`,
        ['Team Name']: myTeams,
        ['Club']: myClubs,
        ['Display Code']: code,
        ['First Seen']: firstSeen,
        ['Last Seen']: lastSeen,
        ['Signed Up']: createdDate,
        ['OS']: Platform.OS,
        ['Promo Code']: promoCode,
        ['Stripe Customer']: stripeCustomer,
        ['Stripe Plan']: stripePlan,
        ['Stripe Plan Price']: stripePlanPrices,
        ['Discount Code']: discountCode,
        ['Subscription']: subscription,
        ['Role List']: roleList,
        ['day_streak']: dayStreak,
        ['skills_mastered']: userSkillsMastered,
        ['highest_pyramid_level']: highestPyramidLevel,
        ['last_module_played']: lastModulePlayed,
        ['last_phase_played']: lastPhasePlayed,
      },
      name: this.props.user.fullName,
    });

    Intercom.addEventListener(
      Intercom.Notifications.UNREAD_COUNT,
      this.onUnreadChange,
    );
  };

  componentWillMount() {
    if (this.state.pullData) {
      this.pullAllBackEndData();
      this.setState({pullData: false, pulledData: true});
    }
  }

  componentDidMount = () => {
    const userId = parseInt(this.props.user.id, 10);
    Analytics.setup('PCTONGGvAw7OUyyLTtskcC1SJOD66kwb', {
      trackAppLifecycleEvents: true,
      recordScreenViews: true,
      using: [intercom],
    });

    Analytics.identify(userId.toString(), {
      email: this.props.user.email,
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.pullData) {
      Actions.refresh({pullData: false});
      this.pullAllBackEndData();
    }
  }

  componentWillUnmount() {
    Intercom.removeEventListener(
      Intercom.Notifications.UNREAD_COUNT,
      this.onUnreadChange,
    );
  }

  setLevelBarText() {
    let highestModuleUnlocked = 0;
    let module = 0;
    for (module = 1; module < 15; module += 1) {
      if (this.props.user[`module${module}`].locked === false) {
        highestModuleUnlocked = module;
      }
    }
    if (highestModuleUnlocked >= 1 && highestModuleUnlocked <= 5) {
      return {levelBarText: '  Level 01  ', levelBarLevel: 1};
    }
    if (highestModuleUnlocked >= 6 && highestModuleUnlocked <= 9) {
      return {levelBarText: '  Level 02  ', levelBarLevel: 2};
    }
    if (highestModuleUnlocked >= 10 && highestModuleUnlocked <= 12) {
      return {levelBarText: '  Level 03  ', levelBarLevel: 3};
    }
    if (highestModuleUnlocked >= 13 && highestModuleUnlocked <= 14) {
      return {levelBarText: '  Level 04  ', levelBarLevel: 4};
    }
    return {levelBarText: '  Level 01  ', levelBarLevel: 1};
  }

  onUnreadChange = ({count}) => {
    this.setState({unreadCount: count});
  };

  pullAllBackEndData() {
    this.props.loggingIn(true);
    this.props.readUserEndpoint(
      `users/${this.props.user.id}`,
      this.props.user.authToken,
    );
    this.props.readEndpoint('phase_attempts');
    const exerciseRatingsPath = 'confidence_ratings';
    this.props.readConfidenceRatingsEndpoint(exerciseRatingsPath);
  }

  render() {
    const activeSubscription = this.props.user.activeSubscription;
    const levelToDisplay = [0, 5, 4, 3, 2, 1];
    const {levelBarText, levelBarLevel} = this.setLevelBarText();
    displayLevelBar(levelBarText);
    if (!this.props.user.loggedIn || !this.state.pulledData) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      );
    }
    return (
      <LinearGradient
        colors={['#000000', '#131313', '#272727']}
        style={styles.container}>
        {/* {activeSubscription ?
          null
          :
          <View style={{ marginTop: 20, backgroundColor: 'black', alignItems: 'center' }}>
            <Text style={{ color: 'red' }}>This';ldrr9000--p-['l./;''//] Account Does Not Have an Active Subscription</Text>
          </View>
        } */}
        <ScrollView
          style={styles.container}
          scrollEventThrottle={16}
          onScroll={(event) => {
            const scrollViewYPosition = event.nativeEvent.contentOffset.y;
            if (scrollViewYPosition > 0) {
              this.setState({expanded: true});
            } else {
              this.setState({expanded: false});
            }
          }}
          scrollEnabled
          ref={(ref) => {
            this.xscrollView = ref;
          }}>
          <View style={{width, height}}>
            <View style={{flex: 6, flexDirection: 'row'}}>
              <TouchableWithoutFeedback
                onPress={() => {
                  Intercom.displayConversationsList();
                }}>
                <View
                  style={{
                    marginLeft: 20,
                    position: 'relative',
                    height: 22,
                    width: 22,
                  }}>
                  <View style={styles.iconView}>
                    <Image
                      resizeMode="contain"
                      style={{height: 22, width: 22}}
                      source={require('../../assets/Icon/Notifications.png')}
                    />
                  </View>
                  <View
                    style={{
                      display: this.state.unreadCount === 0 ? 'none' : 'flex',
                      borderRadius: 10,
                      backgroundColor: 'red',
                      width: 20,
                      height: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'absolute',
                      bottom: -10,
                      right: -10,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                      }}>
                      {this.state.unreadCount}
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <View
                style={{
                  flex: 8,
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                <Text style={styles.nickText}>
                  {this.props.user.nickName.substring(0, 30)}
                </Text>
                <Text style={styles.nameText}>
                  {this.props.user.firstName.substring(0, 16)}
                </Text>
                <Text style={styles.nameText}>
                  {this.props.user.lastName.substring(0, 16)}
                </Text>
              </View>
              <View style={{flex: 1, backgroundColor: 'transparent'}}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    Analytics.screen('Player Profile');
                    Actions.playerInfoUpdate();
                  }}>
                  <View style={styles.iconView}>
                    <Image
                      resizeMode="contain"
                      style={{height: 22, width: 22}}
                      source={require('../../assets/Icon/Account.png')}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
            <View style={styles.row1}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 3}}>
                  <AlertsAndStreaks />
                </View>
                <View style={{flex: 4}}>
                  <PlayerInfo editMode={false} />
                </View>
                <View style={{flex: 3}}>
                  <SkillsMastered />
                </View>
              </View>
            </View>
            <View style={styles.row2}>
              <TeamIcons />
            </View>
            <View style={styles.row3}>
              {this.props.user.progressView.map((dayView, index) => {
                const foundModule = _.find(this.props.user.moduleIds, {
                  id: dayView.pyramidId,
                });
                const moduleNumber = foundModule ? foundModule.moduleNumber : 0;
                return (
                  <ProgressBar
                    key={dayView.key}
                    month={dayView.month}
                    day={dayView.day}
                    status={moduleNumber}
                    border={index === parseInt(6, 10)}
                  />
                );
              })}
            </View>
            <View style={styles.row4}>
              <TouchableWithoutFeedback
                onPress={() => {
                  const expanded = !this.state.expanded;
                  expanded
                    ? this.xscrollView.scrollToEnd({animated: true})
                    : this.xscrollView.scrollTo({x: 0, y: 0, animated: true});
                }}>
                <View
                  style={{
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <CustomText>
                    {this.state.expanded
                      ? 'HIDE TRAINING COURSES'
                      : 'EXPAND TRAINING COURSES'}
                  </CustomText>
                  <View style={{height: 15}} />
                  {this.state.expanded ? (
                    <Image
                      style={styles.imageStyle}
                      source={require('../../assets/Icon/CarrotUp.png')}
                    />
                  ) : (
                    <Image
                      style={styles.imageStyle}
                      source={require('../../assets/Icon/Carrot.png')}
                    />
                  )}
                </View>
              </TouchableWithoutFeedback>
            </View>
            {!this.state.expanded ? (
              <View style={styles.row5}>
                <PyramidRow row={levelToDisplay[levelBarLevel]} />
              </View>
            ) : (
              <View style={styles.row5}>
                <View />
                <PyramidRow row={1} />
              </View>
            )}
          </View>
          <View style={styles.pyramidView}>
            {levelBarLevel === 4 ? displayLevelBar(levelBarText) : null}
            <PyramidRow row={2} />
            {levelBarLevel === 3 ? displayLevelBar(levelBarText) : null}
            <PyramidRow row={3} />
            {levelBarLevel === 2 ? displayLevelBar(levelBarText) : null}
            <PyramidRow row={4} />
            {levelBarLevel === 1 ? displayLevelBar(levelBarText) : null}
            <PyramidRow row={5} />
          </View>
        </ScrollView>
      </LinearGradient>
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
        if (endpoint === 'phase_attempts') {
          dispatch(updatePhaseAttempts(response));
        } else {
          dispatch(readPyramidData(response));
        }
      })
      .catch((e) => {
        Alert.alert('Error', 'Unable to Read Exercise Data.', [{text: 'OK'}], {
          cancelable: false,
        });
      });
  },

  readUserEndpoint: (endpoint, authToken) => {
    dispatch(readEndpoint(endpoint))
      .then((response) => {
        Crashlytics.setUserEmail(response.data.attributes.email);
        Crashlytics.setUserIdentifier(response.data.id);
        dispatch(
          logUserIn(response.data.attributes, response.data.id, authToken),
        );
      })
      .catch((err) => {
        console.log('err', err);
        Alert.alert('Error', 'Unable to Read User Data.', [{text: 'OK'}], {
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

Landing.propTypes = propTypes;
Landing.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
