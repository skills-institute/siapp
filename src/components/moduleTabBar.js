import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import styles from './componentStyles/moduleTabBar.style';

const propTypes = {
  headerText: PropTypes.string,
};

const defaultProps = {
  headerText: '',
};

const moduleTabBar = (props) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
};

moduleTabBar.propTypes = propTypes;
moduleTabBar.defaultProps = defaultProps;

export default moduleTabBar;
