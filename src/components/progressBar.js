import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image} from 'react-native';
import {connect} from 'react-redux';
import styles from './componentStyles/progressBar.style';
import {iconImages} from '../themes/images';

const propTypes = {
  month: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
  border: PropTypes.bool,
};

const defaultProps = {
  border: false,
};

class ProgressBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{}}>
          <View
            style={
              this.props.border ? styles.dayWithBorder : styles.dayWithoutBorder
            }>
            <Text style={styles.textDate}>{this.props.month}</Text>
            <View style={{height: 10}} />
            <Text style={styles.textMonth}>{this.props.day}</Text>
            <View style={{height: 10}} />
            {this.props.status === 0 ? (
              <View
                style={{
                  height: 18,
                  width: 18,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={styles.imageXStyle}
                  source={iconImages[this.props.status]}
                />
              </View>
            ) : (
              <Image
                style={styles.imageStyle}
                source={iconImages[this.props.status]}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({user: state.users});

ProgressBar.propTypes = propTypes;
ProgressBar.defaultProps = defaultProps;

export default connect(mapStateToProps)(ProgressBar);
