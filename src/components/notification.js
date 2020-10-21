import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
} from 'react-native';

import styles from './componentStyles/notification.style';

class Notification extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageViewStyle}>
          <Image style={styles.imageStyle} source={require('../../assets/images/Shrek.jpg')} />
        </View>
        <View style={styles.textViewStyle}>
          <Text style={styles.textStyle}>Header</Text>
          <Text style={styles.textStyle}>Notification Message Here</Text>
        </View>
      </View>
    );
  }
}

export default Notification;
