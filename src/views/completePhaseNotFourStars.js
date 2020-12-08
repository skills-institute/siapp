import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import Analytics from '@segment/analytics-react-native';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Header from '../components/header';
import CustomButton from '../components/customButton';
import styles from './viewStyles/completePhaseNotFourStars.style';

const propTypes = {
  moduleInfo: PropTypes.object.isRequired,
  selectedPhase: PropTypes.number.isRequired,
  newSkillsMastered: PropTypes.number.isRequired,
};

const defaultProps = {};

class CompletePhaseNotFourStars extends Component {
  constructor(props) {
    super(props);
    this.unlockedModule = props.user.unlockedModulesAndPhases.find(
      (m) => m.pyramid_module_id === parseInt(this.props.moduleInfo.id, 10),
    );
    this.currentModuleHasRestriction = this.unlockedModule
      ? !!this.unlockedModule.has_restriction
      : false;
    this.state = {hasAdditionalWorkouts: false};
  }

  startWorkout(supplementalPhase = null) {
    const {moduleInfo} = this.props;
    if (supplementalPhase) {
      // Update attemps here.
      Analytics.screen('Supplemental Overview');
      Actions.supplementalOverview({moduleInfo, supplementalPhase});
    }
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
            Supplemental Exercises
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
            Supplemental Exercises
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

  render() {
    const extraWorkouts = [];
    const {moduleInfo, selectedPhase} = this.props;
    moduleInfo.phases.map((phase, phaseIndex) => {
      if (phaseIndex > 2) {
        // Add phase to our supplemtalal workouts to show as extra workouts.
        extraWorkouts.push(phase);
      }
      return 0;
    });

    let totalExercises = 0;
    let totalRating = 0;
    let phaseRating = 0;
    moduleInfo.phases[selectedPhase - 1]?.workouts.map((workout) => {
      workout.exercises.map((exercise) => {
        totalExercises += 1;
        totalRating += exercise.confidenceRating;
        return 0;
      });
      return 0;
    });
    phaseRating = (totalRating / totalExercises).toFixed(1);
    let phaseText1 = '';
    let phaseText2 = '';
    if (phaseRating > 2) {
      phaseText1 = 'WANT MORE FUN EXERCISES?  TRY';
      phaseText2 = 'THESE OUT.';
    } else {
      phaseText1 = 'WANT MORE FUN EXERCISES? TRY';
      phaseText2 = 'THESE OUT.';
    }
    const newSkillText =
      this.props.newSkillsMastered === 1
        ? 'New Skill Mastered'
        : 'New Skills Mastered';
    return (
      <LinearGradient
        colors={['#000000', '#131313', '#272727']}
        style={styles.container}>
        <View style={{flex: 4, alignItems: 'center', paddingTop: 20}}>
          <Header headerText={this.props.moduleInfo.moduleName} />
          <Header headerText={`PHASE ${this.props.selectedPhase}`} />
          <View style={{height: 20}} />
          <Text style={styles.completeText}>Fun & Done</Text>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <Text style={[styles.headerTextStyle]}>{phaseRating}</Text>
              <Text
                style={[
                  styles.textStyle,
                  {paddingBottom: 8, fontFamily: 'Roboto-Regular'},
                ]}>
                /4.0
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  styles.skillsTextStyle,
                  {fontFamily: 'Roboto-Regular'},
                ]}>{`${this.props.newSkillsMastered}`}</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.textStyle, {flex: 1, textAlign: 'center'}]}>
              Skill Level
            </Text>
            <Text style={[styles.textStyle, {flex: 1, textAlign: 'center'}]}>
              {newSkillText}
            </Text>
          </View>
        </View>

        {extraWorkouts.length > 0 ? (
          <View style={{flex: 2}}>
            <View style={{height: 20}} />
            <Text style={styles.improveStyle}>{phaseText1}</Text>
            <Text style={styles.improveStyle}>{phaseText2}</Text>
          </View>
        ) : null}

        <View
          style={{
            flex: 6,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <ScrollView style={{flex: 1, backgroundColor: 'transparent'}}>
            {this.supplemlentalWorkouts()}
          </ScrollView>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 20}}>
          <View style={{height: 30}} />
          <CustomButton
            onPress={() => {
              Analytics.screen('Pyramid');
              Actions.landing({pullData: true});
            }}>
            OK
          </CustomButton>
        </View>
      </LinearGradient>
    );
  }
}

CompletePhaseNotFourStars.propTypes = propTypes;
CompletePhaseNotFourStars.defaultProps = defaultProps;

const mapStateToProps = (state) => ({user: state.users});

export default connect(mapStateToProps, actions)(CompletePhaseNotFourStars);
