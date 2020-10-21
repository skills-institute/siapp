import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Linking,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
/* eslint-disable import/extensions */
import LinearGradient from 'react-native-linear-gradient';
/* eslint-enable import/extensions */
import Analytics from '@segment/analytics-react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import * as actions from '../actions';
import CustomButton from '../components/customButton';
import CustomText from '../components/customText';
import styles from './viewStyles/welcomeTo.style';

const propTypes = {
  teamName: PropTypes.string,
  teamLogoURL: PropTypes.string,
  clubWelcomeText: PropTypes.string,
};

const defaultProps = {
  teamName: null,
  teamLogoURL: null,
  clubWelcomeText: null,
};

class WelcomeTo extends Component {
  render() {
    const {teamName, teamLogoURL, clubWelcomeText} = this.props;
    return (
      <LinearGradient
        colors={['#000000', '#131313', '#272727']}
        style={styles.container}>
        <View style={{alignItems: 'center', flex: 1}}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              height: 90,
              width: 90,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 15,
            }}>
            {teamLogoURL ? (
              <Image
                resizeMode="contain"
                style={{height: 80, width: 80, borderRadius: 15}}
                source={{uri: teamLogoURL}}
              />
            ) : (
              <Image
                resizeMode="contain"
                style={{height: 80, width: 80, borderRadius: 15}}
                source={require('../../assets/images/Rise.png')}
              />
            )}
          </View>
          <View style={styles.spacerStyle} />
          <View style={styles.textView}>
            {/* <Text style={styles.clubTextStyle}>{teamName || 'Rise!'}</Text> */}

            {clubWelcomeText ? (
              <View>
                <CustomText>{clubWelcomeText}</CustomText>
              </View>
            ) : (
              <View style={{}}>
                <View style={{alignItems: 'center'}}>
                  <CustomText>Skills Institute is where soccer takes center stage.</CustomText>
                  <CustomText>Rooted in child development theory, kids have a blast</CustomText>
                  <CustomText>Players will walk away more confident, equipped for</CustomText>
                  <CustomText>their next right step, and ready for life’s challenges on</CustomText>
                  <CustomText>and off the field.</CustomText>
                </View>
                <View style={{height: 10}} />
                <View style={{alignItems: 'center'}}>
                  <CustomText>This application guides individual players with training plans</CustomText>
                  <CustomText>
                    and videos to grow your skills and achieve the three
                  </CustomText>
                  <CustomText>
                    pillars of Skill Institute:
                  </CustomText>
                </View>
                <View style={{height: 10}} />
                <View style={{alignItems: 'center'}}>
                  <CustomText txtStyle={{fontWeight: 'bold'}}>
                    Educate
                  </CustomText>
                  <CustomText txtStyle={{fontWeight: 'bold'}}>
                    Develope
                  </CustomText>
                  <CustomText txtStyle={{fontWeight: 'bold'}}>
                    Inspire
                  </CustomText>
                </View>
              </View>
            )}
          </View>
        </View>
        <View style={{paddingBottom: 25}}>
          <CustomButton
            onPress={() => {
              Analytics.screen('Intro Video 1');
              Actions.introVideo1();
            }}>
            GET STARTED
          </CustomButton>
        </View>
      </LinearGradient>
    );
  }
}

WelcomeTo.propTypes = propTypes;
WelcomeTo.defaultProps = defaultProps;

const mapStateToProps = (state) => ({user: state.users});

export default connect(mapStateToProps, actions)(WelcomeTo);
