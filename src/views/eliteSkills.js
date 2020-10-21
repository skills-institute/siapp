import React, {Component} from 'react';
import {View, Image} from 'react-native';
/* eslint-disable import/extensions */
import LinearGradient from 'react-native-linear-gradient';
/* eslint-enable import/extensions */
import Analytics from '@segment/analytics-react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import * as actions from '../actions';
import SimpleButton from '../components/simpleButton';
import Header from '../components/header';
import CustomText from '../components/customText';
import styles from './viewStyles/eliteSkills.style';

class EliteSkills extends Component {
  render() {
    return (
      <LinearGradient
        colors={['#000000', '#131313', '#272727']}
        style={styles.container}>
        <View style={{flex: 4, justifyContent: 'flex-end'}}>
          <Image
            resizeMode="contain"
            style={styles.imageStyle}
            source={require('../../assets/Illustration/Onboarding 01.png')}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Header headerText={'ELITE SKILLS'} />
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <CustomText>Curriculum that will progressively</CustomText>
          <CustomText>challenge your skill, speed, and fitness</CustomText>
          <CustomText>in ways that no other program can.</CustomText>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View style={{alignItems: 'center'}}>
            <SimpleButton
              onPress={() => {
                Analytics.screen('Intro Video 1');
                Actions.introVideo1();
              }}>
              Next
            </SimpleButton>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 20}}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.trackingCircleFullView} />
            <View style={styles.trackingCircleEmptyView} />
            <View style={styles.trackingCircleEmptyView} />
            <View style={styles.trackingCircleEmptyView} />
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const mapStateToProps = (state) => ({users: state.users});

export default connect(mapStateToProps, actions)(EliteSkills);
