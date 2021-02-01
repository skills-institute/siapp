import React, {Component} from 'react';
import {Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Header from '../components/header';
import Module from '../components/module';
import styles from './viewStyles/trainingPyramid.style';

const propTypes = {
  modulePressed: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
};

const defaultProps = {};

class trainingPyramid extends Component {
  render() {
    const user = this.props.users;
    return (
      <View style={styles.container}>
        <Header headerText="Elite Player Development" />
        <Text />
        <View style={styles.pyramidRow}>
          <Module
            moduleProperties={user.module15}
            onPress={() =>
              this.props.modulePressed({
                prop: 'module15',
                value: !user.module15.locked,
              })
            }
          />
        </View>
        <View style={styles.pyramidRow}>
          <Module
            moduleProperties={user.module13}
            onPress={() =>
              this.props.modulePressed({
                prop: 'module13',
                value: !user.module13.locked,
              })
            }
          />
          <Module
            moduleProperties={user.module14}
            onPress={() =>
              this.props.modulePressed({
                prop: 'module14',
                value: !user.module14.locked,
              })
            }
          />
        </View>
        <View style={styles.pyramidRow}>
          <Module
            moduleProperties={user.module10}
            onPress={() =>
              this.props.modulePressed({
                prop: 'module10',
                value: !user.module10.locked,
              })
            }
          />
          <Module
            moduleProperties={user.module11}
            onPress={() =>
              this.props.modulePressed({
                prop: 'module11',
                value: !user.module11.locked,
              })
            }
          />
          <Module
            moduleProperties={user.module12}
            onPress={() =>
              this.props.modulePressed({
                prop: 'module12',
                value: !user.module12.locked,
              })
            }
          />
        </View>
        <View style={styles.pyramidRow}>
          <Module
            moduleProperties={user.module6}
            onPress={() =>
              this.props.modulePressed({
                prop: 'module6',
                value: !user.module6.locked,
              })
            }
          />
          <Module
            moduleProperties={user.module7}
            onPress={() =>
              this.props.modulePressed({
                prop: 'module7',
                value: !user.module7.locked,
              })
            }
          />
          <Module
            moduleProperties={user.module8}
            onPress={() =>
              this.props.modulePressed({
                prop: 'module8',
                value: !user.module8.locked,
              })
            }
          />
          <Module
            moduleProperties={user.module9}
            onPress={() =>
              this.props.modulePressed({
                prop: 'module9',
                value: !user.module9.locked,
              })
            }
          />
        </View>
        <View style={styles.pyramidRow}>
          <Module
            moduleProperties={user.module1}
            onPress={() =>
              this.props.modulePressed({
                prop: 'module1',
                value: !user.module1.locked,
              })
            }
          />
          <Module
            moduleProperties={user.module2}
            onPress={() =>
              this.props.modulePressed({
                prop: 'module2',
                value: !user.module2.locked,
              })
            }
          />
          <Module
            moduleProperties={user.module3}
            onPress={() =>
              this.props.modulePressed({
                prop: 'module3',
                value: !user.module3.locked,
              })
            }
          />
          <Module
            moduleProperties={user.module4}
            onPress={() =>
              this.props.modulePressed({
                prop: 'module4',
                value: !user.module4.locked,
              })
            }
          />
          <Module
            moduleProperties={user.module5}
            onPress={() =>
              this.props.modulePressed({
                prop: 'module5',
                value: !user.module5.locked,
              })
            }
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({users: state.users});

trainingPyramid.propTypes = propTypes;
trainingPyramid.defaultProps = defaultProps;

export default connect(mapStateToProps, actions)(trainingPyramid);
