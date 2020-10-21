import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Alert,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {readEndpoint, createResource, updateResource} from 'redux-json-api';
import _ from 'lodash';
import PropTypes from 'prop-types';
import VideoPlayer from 'react-native-video-controls';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Analytics from '@segment/analytics-react-native';
import WorkoutList from '../components/workoutList';
import {increaseAttempts, updatePhaseAttempts} from '../actions/userActions';
import styles from './viewStyles/phaseOverview.style';

const Intercom = require('react-native-intercom');

const {width} = Dimensions.get('window');

const propTypes = {
  moduleInfo: PropTypes.object.isRequired,
  increaseAttempts: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  readEndpoint: PropTypes.func.isRequired,
};

const defaultProps = {};

class PhaseOverview extends Component {
  constructor(props) {
    super(props);
    this.unlockedModule = props.users.unlockedModulesAndPhases.find(
      (m) => m.pyramid_module_id === parseInt(this.props.moduleInfo.id, 10),
    );
    this.currentModuleHasRestriction = this.unlockedModule
      ? !!this.unlockedModule.has_restriction
      : false;
    this.state = {selectedPhase: 1, showKeyframe: true, videoPaused: false};
  }

  componentWillMount() {
    this.setState({
      selectedPhase: this.currentModuleHasRestriction
        ? 1
        : this.props.moduleInfo.currentPhase,
    });
    Actions.refresh({title: this.props.moduleInfo.moduleName});
  }

  startWorkout(supplementalPhase = null, phaseInfo) {
    const userId = this.props.users.id;
    const phaseId = phaseInfo.id;

    this.props.readEndpoint(
      '/phase_attempts',
      phaseId,
      userId,
      this.props.users.phaseAttempts,
      phaseInfo.attempts,
    );
    this.setState({showKeyframe: true, videoPaused: true});
    if (supplementalPhase) {
      // Update attemps here.
      Analytics.screen('Supplemental Overview');
      Actions.supplementalOverview({
        moduleInfo: this.props.moduleInfo,
        supplementalPhase,
      });
    } else {
      this.props.increaseAttempts({
        prop: {
          module: this.props.moduleInfo,
          selectedPhase: this.state.selectedPhase,
        },
      });
      Analytics.screen('Workout');
      Actions.workout({
        moduleInfo: this.props.moduleInfo,
        selectedPhase: this.state.selectedPhase,
      });
    }
  }

  keyFrameTouched() {
    this.setState({showKeyframe: false});
  }

  renderSupplementalWorkout = (
    workout,
    workoutIndex,
    hasFreePackage = false,
  ) => {
    return (
      <TouchableWithoutFeedback
        key={workout.name}
        onPress={
          hasFreePackage
            ? null
            : () => {
                this.startWorkout(
                  workoutIndex + 4,
                  this.props.moduleInfo.phases[this.state.selectedPhase - 1],
                );
              }
        }>
        <View key={workout.name} style={styles.supplementalView}>
          <View style={{flex: 1}}>
            {hasFreePackage ? (
              <Image
                style={[styles.lockIconStyle, {alignSelf: 'center'}]}
                source={require('../../assets/Icon/lock.png')}
              />
            ) : (
              <Image
                resizeMode="contain"
                style={styles.supplementalImageStyle}
                source={{uri: `http:${workout.keyframeThumb}`}}
              />
            )}
          </View>
          <View style={{flex: 3}}>
            <Text style={styles.supplementalText}>{workout.name}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  supplemlentalWorkouts() {
    const {users} = this.props;
    // const hasFreePackage = users.purchasedPackages.findIndex(
    //   pack => pack.string_id === '10-day-development-guide'
    // ) > -1;
    const {supplementalPhases} = this.props.moduleInfo;

    if (supplementalPhases && supplementalPhases.length > 0) {
      if (this.currentModuleHasRestriction) {
        return (
          <View>
            <View style={styles.supplementalDividerView} />
            <Text style={[styles.supplementalHeader, {fontSize: 25}]}>
              Supplemental Workouts
            </Text>
            <Text style={[styles.supplementalText, {color: '#4A4A4A'}]}>
              {this.props.moduleInfo.displayTrack
                ? this.props.moduleInfo.displayTrack.toUpperCase()
                : ''}
            </Text>
            {this.renderSupplementalWorkout(supplementalPhases[0], 0)}
            {supplementalPhases
              .slice(1, supplementalPhases.length)
              .map((w, i) => this.renderSupplementalWorkout(w, i, true))}
          </View>
        );
      }

      return (
        <View>
          <View style={styles.supplementalDividerView} />
          <Text style={[styles.supplementalHeader, {fontSize: 25}]}>
            Supplemental Workouts
          </Text>
          <Text style={[styles.supplementalText, {color: '#4A4A4A'}]}>
            {this.props.moduleInfo.displayTrack
              ? this.props.moduleInfo.displayTrack.toUpperCase()
              : ''}
          </Text>
          {supplementalPhases.map((w, i) =>
            this.renderSupplementalWorkout(w, i, false),
          )}
        </View>
      );
    }

    return <View />;
  }

  updateIntercom(phaseNumber) {
    const moduleName = this.props.moduleInfo.moduleName;
    const event = `${moduleName} Phase ${phaseNumber} Viewed`;
    // We want this to go through Segment not Intercom, but
    // it is not passing from Segment to Intercom for querying
    Analytics.track(event);
    // Intercom.logEvent(event);
  }

  renderUnlockedPhase = (phase) => (
    <TouchableWithoutFeedback
      key={`phase-${phase}`}
      onPress={() => {
        this.setState({selectedPhase: phase});
        this.updateIntercom(phase);
      }}>
      <View style={{flex: 1}}>
        <Text style={styles.tabPhaseText}>{`Phase ${phase}`}</Text>
        {this.state.selectedPhase === phase ? (
          <View
            style={{
              marginTop: 0,
              width: 32,
              height: 4,
              backgroundColor: '#ce0e2d',
              alignSelf: 'center',
            }}
          />
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );

  renderLockedPhase = (phase) => (
    <View key={`phase-${phase}`} style={{flex: 1}}>
      <Image
        style={[styles.lockIconStyle, {alignSelf: 'center'}]}
        source={require('../../assets/Icon/lock.png')}
      />
    </View>
  );

  renderTabBar() {
    const {users} = this.props;

    // const isOnFreePackage = users.purchasedPackages.findIndex((pack) =>
    //   pack.string_id === '10-day-development-guide'
    // ) > -1;
    const hasCompleteTrainingProgramPackage =
      users.purchasedPackages.findIndex(
        (pack) => pack.string_id === 'full-program-coaches-edition',
      ) > -1;

    if (this.currentModuleHasRestriction) {
      return (
        <View style={styles.tabBarStyle}>
          {this.renderUnlockedPhase(1)}
          {this.renderLockedPhase(2)}
          {this.renderLockedPhase(3)}
        </View>
      );
    }

    if (hasCompleteTrainingProgramPackage) {
      return (
        <View style={styles.tabBarStyle}>
          {[1, 2, 3].map((phase) => this.renderUnlockedPhase(phase))}
        </View>
      );
    }

    return (
      <View style={styles.tabBarStyle}>
        {[1, 2, 3].map((phase) => {
          if (this.props.moduleInfo.currentPhase >= phase) {
            return this.renderUnlockedPhase(phase);
          }
          return this.renderLockedPhase(phase);
        })}
      </View>
    );
    // switch (this.props.moduleInfo.currentPhase) {
    //   case 1:
    //     return (
    //       <View style={styles.tabBarStyle}>
    //         <TouchableWithoutFeedback
    //           onPress={() => {
    //             this.setState({ selectedPhase: 1 });
    //             this.updateIntercom(1);
    //           }
    //           }
    //         >
    //           <View style={{ flex: 1 }}>
    //             <Text style={styles.tabPhaseText}>Phase 1</Text>
    //             {this.state.selectedPhase === 1 ? <View style={{ marginTop: 0, width: 32, height: 4, backgroundColor: '#41E893', alignSelf: 'center' }} /> : null}
    //           </View>
    //         </TouchableWithoutFeedback>
    //         <TouchableWithoutFeedback
    //           onPress={() => {
    //             if (this.props.moduleInfo.currentPhase > 1) {
    //               this.setState({ selectedPhase: 2 });
    //               this.updateIntercom(2);
    //             }
    //           }}
    //         >
    //           <View style={{ flex: 3 }}>
    //             <Image style={[styles.lockIconStyle, { alignSelf: 'center' }]} source={require('../../assets/Icon/lock.png')} />
    //           </View>
    //         </TouchableWithoutFeedback>
    //         <TouchableWithoutFeedback
    //           onPress={() => {
    //             if (this.props.moduleInfo.currentPhase > 2) {
    //               this.setState({ selectedPhase: 3 });
    //               this.updateIntercom(3);
    //             }
    //           }}
    //         >
    //           <View style={{ flex: 1 }}>
    //             <Image style={[styles.lockIconStyle, { alignSelf: 'center' }]} source={require('../../assets/Icon/lock.png')} />
    //           </View>
    //         </TouchableWithoutFeedback>
    //       </View>
    //     );

    //   case 2:
    //     return (
    //       <View style={styles.tabBarStyle}>
    //         <TouchableWithoutFeedback
    //           onPress={() => {
    //             this.setState({ selectedPhase: 1 });
    //             this.updateIntercom(1);
    //           }
    //           }
    //         >
    //           <View style={{ flex: 1 }}>
    //             <Text style={styles.tabPhaseText}>Phase 1</Text>
    //             {this.state.selectedPhase === 1 ? <View style={{ marginTop: 0, width: 32, height: 4, backgroundColor: '#41E893', alignSelf: 'center' }} /> : null}
    //           </View>
    //         </TouchableWithoutFeedback>
    //         <TouchableWithoutFeedback
    //           onPress={() => {
    //             if (this.props.moduleInfo.currentPhase > 1) {
    //               this.setState({ selectedPhase: 2 });
    //               this.updateIntercom(2);
    //             }
    //           }}
    //         >
    //           <View style={{ flex: 1 }}>
    //             <Text style={styles.tabPhaseText}>Phase 2</Text>
    //             {this.state.selectedPhase === 2 ? <View style={{ marginTop: 0, width: 32, height: 4, backgroundColor: '#41E893', alignSelf: 'center' }} /> : null}
    //           </View>
    //         </TouchableWithoutFeedback>
    //         <TouchableWithoutFeedback
    //           onPress={() => {
    //             if (this.props.moduleInfo.currentPhase > 2) {
    //               this.setState({ selectedPhase: 3 });
    //               this.updateIntercom(3);
    //             }
    //           }}
    //         >
    //           <View style={{ flex: 1 }}>
    //             <Image style={[styles.lockIconStyle, { alignSelf: 'center' }]} source={require('../../assets/Icon/lock.png')} />
    //           </View>
    //         </TouchableWithoutFeedback>
    //       </View>
    //     );

    //   case 3:
    //     return (
    //       <View style={styles.tabBarStyle}>
    //         <TouchableWithoutFeedback
    //           onPress={() => {
    //             this.setState({ selectedPhase: 1 });
    //             this.updateIntercom(1);
    //           }
    //           }
    //         >
    //           <View style={{ flex: 1 }}>
    //             <Text style={styles.tabPhaseText}>Phase 1</Text>
    //             {this.state.selectedPhase === 1 ? <View style={{ marginTop: 0, width: 32, height: 4, backgroundColor: '#41E893', alignSelf: 'center' }} /> : null}
    //           </View>
    //         </TouchableWithoutFeedback>
    //         <TouchableWithoutFeedback
    //           onPress={() => {
    //             if (this.props.moduleInfo.currentPhase > 1) {
    //               this.setState({ selectedPhase: 2 });
    //               this.updateIntercom(2);
    //             }
    //           }}
    //         >
    //           <View style={{ flex: 1 }}>
    //             <Text style={styles.tabPhaseText}>Phase 2</Text>
    //             {this.state.selectedPhase === 2 ? <View style={{ marginTop: 0, width: 32, height: 4, backgroundColor: '#41E893', alignSelf: 'center' }} /> : null}
    //           </View>
    //         </TouchableWithoutFeedback>
    //         <TouchableWithoutFeedback
    //           onPress={() => {
    //             if (this.props.moduleInfo.currentPhase > 2) {
    //               this.setState({ selectedPhase: 3 });
    //               this.updateIntercom(3);
    //             }
    //           }}
    //         >
    //           <View style={{ flex: 1 }}>
    //             <Text style={styles.tabPhaseText}>Phase 3</Text>
    //             {this.state.selectedPhase === 3 ? <View style={{ marginTop: 0, width: 32, height: 4, backgroundColor: '#41E893', alignSelf: 'center' }} /> : null}
    //           </View>
    //         </TouchableWithoutFeedback>
    //       </View>

    //     );
    //   default:
    //     return (
    //       <View style={styles.tabBarStyle}>
    //         <TouchableWithoutFeedback
    //           onPress={() => {
    //             this.setState({ selectedPhase: 1 });
    //             this.updateIntercom(1);
    //           }
    //           }
    //         >
    //           <View style={{ flex: 1 }}>
    //             <Text style={styles.tabPhaseText}>Phase 1</Text>
    //             {this.state.selectedPhase === 1 ? <View style={{ marginTop: 0, width: 32, height: 4, backgroundColor: '#41E893', alignSelf: 'center' }} /> : null}
    //           </View>
    //         </TouchableWithoutFeedback>
    //         <TouchableWithoutFeedback
    //           onPress={() => {
    //             if (this.props.moduleInfo.currentPhase > 1) {
    //               this.setState({ selectedPhase: 2 });
    //               this.updateIntercom(2);
    //             }
    //           }}
    //         >
    //           <View style={{ flex: 3 }}>
    //             <Image style={[styles.lockIconStyle, { alignSelf: 'center' }]} source={require('../../assets/Icon/lock.png')} />
    //           </View>
    //         </TouchableWithoutFeedback>
    //         <TouchableWithoutFeedback
    //           onPress={() => {
    //             if (this.props.moduleInfo.currentPhase > 2) {
    //               this.setState({ selectedPhase: 3 });
    //               this.updateIntercom(3);
    //             }
    //           }}
    //         >
    //           <View style={{ flex: 1 }}>
    //             <Image style={[styles.lockIconStyle, { alignSelf: 'center' }]} source={require('../../assets/Icon/lock.png')} />
    //           </View>
    //         </TouchableWithoutFeedback>
    //       </View>
    //     );
    // }
  }

  render() {
    const phaseInfo = this.props.moduleInfo.phases[
      this.state.selectedPhase - 1
    ];
    let totalExercises = 0;
    let totalRating = 0;
    let overallRating = 0;
    phaseInfo.workouts.forEach((workout) => {
      workout.exercises.forEach((exercise) => {
        totalExercises += 1;
        totalRating += exercise.confidenceRating;
      });
    });
    overallRating = (totalRating / totalExercises).toFixed(1);
    const doesNotHaveVideo = phaseInfo.video === '/videos/original/missing.png';
    const videoURL = `http:${phaseInfo.video}`;
    const keyframeImage = `http:${phaseInfo.keyframe}`;

    return (
      <View style={styles.container}>
        <View
          style={{
            marginTop: 64,
            backgroundColor: 'black',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', backgroundColor: 'transparent'}}>
            {' '}
            {this.props.moduleInfo.displayTrack
              ? this.props.moduleInfo.displayTrack.toUpperCase()
              : ''}{' '}
          </Text>
          <View style={{height: 10}} />
          {this.renderTabBar()}
        </View>
        <ScrollView style={styles.container} scrollEnabled>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            {this.state.showKeyframe || doesNotHaveVideo ? (
              <TouchableWithoutFeedback onPress={() => this.keyFrameTouched()}>
                <View style={{borderWidth: 1, borderColor: '#FFFFFF'}}>
                  <ImageBackground
                    resizeMode="contain"
                    style={styles.imageStyle}
                    source={{uri: keyframeImage}}>
                    {doesNotHaveVideo ? (
                      <View />
                    ) : (
                      <ImageBackground
                        style={styles.keyFramePlayButton}
                        source={require('../../assets/Buttons/Play-w.png')}
                      />
                    )}
                  </ImageBackground>
                </View>
              </TouchableWithoutFeedback>
            ) : (
              <VideoPlayer
                isFullscreen={false}
                seekColor={'#FF0000'}
                paused={this.state.videoPaused}
                autoplay
                title={''}
                controlTimeout={2000}
                videoStyle={{}}
                resizeMode={'contain'} // Style appended to <Video> component
                style={{width, height: width * 0.5625}} // Style appended to <View> container
                onError={() => {}} // Fired when an error is encountered on load
                onBack={() => {}} // Function fired when back button is pressed.
                onEnd={() => {}} // Fired when the video is complete.
                source={{uri: videoURL}}
              />
            )}
            <View style={{height: 20}} />
            <TouchableWithoutFeedback
              onPress={() => this.startWorkout(0, phaseInfo)}>
              <View style={styles.startWorkoutView}>
                <Text style={styles.startWorkoutText}>START WORKOUT</Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={{height: 20}} />
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <View style={styles.attemptsView}>
                <Text style={styles.subHeaderText}>{`${
                  this.props.moduleInfo.phases[this.state.selectedPhase - 1]
                    .attempts
                }`}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={styles.playButtonStyle}
                    source={require('../../assets/Icon/Cover/Attempts.png')}
                  />
                  <Text style={styles.attemptsAndRatingTexts}>ATTEMPTS</Text>
                </View>
              </View>
              <View style={{width: 30}} />
              <View style={styles.ratingView}>
                <Text style={styles.subHeaderText}> {overallRating}/4.0</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    style={styles.playButtonStyle}
                    source={require('../../assets/Icon/Cover/Rating.png')}
                  />
                  <Text style={styles.attemptsAndRatingTexts}>
                    CURRENT RATING
                  </Text>
                </View>
              </View>
            </View>
            <View style={{height: 20}} />
            <Text
              style={[styles.workoutText, {marginLeft: 10, marginRight: 10}]}>
              {this.props.moduleInfo.description}
            </Text>
          </View>
          <View style={{height: 20}} />
          <View style={{height: 10}} />
          {this.props.moduleInfo.phases[
            this.state.selectedPhase - 1
          ].workouts.map((workout) => (
            <WorkoutList key={workout.workoutName} workout={workout} />
          ))}
          {this.supplemlentalWorkouts()}
        </ScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  updatePhaseAttempts: (attempts) => {
    dispatch(updatePhaseAttempts(attempts));
  },
  increaseAttempts: (attempts) => {
    dispatch(increaseAttempts(attempts));
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
  updateResource: (entity) => {
    dispatch(updateResource(entity))
      .then(() => {})
      .catch(() => {
        Alert.alert('Error', 'Unable to Update Entity.', [{text: 'OK'}], {
          cancelable: false,
        });
      });
  },
  readEndpoint: (endpoint, phaseId, userId, phaseAttempts, currentAttempts) => {
    dispatch(readEndpoint(endpoint))
      .then(() => {
        const createAttempts = {
          type: 'phase_attempts',
          attributes: {
            user_id: userId,
            phase_id: phaseId,
            count: 1,
          },
        };

        const updateAttempts = {
          id: 0, // phase_attempts ID here
          type: 'phase_attempts',
          attributes: {
            user_id: userId,
            phase_id: phaseId,
            count: currentAttempts + 1,
          },
        };

        // If current phase ID is in response then update else create
        // dispatch(updatePhaseAttempts(response));
        const foundAtttemptsForCurrentPhase = _.find(phaseAttempts, {
          phaseId: parseInt(phaseId, 10),
        });
        if (foundAtttemptsForCurrentPhase) {
          updateAttempts.id = foundAtttemptsForCurrentPhase.phaseAttemptId;
          dispatch(updateResource(updateAttempts));
        } else {
          dispatch(createResource(createAttempts));
        }
      })
      .catch(() => {
        Alert.alert(
          'Error',
          `Unable to Read Endpoint: ${endpoint}`,
          [{text: 'OK'}],
          {cancelable: false},
        );
      });
  },
});

const mapStateToProps = (state) => ({users: state.users});

PhaseOverview.propTypes = propTypes;
PhaseOverview.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(PhaseOverview);
