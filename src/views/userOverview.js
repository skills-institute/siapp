import React, { Component } from 'react';
import {
  View,
  Button,
  ScrollView,
  Animated,
} from 'react-native';
import PropTypes from 'prop-types';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { connect } from 'react-redux';
import Analytics from '@segment/analytics-react-native';
import * as actions from '../actions';
import Header from '../components/header';
import LoremIpsum from '../components/loremIpsum';
import PyramidRow from '../components/pyramidRow';
import styles from './viewStyles/userOverview.style';

const propTypes = {
  users: PropTypes.object.isRequired,
  showTabBar: PropTypes.func.isRequired,
};

const defaultProps = {};

class UserOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0), // opacity 0
    };
  }
  componentWillMount() {
    this.props.showTabBar({ prop: 'showTabBar', value: true });
  }
  componentDidMount() {
    Animated.timing(       // Uses easing functions
      this.state.fadeAnim, // The value to drive
      {
        toValue: 1,        // Target
        duration: 2000,    // Configuration
      },
    ).start();             // Don't forget start!
  }
  render() {
    let xscrollView = ScrollView;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ height: 2000 }}
          ref={(scrollView) => { xscrollView = scrollView; }}
        >
          <View style={styles.container}>
            <Header headerText="User Overview" />
            <View style={{}}>
              <AnimatedCircularProgress
                size={120}
                width={5}
                fill={80}
                rotation={0}
                tintColor="#e5172f"
                backgroundColor="#3d5875"
              >
                {
                  () => (
                    <View style={styles.middleCircle}>
                      <AnimatedCircularProgress
                        size={95}
                        width={5}
                        fill={75}
                        rotation={0}
                        tintColor="#ce0e2d"
                        backgroundColor="#3d5875"
                      >
                        {
                          () => (
                            <View style={styles.innerCircle}>
                              <AnimatedCircularProgress
                                size={70}
                                width={5}
                                fill={55}
                                rotation={0}
                                tintColor="#ff8500"
                                backgroundColor="#3d5875"
                              />
                            </View>
                          )
                        }
                      </AnimatedCircularProgress>
                    </View>
                  )
                }
              </AnimatedCircularProgress>
            </View>
            <Button
              title="Scroll Me!" onPress={() => {
                Animated.timing(
                  this.state.fadeAnim,
                  {
                    toValue: 0,
                    duration: 2000,
                  },
                ).start();
                this.props.showTabBar({ prop: 'showTabBar', value: false });
                xscrollView.scrollToEnd({ animated: true });
              }}
            />
            <LoremIpsum />
            <LoremIpsum />
            <PyramidRow row={1} />
            <PyramidRow row={2} />
            <PyramidRow row={3} />
            <PyramidRow row={4} />
            <PyramidRow row={5} />
          </View>
        </ScrollView>
        <Animated.View
          style={{
            opacity: this.state.fadeAnim,
            backgroundColor: 'transparent',
          }}
        >
          {this.props.users.showTabBar ? <PyramidRow row={5} /> : null}
        </Animated.View>
      </View>
    );
  }
}

const mapStateToProps = state => ({ users: state.users });

UserOverview.propTypes = propTypes;
UserOverview.defaultProps = defaultProps;

export default connect(mapStateToProps, actions)(UserOverview);
