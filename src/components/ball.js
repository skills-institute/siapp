import React, { Component } from 'react';
import { View, Animated, PanResponder } from 'react-native';
import styles from './componentStyles/ball.style';

class Ball extends Component {
  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      // onPanResponderRelease: () => { console.log('Released'); }
    });
    this.state = { panResponder, position };
  }

  componentWillMount() {
    // this.position = new Animated.ValueXY();
    // Animated.spring(this.position, {
    //   toValue: { x: 200, y: 200 }
    // }).start();
  }

  render() {
    return (
      <Animated.View style={this.state.position.getLayout()}>
        <View {...this.state.panResponder.panHandlers} style={styles.ball} />
      </Animated.View>
    );
  }
}

export default Ball;
