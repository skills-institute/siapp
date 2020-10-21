import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import VideoPlayer from 'react-native-video-controls';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Analytics from '@segment/analytics-react-native';
import * as actions from '../actions';
import WorkoutList from '../components/workoutList';
import styles from './viewStyles/supplementalOverview.style';

const {width} = Dimensions.get('window');

const propTypes = {
  users: PropTypes.object.isRequired,
  moduleInfo: PropTypes.object.isRequired,
  increaseAttempts: PropTypes.func.isRequired,
  supplementalPhase: PropTypes.number.isRequired,
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
    this.state = {
      selectedPhase: this.props.supplementalPhase,
      showKeyframe: true,
    };
  }

  componentWillMount() {
    this.setState({selectedPhase: this.props.supplementalPhase});
  }

  startWorkout() {
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

  renderTabBar() {
    return (
      <View style={styles.tabBarStyle}>
        <View style={{flex: 1}}>
          <Text style={styles.tabPhaseText}>
            {this.props.moduleInfo.phases[this.state.selectedPhase - 1].name}
          </Text>
          {this.state.selectedPhase === 1 ? (
            <View
              style={{
                marginTop: 0,
                width: 32,
                height: 4,
                backgroundColor: '#41E893',
                alignSelf: 'center',
              }}
            />
          ) : null}
        </View>
      </View>
    );
  }

  render() {
    const phaseInfo = this.props.moduleInfo.phases[
      this.state.selectedPhase - 1
    ];
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
            {this.props.moduleInfo.displayTrack.toUpperCase()}{' '}
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
            )}
            <View style={{height: 20}} />
            <TouchableWithoutFeedback onPress={() => this.startWorkout()}>
              <View style={styles.startWorkoutView}>
                <Text style={styles.startWorkoutText}>START WORKOUT</Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={{height: 20}} />
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <View style={styles.attemptsView}>
                <Text style={styles.subHeaderText}>
                  {
                    this.props.moduleInfo.phases[this.state.selectedPhase - 1]
                      .attempts
                  }
                </Text>
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
                <Text style={styles.subHeaderText}>
                  {
                    this.props.moduleInfo.phases[this.state.selectedPhase - 1]
                      .phaseRating
                  }
                  /4.0
                </Text>
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
            <Text style={styles.workoutText}>
              In this phase you will look to master
            </Text>
            <Text style={styles.workoutText}>the following skills</Text>
          </View>
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

const mapStateToProps = (state) => ({users: state.users});

PhaseOverview.propTypes = propTypes;
PhaseOverview.defaultProps = defaultProps;

export default connect(mapStateToProps, actions)(PhaseOverview);
