import React, {Component} from 'react';
import {View, Image, Text, NetInfo} from 'react-native';
import Analytics from '@segment/analytics-react-native';
import styles from './viewStyles/noInternet.style';

class NoInternet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: true,
    };
  }
  componentWillMount() {
    NetInfo.isConnected.addEventListener('change', (isConnected) =>
      this.setState({connected: isConnected}),
    );
  }

  render() {
    if (!this.state.connected) {
      return (
        <View style={styles.container}>
          <Image />
          <View style={styles.alertView}>
            <Image
              resizeMode="contain"
              style={styles.imageStyle}
              source={require('../../assets/Illustration/Request Notification.png')}
            />
            <Text style={styles.textStyle}>Please Connect to the Internet</Text>
          </View>
        </View>
      );
    }
    return null;
  }
}

export default NoInternet;
