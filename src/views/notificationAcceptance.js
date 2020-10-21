import React, {Component} from 'react';
import {View, Image} from 'react-native';
/* eslint-disable import/extensions */
import LinearGradient from 'react-native-linear-gradient';
/* eslint-enable import/extensions */
import Analytics from '@segment/analytics-react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import * as actions from '../actions';
import CustomButton from '../components/customButton';
import SimpleButton from '../components/simpleButton';
import Header from '../components/header';
import CustomText from '../components/customText';
import styles from './viewStyles/notificationAcceptance.style';

class NotificationAcceptance extends Component {
  render() {
    return (
      <LinearGradient
        colors={['#000000', '#131313', '#272727']}
        style={styles.container}>
        <View style={{flex: 3, justifyContent: 'flex-end'}}>
          <Image
            resizeMode="contain"
            style={styles.imageStyle}
            source={require('../../assets/Illustration/Request Notification.png')}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Header headerText={'NOTIFICATIONS?'} />
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <CustomText>We need to be able to get a hold of you</CustomText>
          <CustomText>so we can let you know when there is</CustomText>
          <CustomText>new content!</CustomText>
        </View>
        <View style={{flex: 1, justifyContent: 'center', paddingBottom: 30}}>
          <CustomButton
            onPress={() => {
              Analytics.screen('Terms of Service');
              Actions.termsOfService();
            }}>
            ACCEPT
          </CustomButton>
          <View style={{alignSelf: 'center'}}>
            <SimpleButton
              onPress={() => {
                Analytics.screen('Terms of Service');
                Actions.termsOfService();
              }}>
              Decline
            </SimpleButton>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const mapStateToProps = (state) => ({users: state.users});

export default connect(mapStateToProps, actions)(NotificationAcceptance);
