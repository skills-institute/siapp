import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {updateResource} from 'redux-json-api';
import PropTypes from 'prop-types';
import Analytics from '@segment/analytics-react-native';
import {connect} from 'react-redux';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import ImagePicker from 'react-native-image-picker';
import {newImage} from '../actions/userActions';
import styles from './componentStyles/playerInfo.style';

const {width} = Dimensions.get('window');
const playerImageSquareSize = width / 4.0;

const propTypes = {
  user: PropTypes.object.isRequired,
  editMode: PropTypes.bool,
  updateResource: PropTypes.func.isRequired,
};

const defaultProps = {
  editMode: false,
};

class PlayerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: require('../..//assets/images/morgan_davis.png'),
    };
  }
  calculateTotalProgress() {
    const skillPyramid = [1, 2, 3, 6, 7, 10];
    const speedPyramid = [2, 3, 4, 7, 8, 11];
    const powerPyramid = [3, 4, 5, 8, 9, 12];

    let moduleNumber = 0;
    const moduleData = [];
    let exerciseCount = 0;
    let exercisesAtFour = 0;
    const tallyExercises = (phase, phaseIndex) => {
      if (phaseIndex < 3) {
        phase.workouts.forEach((workout) => {
          workout.exercises.forEach((exercise) => {
            exerciseCount += 1;
            if (exercise.confidenceRating === 4) {
              exercisesAtFour += 1;
            }
          });
        });
      }
    };
    for (moduleNumber = 1; moduleNumber < 16; moduleNumber += 1) {
      exerciseCount = 0;
      exercisesAtFour = 0;
      const moduleBeingTallied = this.props.user[`module${moduleNumber}`];
      moduleBeingTallied.phases.forEach(tallyExercises);
      moduleData[moduleNumber] = {
        totalExercises: exerciseCount,
        exercisesRatedFour: exercisesAtFour,
      };
    }

    exerciseCount = 0;
    exercisesAtFour = 0;
    skillPyramid.forEach((skillModule) => {
      exerciseCount += moduleData[skillModule].totalExercises;
      exercisesAtFour += moduleData[skillModule].exercisesRatedFour;
    });
    const skillRating = (exercisesAtFour / exerciseCount) * 100;

    exerciseCount = 0;
    exercisesAtFour = 0;
    speedPyramid.forEach((speedModule) => {
      exerciseCount += moduleData[speedModule].totalExercises;
      exercisesAtFour += moduleData[speedModule].exercisesRatedFour;
    });
    const speedRating = (exercisesAtFour / exerciseCount) * 100;

    exerciseCount = 0;
    exercisesAtFour = 0;
    powerPyramid.forEach((powerModule) => {
      exerciseCount += moduleData[powerModule].totalExercises;
      exercisesAtFour += moduleData[powerModule].exercisesRatedFour;
    });
    const powerRating = (exercisesAtFour / exerciseCount) * 100;

    return {skill: skillRating, speed: speedRating, power: powerRating};
  }

  render() {
    const {skill, speed, power} = this.calculateTotalProgress();
    const {editMode} = this.props;
    const {nickName, firstName, lastName, id, playerImage} = this.props.user;
    let hasPlayerImage;

    if (playerImage) {
      hasPlayerImage = !playerImage.includes('default-avatar');
    }

    const options = {
      title: 'Select Image',
      maxWidth: 150,
      maxHeight: 150,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    return (
      <View
        style={[
          styles.container,
          editMode ? {marginTop: -30} : {marginTop: 15},
        ]}>
        {editMode ? (
          <View
            style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
            <Text style={styles.nickText}>{nickName.substring(0, 30)}</Text>
            <Text style={styles.nameText}>{firstName.substring(0, 16)}</Text>
            <Text style={styles.nameText}>{lastName.substring(0, 16)}</Text>
          </View>
        ) : null}
        <View style={{flexDirection: 'row', flex: 2, marginTop: 10}}>
          <TouchableWithoutFeedback
            onPress={() => {
              Analytics.screen('Pyramid');
              Actions.landing({pullData: true});
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              {editMode ? (
                <Image
                  style={{width: 27, height: 27}}
                  source={require('../../assets/Buttons/Exit.png')}
                />
              ) : null}
            </View>
          </TouchableWithoutFeedback>
          <View style={{flex: 2, alignItems: 'center'}}>
            <View style={{}}>
              <AnimatedCircularProgress
                size={playerImageSquareSize + 33}
                width={4}
                prefill={-100}
                fill={power}
                rotation={0}
                tintColor="#e5172f"
                backgroundColor="black">
                {() => (
                  <View style={styles.middleCircle}>
                    <AnimatedCircularProgress
                      size={playerImageSquareSize + 22}
                      width={4}
                      prefill={-100}
                      fill={skill}
                      rotation={0}
                      tintColor="#9B9B9B"
                      backgroundColor="black">
                      {() => (
                        <View style={styles.innerCircle}>
                          <AnimatedCircularProgress
                            size={playerImageSquareSize + 11}
                            width={4}
                            prefill={-100}
                            fill={speed}
                            rotation={0}
                            tintColor="#fff"
                            backgroundColor="black">
                            {() => (
                              <View style={styles.imageView}>
                                <TouchableOpacity
                                  onPress={() => {
                                    ImagePicker.showImagePicker(
                                      options,
                                      (response) => {
                                        const avatarToUpload = `data:image/jpeg;base64,${response.data}`;
                                        const avatarImage = {
                                          id,
                                          type: 'users',
                                          attributes: {
                                            avatar: avatarToUpload,
                                          },
                                        };
                                        this.props.updateResource(avatarImage);
                                      },
                                    );
                                  }}>
                                  {hasPlayerImage ? (
                                    <Image
                                      style={styles.imageStyle}
                                      source={{uri: playerImage}}
                                    />
                                  ) : (
                                    <Image
                                      style={styles.imageStyle}
                                      source={require('../../assets/images/profilecenter.png')}
                                    />
                                  )}
                                </TouchableOpacity>
                              </View>
                            )}
                          </AnimatedCircularProgress>
                        </View>
                      )}
                    </AnimatedCircularProgress>
                  </View>
                )}
              </AnimatedCircularProgress>
            </View>
          </View>
          <View style={{flex: 1}} />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  newImage: (image) => {
    dispatch(newImage(image));
  },
  updateResource: (entity) => {
    dispatch(updateResource(entity))
      .then((response) => {
        dispatch(
          newImage({
            prop: 'newImage',
            value: response.data.attributes.avatar.url,
          }),
        );
      })
      .catch(() => {
        Alert.alert('Error', 'Unable to Update Photo.', [{text: 'OK'}], {
          cancelable: false,
        });
      });
  },
});

PlayerInfo.propTypes = propTypes;
PlayerInfo.defaultProps = defaultProps;

const mapStateToProps = (state) => ({user: state.users});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerInfo);
