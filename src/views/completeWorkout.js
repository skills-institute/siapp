import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
  setHeader,
  readEndpoint,
  updateResource,
  createResource,
} from 'redux-json-api';
import PropTypes from 'prop-types';
/* eslint-disable import/extensions */
import LinearGradient from 'react-native-linear-gradient';
/* eslint-enable import/extensions */
import Analytics from '@segment/analytics-react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {unlockModules} from '../actions/userActions';
import styles from './viewStyles/completeWorkout.style';

const propTypes = {
  unlockModules: PropTypes.func.isRequired,
  moduleInfo: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  setHeader: PropTypes.func.isRequired,
  readEndpoint: PropTypes.func.isRequired,
  createModulesAndPhases: PropTypes.func.isRequired,
  updateModulesAndPhases: PropTypes.func.isRequired,
};

const defaultProps = {};

class CompleteWorkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updatingBackEnd: false,
    };
  }

  componentWillMount() {
    this.props.unlockModules({prop: {module: this.props.moduleInfo}});
  }

  sendUnlockedModulesToBackEnd(unlockedResponse) {
    let moduleNumber = 0;
    for (moduleNumber = 1; moduleNumber < 16; moduleNumber += 1) {
      const module = this.props.users[`module${moduleNumber}`];
      const currentPhase = module.currentPhase;
      if (!module.locked) {
        // update back end with proper unlocked modules/phases here
        const createModulesAndPhasesData = {
          type: 'unlocked_pyramid_modules',
          attributes: {
            user_id: this.props.users.id,
            pyramid_module_id: module.id,
            completed_phases: [1],
          },
        };
        let phases = [];
        if (currentPhase === 1) {
          phases = [1];
        }
        if (currentPhase === 2) {
          phases = [1, 2];
        }
        if (currentPhase === 3) {
          phases = [1, 2, 3];
        }

        const updateModulesAndPhasesData = {
          type: 'unlocked_pyramid_modules',
          id: 1, // SET unlock_pyramid_module ID here.
          attributes: {
            user_id: this.props.users.id,
            pyramid_module_id: module.id,
            completed_phases: phases,
          },
        };
        // Do a find in our response to look for our module ID.
        // If it is in the response do an update else do a create.
        let pyramidIDExists = false;
        unlockedResponse.data.forEach((responseData) => {
          if (
            parseInt(responseData.attributes.pyramid_module_id, 10) ===
            parseInt(module.id, 10)
          ) {
            updateModulesAndPhasesData.id = responseData.id;
            pyramidIDExists = true;
          }
        });
        if (pyramidIDExists) {
          this.props.updateModulesAndPhases(updateModulesAndPhasesData);
        } else {
          this.props.createModulesAndPhases(createModulesAndPhasesData);
        }
      }
    }
    this.setState({updatingBackEnd: false});
    Analytics.screen('Pyramid');
    Actions.landing({pullData: true});
  }

  updateBackEndWithUnlockedModules() {
    this.setState({updatingBackEnd: true});
    this.props.setHeader({
      Accept: 'application/json',
      'X-User-Email': this.props.users.email,
      'X-User-Token': this.props.users.authToken,
      'Content-Type': 'application/json',
    });

    this.props.readEndpoint(
      'unlocked_pyramid_modules',
      this.sendUnlockedModulesToBackEnd.bind(this),
    );
  }

  render() {
    return (
      <LinearGradient
        colors={['#000000', '#131313', '#272727']}
        style={styles.gradient}>
        <View style={styles.container}>
          <View
            style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
            <Text style={styles.headerText}>
              {this.props.moduleInfo.moduleName}{' '}
            </Text>
            <View style={{height: 50}} />
            <Text style={styles.completionText}>COMPLETE</Text>
          </View>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row'}}>
              <Image
                resizeMode="contain"
                style={styles.ringStyle}
                source={require('../../assets/Element/CoverRing/Ring Complete.png')}
              />
            </View>
          </View>
          <View style={{height: 0}} />
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
            <View style={{height: 20}} />
            {this.state.updatingBackEnd ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  Analytics.screen('Pyramid');
                  Actions.landing({pullData: true});
                }}
                style={styles.buttonView}>
                <Text style={styles.buttonText}>CONTINUE</Text>
              </TouchableOpacity>
            )}
            <View style={{height: 20}} />
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  unlockModules: (module) => {
    dispatch(unlockModules(module));
  },
  setHeader: (headers) => {
    dispatch(setHeader(headers));
  },
  updateModulesAndPhases: (entity) => {
    dispatch(updateResource(entity))
      .then(() => {})
      .catch(() => {
        Alert.alert(
          'Error',
          'Unable to Update Modules and Phases.',
          [{text: 'OK'}],
          {cancelable: false},
        );
      });
  },
  createModulesAndPhases: (entity) => {
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
  readEndpoint: (endpoint, unlockModulesOnBackEnd) => {
    dispatch(readEndpoint(endpoint))
      .then((response) => {
        unlockModulesOnBackEnd(response);
      })
      .catch(() => {
        Alert.alert(
          'Error',
          'Unable to Read Pyramid Unlocked Data.',
          [{text: 'OK', onPress: () => null}],
          {cancelable: false},
        );
      });
  },
});

const mapStateToProps = (state) => ({users: state.users});

CompleteWorkout.propTypes = propTypes;
CompleteWorkout.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(CompleteWorkout);
