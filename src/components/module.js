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
    require('../../assets/Icon/Pyramid/White/1.png'),
    require('../../assets/Icon/Pyramid/White/2.png'),
    require('../../assets/Icon/Pyramid/White/3.png'),
    require('../../assets/Icon/Pyramid/White/4.png'),
    require('../../assets/Icon/Pyramid/White/5.png'),
    require('../../assets/Icon/Pyramid/White/1.png'),
    require('../../assets/Icon/Pyramid/White/1.png'),
    require('../../assets/Icon/Pyramid/White/1.png'),
    require('../../assets/Icon/Pyramid/White/9.png'),
    require('../../assets/Icon/Pyramid/White/1.png'),
    require('../../assets/Icon/Pyramid/White/1.png'),
    require('../../assets/Icon/Pyramid/White/12.png'),
    require('../../assets/Icon/Pyramid/White/1.png'),
    require('../../assets/Icon/Pyramid/White/1.png'),
    require('../../assets/Icon/Pyramid/White/1.png'),
  ];

  const imagesBlack = [
    require('../../assets/Icon/Pyramid/Lock.png'),
    require('../../assets/Icon/Pyramid/Black/1.png'),
    require('../../assets/Icon/Pyramid/Black/2.png'),
    require('../../assets/Icon/Pyramid/Black/3.png'),
    require('../../assets/Icon/Pyramid/Black/4.png'),
    require('../../assets/Icon/Pyramid/Black/5.png'),
    require('../../assets/Icon/Pyramid/Black/1.png'),
    require('../../assets/Icon/Pyramid/Black/1.png'),
    require('../../assets/Icon/Pyramid/Black/1.png'),
    require('../../assets/Icon/Pyramid/Black/9.png'),
    require('../../assets/Icon/Pyramid/Black/1.png'),
    require('../../assets/Icon/Pyramid/Black/1.png'),
    require('../../assets/Icon/Pyramid/Black/12.png'),
    require('../../assets/Icon/Pyramid/Black/1.png'),
    require('../../assets/Icon/Pyramid/Black/1.png'),
    require('../../assets/Icon/Pyramid/Black/1.png'),
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
