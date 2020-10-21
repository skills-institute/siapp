import React, { Component } from 'react';
import {
  View,
  Animated,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from '../components/header';
import CustomButton from '../components/customButton';
import LoremIpsum from '../components/loremIpsum';
import Ball from '../components/ball';
import styles from './viewStyles/userDetail.style';

class UserDetails extends Component {
  componentWillMount() {
    this.position = new Animated.ValueXY(0, 0);
    Animated.spring(this.position, {
      toValue: { x: 0, y: 200 },
    }).start();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header headerText="User Details" />
        <LoremIpsum size={100} />
        <CustomButton onPress={this.onButtonPress} >Text</CustomButton>
        <Ball />
      </View>
    );
  }
}

const mapStateToProps = state => ({ users: state.users });

export default connect(mapStateToProps, actions)(UserDetails);
