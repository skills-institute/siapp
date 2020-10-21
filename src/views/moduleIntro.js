import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import VideoPlayer from 'react-native-video-controls';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import Analytics from '@segment/analytics-react-native';
import * as actions from '../actions';
import styles from './viewStyles/moduleIntro.style';
import {iconImages} from '../themes/images';

const Intercom = require('react-native-intercom');

const {width} = Dimensions.get('window');

const propTypes = {
  moduleInfo: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const defaultProps = {};

class ModuleIntro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playIntro: false,
    };
  }

  goButtonPressed() {
    this.setState({playIntro: false});
    Analytics.screen('Phase Overview');
    const moduleName = this.props.moduleInfo.moduleName;
    const currentPhase = this.props.moduleInfo.currentPhase;
    const event = `${moduleName} Phase ${currentPhase} Viewed`;
    // We want this to go through Segment not Intercom, but
    // it is not passing from Segment to Intercom for querying
    Analytics.track(event);
    // Intercom.logEvent(event);
    Actions.phaseOverview({moduleInfo: this.props.moduleInfo});
  }

  playIntro() {
    const showIntro = this.state.playIntro;
    this.setState({playIntro: !showIntro});
  }

  render() {
    const activeTrial = this.props.user.activeTrial;
    const keyframeImage = `http:${this.props.moduleInfo.keyFrameMedium}`;
    const doesNotHaveVideo =
      this.props.moduleInfo.video === '/videos/original/missing.png';
    const videoURL = `http:${this.props.moduleInfo.video}`;
    const {locked} = this.props.moduleInfo;
    const {module} = this.props.moduleInfo;
    const activeSubscription = this.props.user.activeSubscription;
    const unlockedModule = this.props.user.unlockedModulesAndPhases.find(
      (m) => m.pyramid_module_id === parseInt(this.props.moduleInfo.id, 10),
    );
    const currentModuleHasRestriction = unlockedModule
      ? !!unlockedModule.has_restriction
      : false;

    let totalAttempts = 0;
    let totalExercises = 0;
    let totalRating = 0;
    let overallRating = 0;
    this.props.moduleInfo.phases.forEach(
      (phase) => (totalAttempts += phase.attempts),
    );
    this.props.moduleInfo.phases.forEach((phase, phaseIndex) => {
      if (phaseIndex <= 2) {
        phase.workouts.forEach((workout) => {
          workout.exercises.forEach((exercise) => {
            totalExercises += 1;
            totalRating += exercise.confidenceRating;
          });
        });
      }
    });
    overallRating = (totalRating / totalExercises).toFixed(1);
    return (
      <LinearGradient
        colors={['#000000', '#131313', '#272727']}
        style={styles.container}>
        <View
          style={{
            marginTop: 30,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <ImageBackground
            style={styles.iconStyle}
            source={iconImages[this.props.moduleInfo.module]}
          />
          <Text style={styles.subHeaderText}>
            {this.props.moduleInfo.moduleName}
          </Text>
          <Text style={styles.headerText}>
            {this.props.moduleInfo.moduleTrack.toUpperCase()}
          </Text>
        </View>
        {this.state.playIntro ? (
          <View style={{flex: 2}}>
            <ScrollView style={{flex: 1}} scrollEnabled={false}>
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
            </ScrollView>
          </View>
        ) : (
          <View style={{flex: 2}}>
            <ImageBackground
              borderRadius={100}
              style={styles.phaseStyle}
              source={{uri: keyframeImage}}>
              <View
                style={{
                  alignItems: 'center',
                  height: 200,
                  width: 200,
                  justifyContent: 'center',
                }}>
                <Text style={styles.phaseText}>PHASE</Text>
                <Text style={styles.phaseNumberText}>
                  {currentModuleHasRestriction
                    ? '1'
                    : `${this.props.moduleInfo.currentPhase}`}
                </Text>
              </View>
            </ImageBackground>
            <View style={{height: 10}} />
            <Image
              resizeMode="stretch"
              style={{
                borderColor: 'white',
                borderWidth: 0,
                height: 16,
                width: 200,
              }}
              source={require('../../assets/Element/Shadow.png')}
            />
            <View style={{height: 20}} />
          </View>
        )}
        {this.state.playIntro ? (
          <TouchableWithoutFeedback onPress={() => this.playIntro()}>
            <View style={styles.playIntroView}>
              <Image
                style={styles.playButtonStyle}
                source={require('../../assets/Buttons/Exit.png')}
              />
              <Text style={styles.playIntroText}>CLOSE INTRO</Text>
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback onPress={() => this.playIntro()}>
            {doesNotHaveVideo ? (
              <View />
            ) : (
              <View style={styles.playIntroView}>
                <Image
                  style={styles.playButtonStyle}
                  source={require('../../assets/Buttons/Play.png')}
                />
                <Text style={styles.playIntroText}>PLAY INTRO</Text>
              </View>
            )}
          </TouchableWithoutFeedback>
        )}
        <View style={{height: 10}} />
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View style={styles.attemptsView}>
            <Text style={styles.subHeaderText}>{`${totalAttempts}`}</Text>
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
            <Text style={styles.subHeaderText}>{overallRating}/4.0</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={styles.playButtonStyle}
                source={require('../../assets/Icon/Cover/Rating.png')}
              />
              <Text style={styles.attemptsAndRatingTexts}>CURRENT RATING</Text>
            </View>
          </View>
        </View>
        <View style={{height: 20}} />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <View style={{flex: 5, alignItems: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => {
                Analytics.screen('Pyramid');
                Actions.landing({pullData: true});
              }}>
              <View style={styles.exitButtonViewStyle}>
                <Image
                  style={styles.exitButtonStyle}
                  source={require('../../assets/Buttons/Exit.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, alignItems: 'center', marginLeft: 10}}>
            <TouchableWithoutFeedback onPress={() => this.goButtonPressed()}>
              <View style={styles.goButtonView}>
                <Text
                  style={{
                    fontFamily: 'WorkSans-Regular',
                    fontWeight: '500',
                    fontSize: 14,
                  }}>
                  GO!
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={{flex: 5}} />
        </View>
      </LinearGradient>
    );
  }
}

const mapStateToProps = (state) => ({user: state.users});

ModuleIntro.propTypes = propTypes;
ModuleIntro.defaultProps = defaultProps;

export default connect(mapStateToProps, actions)(ModuleIntro);
