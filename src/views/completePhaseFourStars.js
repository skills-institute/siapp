import React, {Component} from 'react';
import {Alert, Image, Text, TouchableWithoutFeedback, View} from 'react-native';
import {
  setHeader,
  readEndpoint,
  updateResource,
  createResource,
} from 'redux-json-api';
import PropTypes from 'prop-types';
import Analytics from '@segment/analytics-react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {updatePhase} from '../actions/userActions';
import styles from './viewStyles/completePhaseFourStars.style';

const Intercom = require('react-native-intercom');

const propTypes = {
  updatePhase: PropTypes.func.isRequired,
  setHeader: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  moduleInfo: PropTypes.object.isRequired,
  createModulesAndPhases: PropTypes.func.isRequired,
  readEndpoint: PropTypes.func.isRequired,
  selectedPhase: PropTypes.number.isRequired,
  updateModulesAndPhases: PropTypes.func.isRequired,
};

const defaultProps = {};

class CompletePhaseFourStars extends Component {
  componentWillMount() {
    const {
      selectedPhase,
      moduleInfo,
      createModulesAndPhases,
      updateModulesAndPhases,
    } = this.props;
    const {id} = this.props.users;
    const {activeSubscription} = this.props.users;
    this.props.setHeader({
      Accept: 'application/json',
      'X-User-Email': this.props.users.email,
      'X-User-Token': this.props.users.authToken,
      'Content-Type': 'application/json',
    });
    // Do not unlock phases if user is repeating a phase.
    // or if the user does not have an active subscription
    // This was added to allow module 1/phase 1 to always
    // be unlocked for all users.
    // if ((selectedPhase >= moduleInfo.currentPhase) && activeSubscription) {
    this.props.updatePhase({prop: moduleInfo});
    this.props.readEndpoint(
      'unlocked_pyramid_modules',
      createModulesAndPhases,
      updateModulesAndPhases,
      id,
      moduleInfo.id,
      selectedPhase,
    );
    // }
  }

  render() {
    const activeSubscription = this.props.users.activeSubscription;
    const {selectedPhase, moduleInfo} = this.props;
    const largeFilledStar = require('../../assets/Icon/StarLargeFilled.png');
    const goldenTrophy = require('../../assets/images/golden-trophy.png');

    return (
      <View style={styles.container}>
        <View
          style={{
            marginTop: 40,
            flex: 3,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Text style={styles.headerText}>{moduleInfo.moduleName} </Text>
          <Text style={styles.headerText}>{`PHASE ${selectedPhase}`}</Text>
          <Text style={styles.completionText}>FUN & DONE</Text>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <Image
                resizeMode="contain"
                style={styles.goldenTrophy}
                source={goldenTrophy}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            marginBottom: 40,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              Analytics.screen('Pyramid');
              Actions.landing({pullData: true});
            }}>
            <View style={styles.buttonView}>
              {/* {activeSubscription ?
                <Text style={styles.buttonText} >Unlock Next Phase</Text>
                : */}
              <Text style={styles.buttonText}>Continue</Text>
              {/* } */}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  dispatch,
  updatePhase: (module) => {
    dispatch(updatePhase(module));
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
  readEndpoint: (endpoint, createData, updateData, userID, moduleID, phase) => {
    dispatch(readEndpoint(endpoint))
      .then((response) => {
        let phasesComplete = [];
        if (phase === 1) {
          phasesComplete = [1, 2];
        }
        if (phase === 2) {
          phasesComplete = [1, 2, 3];
        }
        if (phase === 3) {
          phasesComplete = [1, 2, 3];
        }

        const createModulesAndPhasesData = {
          type: 'unlocked_pyramid_modules',
          attributes: {
            user_id: userID,
            pyramid_module_id: moduleID,
            completed_phases: [1, 2],
          },
        };

        const updateModulesAndPhasesData = {
          type: 'unlocked_pyramid_modules',
          id: 1, // We set this below if we find that the module exists.
          attributes: {
            user_id: userID,
            pyramid_module_id: moduleID,
            completed_phases: phasesComplete,
          },
        };
        // Do a find in our response to look for our module ID.
        // If it is in the response do an update else do a create.
        let pyramidIDExists = false;
        response.data.forEach((responseData) => {
          if (
            parseInt(responseData.attributes.pyramid_module_id, 10) ===
            parseInt(moduleID, 10)
          ) {
            updateModulesAndPhasesData.id = responseData.id;
            pyramidIDExists = true;
          }
        });
        if (pyramidIDExists) {
          updateData(updateModulesAndPhasesData);
        } else {
          createData(createModulesAndPhasesData);
        }
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

CompletePhaseFourStars.propTypes = propTypes;
CompletePhaseFourStars.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompletePhaseFourStars);
