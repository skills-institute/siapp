import React, { Component } from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
/* eslint-disable import/extensions */
import LinearGradient from 'react-native-linear-gradient';
/* eslint-enable import/extensions */
import Analytics from '@segment/analytics-react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import TeamIcons from '../components/teamIcons';
import PlayerInfo from '../components/playerInfo';
import UpdatePlayerInfo from '../components/updatePlayerInfo';
import styles from './viewStyles/playerInfoUpdate.style';

class PlayerInfoUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.playerView}>
          <LinearGradient colors={['#000000', '#131313', '#272727']} style={styles.gradientView}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <View style={{ marginTop: 20, flex: 4, alignItems: 'center', justifyContent: 'center' }}>
                <PlayerInfo editMode />
              </View>
              <View style={{ flex: 2, marginTop: 5, marginBottom: 5 }}>
                <TeamIcons />
              </View>
            </View>
          </LinearGradient>
        </View>
        <View style={{ flex: 3 }}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.infoView}>
              <UpdatePlayerInfo />
            </View>
            <KeyboardSpacer topSpacing={50} />
          </ScrollView>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({ user: state.users });

export default connect(mapStateToProps, actions)(PlayerInfoUpdate);
