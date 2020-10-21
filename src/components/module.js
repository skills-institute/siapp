import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableWithoutFeedback,
  Image,
  Text,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import styles from './componentStyles/module.style';

const {width} = Dimensions.get('window');
const moduleSquareSize = width / 6.0;

const propTypes = {
  moduleProperties: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
  row: PropTypes.number.isRequired,
  activeTrial: PropTypes.bool.isRequired,
};

const defaultProps = {
  headerText: 'Hello World',
};

const moduleProgressBarOffset = 4;

const Module = ({moduleProperties, onPress, row, activeTrial}) => {
  const images = [
    require('../../assets/Icon/Pyramid/Lock.png'),
    require('../../assets/Icon/Pyramid/White/01-FirstTouch.png'),
    require('../../assets/Icon/Pyramid/White/02-BallControl.png'),
    require('../../assets/Icon/Pyramid/White/03-Quickness.png'),
    require('../../assets/Icon/Pyramid/White/04-SoccerStrength.png'),
    require('../../assets/Icon/Pyramid/White/05-GeneralStrength.png'),
    require('../../assets/Icon/Pyramid/White/06-PassingCombos.png'),
    require('../../assets/Icon/Pyramid/White/07-QuickSkills.png'),
    require('../../assets/Icon/Pyramid/White/08-PowerAgility.png'),
    require('../../assets/Icon/Pyramid/White/09-PowerfulBursts.png'),
    require('../../assets/Icon/Pyramid/White/10-CreativeSkill.png'),
    require('../../assets/Icon/Pyramid/White/11-SoccerSpeed.png'),
    require('../../assets/Icon/Pyramid/White/12-SoccerPower.png'),
    require('../../assets/Icon/Pyramid/White/13-GameSpeedSkill.png'),
    require('../../assets/Icon/Pyramid/White/14-GameSpeedPower.png'),
    require('../../assets/Icon/Pyramid/White/15-SeasonalPrograms.png'),
  ];

  const imagesBlack = [
    require('../../assets/Icon/Pyramid/Lock.png'),
    require('../../assets/Icon/Pyramid/Black/01-FirstTouch.png'),
    require('../../assets/Icon/Pyramid/Black/02-BallControl.png'),
    require('../../assets/Icon/Pyramid/Black/03-Quickness.png'),
    require('../../assets/Icon/Pyramid/Black/04-SoccerStrength.png'),
    require('../../assets/Icon/Pyramid/Black/05-GeneralStrength.png'),
    require('../../assets/Icon/Pyramid/Black/06-PassingCombos.png'),
    require('../../assets/Icon/Pyramid/Black/07-QuickSkills.png'),
    require('../../assets/Icon/Pyramid/Black/08-PowerAgility.png'),
    require('../../assets/Icon/Pyramid/Black/09-PowerfulBursts.png'),
    require('../../assets/Icon/Pyramid/Black/10-CreativeSkill.png'),
    require('../../assets/Icon/Pyramid/Black/11-SoccerSpeed.png'),
    require('../../assets/Icon/Pyramid/Black/12-SoccerPower.png'),
    require('../../assets/Icon/Pyramid/Black/13-GameSpeedSkill.png'),
    require('../../assets/Icon/Pyramid/Black/14-GameSpeedPower.png'),
    require('../../assets/Icon/Pyramid/Black/15-SeasonalPrograms.png'),
  ];

  let totalExercises = 0;
  let totalConfidenceRating = 0;

  moduleProperties.phases.forEach((phase, phaseIndex) => {
    if (phaseIndex < 3) {
      phase.workouts.forEach((workout) => {
        workout.exercises.forEach((exercise) => {
          totalExercises += 1;
          totalConfidenceRating += exercise.confidenceRating;
        });
      });
    }
  });

  let percentComplete =
    (totalConfidenceRating / (totalExercises * 4)).toFixed(2) * 100;
  if (!percentComplete) {
    percentComplete = 0;
  }
  // Remove the above % complete once the back end is returning it properly.
  // Below is the back end % complete which at this time is including supplemental workouts.
  // TODO: On the back end.  It is only calculating percentComplete if the user is completing
  // ...  a phase. We need it to calculate anytime it receives a workout rating
  // percentComplete = moduleProperties.percentComplete ? moduleProperties.percentComplete : 0;
  let moduleStyle;
  const moduleName = moduleProperties.moduleName
    ? moduleProperties.moduleName.split(' ')
    : ' ';
  moduleStyle = styles.moduleUnlocked;
  if (percentComplete === 100) {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.moduleWithProgressStyle}>
          <AnimatedCircularProgress
            size={moduleSquareSize + moduleProgressBarOffset}
            width={2}
            prefill={-100}
            fill={percentComplete}
            rotation={0}
            tintColor="#FFFFFF"
            backgroundColor="black">
            {() => (
              <View style={styles.progressBarStyle}>
                <View style={styles.moduleComplete}>
                  <ImageBackground
                    style={styles.imageStyle}
                    source={imagesBlack[moduleProperties.module]}
                  />
                  <Text style={[styles.dayStreak, {color: '#000000'}]}>
                    {`${moduleProperties.dayStreak} days`}
                  </Text>
                </View>
              </View>
            )}
          </AnimatedCircularProgress>
          <Text style={styles.moduleNameStyle}>
            {moduleName[0] ? moduleName[0] : ' '}
          </Text>
          <Text style={styles.moduleNameStyle}>
            {moduleName[1] ? moduleName[1] : ' '}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  if (row === 5 && activeTrial) {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.moduleWithProgressStyle}>
          <AnimatedCircularProgress
            size={moduleSquareSize + moduleProgressBarOffset}
            width={2}
            prefill={-100}
            fill={percentComplete}
            rotation={0}
            tintColor="#ce0e2d"
            backgroundColor="black">
            {() => (
              <View style={styles.progressBarStyle}>
                <View style={moduleStyle}>
                  <ImageBackground
                    style={styles.imageStyle}
                    source={images[moduleProperties.module]}
                  />
                  <Text
                    style={
                      styles.dayStreak
                    }>{`${moduleProperties.dayStreak} days`}</Text>
                </View>
              </View>
            )}
          </AnimatedCircularProgress>
          <Text style={styles.moduleNameStyle}>
            {moduleName[0] ? moduleName[0] : ' '}
          </Text>
          <Text style={styles.moduleNameStyle}>
            {moduleName[1] ? moduleName[1] : ' '}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  if (moduleProperties && moduleProperties.locked) {
    moduleStyle = styles.moduleLocked;
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.moduleWithProgressStyle}>
          <AnimatedCircularProgress
            size={moduleSquareSize + moduleProgressBarOffset}
            width={2}
            prefill={-100}
            fill={percentComplete}
            rotation={0}
            tintColor="#ce0e2d"
            backgroundColor="black">
            {() => (
              <View style={styles.progressBarStyle}>
                <View style={moduleStyle}>
                  <Image
                    style={styles.lockImageStyle}
                    source={require('../..//assets/Icon/Pyramid/Lock.png')}
                  />
                </View>
              </View>
            )}
          </AnimatedCircularProgress>
          <Text style={styles.moduleNameStyle}>
            {moduleName[0] ? moduleName[0] : ' '}
          </Text>
          <Text style={styles.moduleNameStyle}>
            {moduleName[1] ? moduleName[1] : ' '}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.moduleWithProgressStyle}>
        <AnimatedCircularProgress
          size={moduleSquareSize + moduleProgressBarOffset}
          width={2}
          prefill={-100}
          fill={percentComplete}
          rotation={0}
          tintColor="#ce0e2d"
          backgroundColor="black">
          {() => (
            <View style={styles.progressBarStyle}>
              <View style={moduleStyle}>
                <ImageBackground
                  style={styles.imageStyle}
                  source={images[moduleProperties.module]}
                />
                <Text
                  style={
                    styles.dayStreak
                  }>{`${moduleProperties.dayStreak} days`}</Text>
              </View>
            </View>
          )}
        </AnimatedCircularProgress>
        <Text style={styles.moduleNameStyle}>
          {moduleName[0] ? moduleName[0] : ' '}
        </Text>
        <Text style={styles.moduleNameStyle}>
          {moduleName[1] ? moduleName[1] : ' '}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

Module.propTypes = propTypes;
Module.defaultProps = defaultProps;

export default Module;
