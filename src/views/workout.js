import React, {Component} from 'react'; // TODO: Fix Linter Errors in file
import {
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  Alert,
  ImageBackground,
} from 'react-native';
import {
  setEndpointHost,
  setEndpointPath,
  setHeader,
  readEndpoint,
  createResource,
  updateResource,
} from 'redux-json-api';
import PropTypes from 'prop-types';
import VideoPlayer from 'react-native-video-controls';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Analytics from '@segment/analytics-react-native';
import StarRating from '../components/starRating';
import CustomText from '../components/customText';
import {rateAllFour, rateExercise, unlockModules} from '../actions/userActions';
import * as paths from '../util/apiPaths';
import {loading, loggingIn, logUserIn, userUpdate} from '../actions';
import styles from './viewStyles/workout.style';

const Intercom = require('react-native-intercom');

const {width} = Dimensions.get('window');

const getRatingOfExercisePath = paths.getRatingOfExercisePath;

const propTypes = {
  setHeader: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  moduleInfo: PropTypes.object.isRequired,
  selectedPhase: PropTypes.number.isRequired,
  updateResource: PropTypes.func.isRequired,
  createResource: PropTypes.func.isRequired,
  rateExercise: PropTypes.func.isRequired,
  rateAllFour: PropTypes.func.isRequired,
  unlockModules: PropTypes.func.isRequired,
};

const defaultProps = {};

class Workout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      workout: 0,
      exercise: 0,
      exerciseCounter: 1,
      totalExerciseCount: 0,
      workouts: this.props.moduleInfo.phases[this.props.selectedPhase - 1]
        .workouts,
      newSkillsMastered: 0,
      rated: false,
      ratings: [],
      showKeyframe: true,
      previousExercisesRankedFour: 0,
    };
  }

  // Map over on screen load to calculate.  Use this to calc
  // new skills master by comparing to new ratings
  componentWillMount() {
    let totalExerciseCount = 0;
    let exercisesAtFour = 0;
    this.props.moduleInfo.phases[this.props.selectedPhase - 1].workouts.forEach(
      (workout) => {
        workout.exercises.forEach((exercise) => {
          totalExerciseCount += 1;
          if (exercise.confidenceRating === 4) {
            exercisesAtFour += 1;
          }
        });
      },
    );
    this.setState({
      totalExerciseCount,
      previousExercisesRankedFour: exercisesAtFour,
      ratings: new Array(100).fill(0),
    });
  }

  openModal = () => {
    this.setState({modalVisible: true});
  };

  closeModal = () => {
    this.setState({modalVisible: false});
  };

  nextExercise(phaseInfo, workouts, phase) {
    const moduleName = this.props.moduleInfo.moduleName;
    this.setState({rated: false, showKeyframe: true});
    if (this.state.exerciseCounter < this.state.totalExerciseCount) {
      this.setState({exerciseCounter: this.state.exerciseCounter + 1});
    }
    if (workouts[this.state.workout].exercises[this.state.exercise + 1]) {
      this.setState({exercise: this.state.exercise + 1});
    } else {
      this.setState({exercise: 0});
      if (workouts[this.state.workout + 1]) {
        this.setState({workout: this.state.workout + 1});
      } else {
        let totalExercises = 0;
        let totalRating = 0;
        let phaseRating = 0;
        let totalExercisesAtFour = 0;
        phaseInfo.workouts.forEach((workout) => {
          workout.exercises.forEach((exercise) => {
            totalExercises += 1;
            totalRating += exercise.confidenceRating;
            if (exercise.confidenceRating === 4) {
              totalExercisesAtFour += 1;
            }
          });
        });
        phaseRating = (totalRating / totalExercises).toFixed(1);

        if (phase > 3) {
          this.setState({ratings: new Array(100).fill(0)});
          const newSkills =
            totalExercisesAtFour - this.state.previousExercisesRankedFour;
          Analytics.screen('Complete Phase Not Four Stars');
          // Should we send phase complete if not 4 stars?
          const event = `${moduleName} Phase ${phase} Finished`;
          Analytics.track(event);
          // Intercom.logEvent(event);
          Actions.completePhaseNotFourStars({
            moduleInfo: this.props.moduleInfo,
            selectedPhase: phase,
            newSkillsMastered: newSkills > 0 ? newSkills : 0,
          });
        } else {
          // Check Confidence Rating and Phase Rating and Advance to appropriate completion Screen.
          // If phase 3 and phase rating 4 then unlock neighbors and check for
          if (phaseRating >= 4) {
            const event = `${moduleName} Phase ${phase} Completed`;
            if (phase === 3) {
              Analytics.screen('Complete Workout');
              Analytics.track(event);
              Actions.completeWorkout({moduleInfo: this.props.moduleInfo});
            } else {
              Analytics.screen('Complete Phase Four Stars');
              Analytics.track(event);
              // Intercom.logEvent(event);
              Actions.completePhaseFourStars({
                moduleInfo: this.props.moduleInfo,
                selectedPhase: phase,
              });
            }
          } else {
            const newSkills =
              totalExercisesAtFour - this.state.previousExercisesRankedFour;
            Analytics.screen('Complete Phase Not Four Stars');
            const event = `${moduleName} Phase ${phase} Finished`;
            Analytics.track(event);
            // Intercom.logEvent(event);
            Actions.completePhaseNotFourStars({
              moduleInfo: this.props.moduleInfo,
              selectedPhase: phase,
              newSkillsMastered: newSkills > 0 ? newSkills : 0,
            });
          }
        }
      }
    }
  }

  backExercise(phaseInfo, workouts) {
    this.setState({showKeyframe: true});
    const currentWorkout = this.state.workout;
    if (this.state.exerciseCounter > 1) {
      this.setState({exerciseCounter: this.state.exerciseCounter - 1});
    }
    if (workouts[currentWorkout].exercises[this.state.exercise - 1]) {
      this.setState({exercise: this.state.exercise - 1});
    } else {
      if (workouts[currentWorkout - 1]) {
        this.setState({
          workout: currentWorkout - 1,
          exercise: workouts[currentWorkout - 1].exercises.length - 1,
        });
      }
    }
  }

  rateExercise(
    rating,
    phase,
    workout,
    exercise,
    currentExercise,
    exerciseCounter,
  ) {
    const newRatings = this.state.ratings;
    newRatings[exerciseCounter] = rating;
    const currentWorkoutId = this.state.workouts[this.state.workout]?.id;
    const workoutFilter = '&filter[workout_id]=';
    const getRatingPath =
      getRatingOfExercisePath +
      currentExercise?.id +
      workoutFilter +
      currentWorkoutId;
    this.setState({rated: true, ratings: newRatings});

    const createPostRatingToAPI = {
      type: 'confidence_ratings',
      attributes: {
        user_id: this.props.users?.id,
        workout_id: currentWorkoutId,
        exercise_id: currentExercise?.id,
        rating,
      },
    };

    const updatePostRatingToAPI = {
      id: currentExercise?.id,
      type: 'confidence_ratings',
      attributes: {
        user_id: this.props.users?.id,
        workout_id: currentWorkoutId,
        exercise_id: currentExercise?.id,
        rating,
      },
    };
    let currentExerciseRatingFromAPI = null;
    // Do we have any ratings for this exercise ID?
    fetch(getRatingPath, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-User-Email': this.props.users.email,
        'X-User-Token': this.props.users.authToken,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        if (!responseJSON.error) {
          this.props.setHeader({
            Accept: 'application/json',
            'X-User-Email': this.props.users.email,
            'X-User-Token': this.props.users.authToken,
            'Content-Type': 'application/json',
          });
          currentExerciseRatingFromAPI = responseJSON.data;
          // If we have a rating then updateResource else createEntity
          if (currentExerciseRatingFromAPI.length > 0) {
            updatePostRatingToAPI.id = currentExerciseRatingFromAPI[0].id;
            this.props.updateResource(updatePostRatingToAPI);
          } else {
            this.props.createResource(createPostRatingToAPI);
          }
        }
      })
      .catch(() => {
        // TODO: Do we need an alert for the user here?
      });

    this.props.rateExercise({
      prop: {
        module: this.props.moduleInfo,
        selectedPhase: phase,
        workout,
        exercise,
        rating,
      },
    });
  }

  markExercisesAllFour(phase) {
    this.props.rateAllFour({
      prop: {module: this.props.moduleInfo, selectedPhase: phase},
    });
    if (phase === 3) {
      this.props.unlockModules({prop: {module: this.props.moduleInfo}});
    }
    setTimeout(Actions.landing({pullData: true}), 100);
  }

  keyFrameTouched() {
    this.setState({showKeyframe: false});
  }

  renderModal() {
    const starEmpty = require('../../assets/Icon/StarEmpty.png');
    const starFilled = require('../../assets/Icon/StarFilled.png');
    return (
      <View style={styles.modal}>
        <View
          resizeMode="contain"
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableWithoutFeedback onPress={this.closeModal}>
            <View
              style={{
                flex: 1,
                height: 40,
                width: 40,
                marginTop: 18,
                alignItems: 'center',
              }}>
              <Image
                style={{height: 22, width: 22}}
                source={require('../../assets/Buttons/Exit.png')}
              />
            </View>
          </TouchableWithoutFeedback>
          <Text style={[styles.headerText, {flex: 10, textAlign: 'center'}]}>
            How Did You Do?
          </Text>
          <View style={{flex: 1}} />
        </View>
        <View style={styles.modalStarView}>
          <Text style={styles.modalText}>Need more practice</Text>
          <Image style={{height: 12, width: 12}} source={starFilled} />
          <View style={{width: 4}} />
          <Image style={{height: 12, width: 12}} source={starEmpty} />
          <View style={{width: 4}} />
          <Image style={{height: 12, width: 12}} source={starEmpty} />
          <View style={{width: 4}} />
          <Image style={{height: 12, width: 12}} source={starEmpty} />
        </View>
        <View style={{height: 10}} />
        <View style={styles.modalStarView}>
          <Text style={styles.modalText}>Good but challenging</Text>
          <Image style={{height: 12, width: 12}} source={starFilled} />
          <View style={{width: 4}} />
          <Image style={{height: 12, width: 12}} source={starFilled} />
          <View style={{width: 4}} />
          <Image style={{height: 12, width: 12}} source={starEmpty} />
          <View style={{width: 4}} />
          <Image style={{height: 12, width: 12}} source={starEmpty} />
        </View>
        <View style={{height: 10}} />
        <View style={styles.modalStarView}>
          <Text style={styles.modalText}>Pretty good</Text>
          <Image style={{height: 12, width: 12}} source={starFilled} />
          <View style={{width: 4}} />
          <Image style={{height: 12, width: 12}} source={starFilled} />
          <View style={{width: 4}} />
          <Image style={{height: 12, width: 12}} source={starFilled} />
          <View style={{width: 4}} />
          <Image style={{height: 12, width: 12}} source={starEmpty} />
        </View>
        <View style={{height: 10}} />
        <View style={styles.modalStarView}>
          <Text style={styles.modalText}>Super great</Text>
          <Image style={{height: 12, width: 12}} source={starFilled} />
          <View style={{width: 4}} />
          <Image style={{height: 12, width: 12}} source={starFilled} />
          <View style={{width: 4}} />
          <Image style={{height: 12, width: 12}} source={starFilled} />
          <View style={{width: 4}} />
          <Image style={{height: 12, width: 12}} source={starFilled} />
        </View>
      </View>
    );
  }

  render() {
    const currentExercise = this.state.workouts[this.state.workout]?.exercises[
      this.state?.exercise
    ];
    const doesNotHaveVideo =
      currentExercise?.video === '/videos/original/missing.png';
    const videoURL = `http:${currentExercise?.video}`;
    const keyframeImage = `http:${currentExercise?.keyframeMedium}`;
    const {workouts, workout, exercise, exerciseCounter} = this.state;
    const {selectedPhase, moduleInfo} = this.props;
    return (
      <>
        <View style={styles.container}>
          <View style={{flex: 3}}>
            <Modal
              animationType={'slide'}
              transparent
              visible={this.state.modalVisible}
              onRequestClose={() => Alert('Modal has been closed.')}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {this.renderModal()}
              </View>
            </Modal>
            <View
              style={{
                flex: 1,
                marginTop: 20,
                marginBottom: 10,
                marginRight: 20,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                onPress={() => {
                  if (!currentExercise) {
                    return;
                  }
                  this.backExercise(
                    this.props.moduleInfo.phases[this.props.selectedPhase - 1],
                    this.state.workouts,
                    this.props.selectedPhase,
                  );
                }}
                style={styles.backButton}>
                Back
              </Text>
              <Text
                style={[
                  styles.headerText,
                  {color: '#FFFFFF'},
                ]}>{`Exercise ${this.state.exerciseCounter} of ${this.state.totalExerciseCount}`}</Text>
              <Text
                onPress={Actions.pop}
                style={[styles.backButton, {textAlign: 'right'}]}>
                Exit Phase
              </Text>
            </View>
            <View style={{flex: 12}}>
              <ScrollView scrollEnabled={false}>
                {this.state.showKeyframe || doesNotHaveVideo ? (
                  <View style={{flex: 1}}>
                    <TouchableWithoutFeedback
                      onPress={() => this.keyFrameTouched()}>
                      <ImageBackground
                        resizeMode="contain"
                        style={[
                          styles.imageStyle,
                          {borderWidth: 1, borderColor: '#FFFFFF'},
                        ]}
                        source={{uri: keyframeImage}}>
                        {doesNotHaveVideo ? (
                          <View />
                        ) : (
                          <TouchableWithoutFeedback
                            onPress={() => this.keyFrameTouched()}>
                            <ImageBackground
                              style={styles.keyFramePlayButton}
                              source={require('../../assets/Buttons/Play-w.png')}
                            />
                          </TouchableWithoutFeedback>
                        )}
                      </ImageBackground>
                    </TouchableWithoutFeedback>
                  </View>
                ) : (
                  <View style={{flex: 1}}>
                    <VideoPlayer
                      isFullscreen={false}
                      seekColor={'#FF0000'}
                      paused={false}
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
                  </View>
                )}
              </ScrollView>
            </View>
          </View>
          <View style={{flex: 4}}>
            <ScrollView style={{flex: 2}}>
              <View style={{flex: 20}}>
                <Text style={styles.textStyle}>
                  {workouts[workout]?.exercises[exercise].exerciseName}
                </Text>
                <View style={{height: 5}} />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Text style={styles.setRepRestTextStyle}>
                    {workouts[workout]?.exercises[exercise].exerciseSetText}
                  </Text>
                  <Text style={styles.setRepRestTextStyle}>
                    {workouts[workout]?.exercises[exercise].exerciseRepText}
                  </Text>
                  <Text style={styles.setRepRestTextStyle}>
                    {workouts[workout]?.exercises[exercise].exerciseRestText}
                  </Text>
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <View style={{height: 5}} />
                  <View style={{marginLeft: 20, marginRight: 20}}>
                    <CustomText>
                      {
                        workouts[workout]?.exercises[exercise]
                          .exerciseDescription
                      }
                    </CustomText>
                  </View>
                  <View style={{height: 5}} />
                  <View
                    style={{height: 4, width, backgroundColor: '#000000'}}
                  />
                  <View style={{height: 5}} />
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.confidenceStyling}>
                      How Did You Do?
                    </Text>
                    <View style={{width: 20}} />
                    <TouchableWithoutFeedback onPress={this.openModal}>
                      <Image
                        style={{height: 16, width: 16, marginRight: 20}}
                        source={require('../../assets/Icon/Info-W.png')}
                      />
                    </TouchableWithoutFeedback>
                  </View>
                  <View style={{height: 20}} />
                  {this.state.ratings[exerciseCounter] > 0 ? (
                    <StarRating
                      smallStars={false}
                      rating={
                        moduleInfo.phases[selectedPhase - 1].workouts[workout]
                          ?.exercises[exercise].confidenceRating
                      }
                      onPress={(rating) => {
                        if (!currentExercise) {
                          return;
                        }
                        this.rateExercise(
                          rating,
                          selectedPhase,
                          workout,
                          exercise,
                          currentExercise,
                          exerciseCounter,
                        );
                      }}
                    />
                  ) : (
                    <StarRating
                      smallStars={false}
                      rating={0}
                      onPress={(rating) => {
                        if (!currentExercise) {
                          return;
                        }
                        console.log('exercise', exercise);
                        this.rateExercise(
                          rating,
                          selectedPhase,
                          workout,
                          exercise,
                          currentExercise,
                          exerciseCounter,
                        );
                      }}
                    />
                  )}
                  <View style={{height: 20}} />
                  {this.state.rated ? (
                    <TouchableWithoutFeedback
                      onPress={() =>
                        this.nextExercise(
                          moduleInfo.phases[selectedPhase - 1],
                          workouts,
                          selectedPhase,
                        )
                      }>
                      <View style={styles.nextExerciseView}>
                        <Text style={styles.nextExerciseText}>
                          Next Exercise
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  ) : (
                    <TouchableWithoutFeedback
                      onPress={() => {
                        if (!currentExercise) {
                          return;
                        }
                        this.nextExercise(
                          moduleInfo.phases[selectedPhase - 1],
                          workouts,
                          selectedPhase,
                        );
                      }}>
                      <View style={styles.skipWorkoutView}>
                        <Text style={styles.skipWorkoutText}>SKIP</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  )}
                  <View style={{height: 20}} />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  unlockModules: (data) => {
    dispatch(unlockModules(data));
  },
  rateExercise: (data) => {
    dispatch(rateExercise(data));
  },
  rateAllFour: (data) => {
    dispatch(rateAllFour(data));
  },
  loading: (isLoading) => {
    dispatch(loading(isLoading));
  },
  loggingIn: (newLogInStatus) => {
    dispatch(loggingIn(newLogInStatus));
  },
  logUserIn: (data) => {
    dispatch(logUserIn(data));
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
  createResource: (entity) => {
    dispatch(createResource(entity)).then(
      () => {},
      (error) => {
        // TODO: Do we need alerts for the user here?
        error.response.json().then(
          () => {},
          () => {},
        );
      },
    );
  },
  updateResource: (entity) => {
    dispatch(updateResource(entity)).catch(() => {
      Alert.alert('Error', 'Unable to Update Entity.', [{text: 'OK'}], {
        cancelable: false,
      });
    });
  },
  readEndpoint: (endpoint) => {
    dispatch(readEndpoint(endpoint)).catch(() => {
      Alert.alert('Error', 'Unable to Read Endpoint.', [{text: 'OK'}], {
        cancelable: false,
      });
    });
  },
});

const mapStateToProps = (state) => ({users: state.users});

Workout.propTypes = propTypes;
Workout.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Workout);
