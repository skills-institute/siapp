import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as actions from '../actions';
import styles from './componentStyles/teamIcon.style';

const propTypes = {
  user: PropTypes.object.isRequired,
};

const defaultProps = {};

// Map over Teams and display an item for each team the player is on.
class TeamIcons extends Component {
  render() {
    const teams = this.props.user.teams;
    if (teams.length === 0) {
      teams.push({
        id: 0,
        name: '',
      });
    }
    return (
      <View style={styles.container}>
        {teams
          ? teams.map((team) => (
              <View key={team.id} style={styles.team}>
                <View style={styles.teamIconView}>
                  {team.logo_image_url ? (
                    <Image
                      resizeMode="contain"
                      style={styles.teamImageStyle}
                      source={{uri: team.logo_image_url}}
                    />
                  ) : (
                    <Image
                      resizeMode="contain"
                      style={styles.teamImageStyle}
                      source={require('../../assets/images/Rise.png')}
                    />
                  )}
                </View>
                <Text style={styles.text}>{team.name}</Text>
              </View>
            ))
          : null}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({user: state.users});

TeamIcons.propTypes = propTypes;
TeamIcons.defaultProps = defaultProps;

export default connect(mapStateToProps, actions)(TeamIcons);
