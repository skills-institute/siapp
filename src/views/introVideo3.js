import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import VideoPlayer from 'react-native-video-controls';
import LinearGradient from 'react-native-linear-gradient';
import Analytics from '@segment/analytics-react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import * as actions from '../actions';
import SimpleButton from '../components/simpleButton';
import Header from '../components/header';
import styles from './viewStyles/introVideo3.style';

const propTypes = {
  reviewOnboarding: PropTypes.bool.isRequired,
};

const defaultProps = {};

const {width} = Dimensions.get('window');

class Video3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideVideo: false,
    };
  }

  render() {
    return (
      <LinearGradient
        colors={['#000000', '#131313', '#272727']}
        style={styles.container}>
        <View style={{flex: 2, justifyContent: 'flex-end'}}>
          <Header headerText={'Soccer Player Dashboard'} />
        </View>
        <View style={{flex: 4, justifyContent: 'center'}}>
          {this.state.hideVideo ? null : (
            <VideoPlayer
              ref={(ref) => {
                this.player = ref;
              }}
              isFullscreen={false}
              seekColor={'#FF0000'}
              paused={false}
              autoplay
              title={''}
              controlTimeout={2000}
              videoStyle={{}}
              resizeMode={'contain'} // Style appended to <Video> component
              style={{width, height: width * 0.5625}} // Style appended to <View> container
              onError={() => {}} // Fired when an error is encountered on load
              onBack={() => {}} // Function fired when back button is pressed.
              onEnd={() => {}} // Fired when the video is complete.
              source={require('../../assets/videos/Tutorial_3_Final.mp4')}
            />
          )}
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View style={{alignItems: 'center'}}>
            <SimpleButton
              onPress={() => {
                this.setState({hideVideo: true});
                if (this.props.reviewOnboarding) {
                  Analytics.screen('Pyramid');
                  Actions.landing();
                } else {
                  Analytics.screen('Terms of Service');
                  Actions.termsOfService();
                }
              }}>
              Next
            </SimpleButton>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 20}}>
          {this.props.reviewOnboarding ? (
            <View style={{flexDirection: 'row'}}>
              <View style={styles.trackingCircleEmptyView} />
              <View style={styles.trackingCircleEmptyView} />
              <View style={styles.trackingCircleFullView} />
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <View style={styles.trackingCircleEmptyView} />
              <View style={styles.trackingCircleEmptyView} />
              <View style={styles.trackingCircleFullView} />
            </View>
          )}
        </View>
      </LinearGradient>
    );
  }
}

Video3.propTypes = propTypes;
Video3.defaultProps = defaultProps;

const mapStateToProps = (state) => ({users: state.users});

export default connect(mapStateToProps, actions)(Video3);
