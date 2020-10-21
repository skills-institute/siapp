import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Analytics from '@segment/analytics-react-native';
import * as actions from '../actions';
import Module from '../components/module';
import styles from './componentStyles/pyramidRow.style';

const propTypes = {
  users: PropTypes.object.isRequired,
  row: PropTypes.number.isRequired,
  activeTrial: PropTypes.bool,
};

const defaultProps = {
};

const renderModule = (module, row, activeTrial) => (
  <Module
    activeTrial={activeTrial}
    moduleProperties={module}
    row={row}
    onPress={() => {
      if (!module.locked) {
        Analytics.screen('Module Intro');
        Actions.moduleIntro({ moduleInfo: module });
      }
    }}
  />
);

class PyramidRow extends Component {
  render() {
    const user = this.props.users;
    const activeTrial = false;
    let rowReturned = (<View />);
    switch (this.props.row) {
      case 1: rowReturned = (
        <View style={styles.pyramidRow}>
          {renderModule(user.module15, 1, activeTrial)}
        </View>);
        break;

      case 2: rowReturned = (
        <View style={styles.pyramidRow}>
          {renderModule(user.module13, 2, activeTrial)}
          {renderModule(user.module14, 2, activeTrial)}
        </View>);
        break;

      case 3: rowReturned = (
        <View style={styles.pyramidRow}>
          {renderModule(user.module10, 3, activeTrial)}
          {renderModule(user.module11, 3, activeTrial)}
          {renderModule(user.module12, 3, activeTrial)}
        </View>);
        break;

      case 4: rowReturned = (
        <View style={styles.pyramidRow}>
          {renderModule(user.module6, 4, activeTrial)}
          {renderModule(user.module7, 4, activeTrial)}
          {renderModule(user.module8, 4, activeTrial)}
          {renderModule(user.module9, 4, activeTrial)}
        </View>);
        break;

      case 5: rowReturned = (
        <View style={styles.pyramidRow}>
          {renderModule(user.module1, 5, activeTrial)}
          {renderModule(user.module2, 5, activeTrial)}
          {renderModule(user.module3, 5, activeTrial)}
          {renderModule(user.module4, 5, activeTrial)}
          {renderModule(user.module5, 5, activeTrial)}
        </View>);
        break;

      default:
        rowReturned = (<View />);
    }
    return (
      rowReturned
    );
  }
}

const mapStateToProps = state => ({ users: state.users });

PyramidRow.propTypes = propTypes;
PyramidRow.defaultProps = defaultProps;

export default connect(mapStateToProps, actions)(PyramidRow);
