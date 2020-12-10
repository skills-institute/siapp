import React, {Component} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import VideoPlayer from 'react-native-video-controls';
/* eslint-disable import/extensions */
import LinearGradient from 'react-native-linear-gradient';
/* eslint-enable import/extensions */
import * as actions from '../actions';
import styles from './viewStyles/videoTest.style';

class VideoTest extends Component {
  render() {
    return (
      <LinearGradient
        colors={['#000000', '#272727']}
        style={styles.linearGradient}>
        <Text style={{color: 'white', backgroundColor: 'transparent'}}>
          Stuff Here
        </Text>
        <Text style={{color: 'white', backgroundColor: 'transparent'}}>
          Stuff Here
        </Text>
        <Text style={{color: 'white', backgroundColor: 'transparent'}}>
          Stuff Here
        </Text>
        <Text style={{color: 'white', backgroundColor: 'transparent'}}>
          Stuff Here
        </Text>
        <Text style={{color: 'white', backgroundColor: 'transparent'}}>
          Stuff Here
        </Text>
        <Text style={{color: 'white', backgroundColor: 'transparent'}}>
          Stuff Here
        </Text>
        <Text style={{color: 'white', backgroundColor: 'transparent'}}>
          Stuff Here
        </Text>
        <Text style={{color: 'white', backgroundColor: 'transparent'}}>
          Stuff Here
        </Text>

        <VideoPlayer
          isFullscreen={false}
          seekColor={'#FF0000'}
          paused={false}
          title={'This is the title'}
          videoStyle={{}} // Style appended to <Video> component
          style={{}} // Style appended to <View> container
          onError={() => {}} // Fired when an error is encountered on load
          onBack={() => {}} // Function fired when back button is pressed.
          onEnd={() => {}} // Fired when the video is complete.
          source={require('../../assets/videos/SI_App_Tutorial_Video.mp4')}
          navigator={null}
        />
        <Text style={{color: 'white', backgroundColor: 'transparent'}}>
          Stuff Here
        </Text>
        <Text style={{color: 'white', backgroundColor: 'transparent'}}>
          Stuff Here
        </Text>
        <Text style={{color: 'white', backgroundColor: 'transparent'}}>
          Stuff Here
        </Text>
        <Text style={{color: 'white', backgroundColor: 'transparent'}}>
          Stuff Here
        </Text>
        <Text style={{color: 'white', backgroundColor: 'transparent'}}>
          Stuff Here
        </Text>
        <Text style={{color: 'white', backgroundColor: 'transparent'}}>
          Stuff Here
        </Text>
        <Text style={{color: 'white', backgroundColor: 'transparent'}}>
          Stuff Here
        </Text>
        <Text style={{color: 'white', backgroundColor: 'transparent'}}>
          Stuff Here
        </Text>
      </LinearGradient>
    );
  }
}

const mapStateToProps = (state) => ({users: state.users});

export default connect(mapStateToProps, actions)(VideoTest);
