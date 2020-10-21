import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import styles from './componentStyles/header.style';

const propTypes = {
  headerText: PropTypes.string,
};

const defaultProps = {
  headerText: 'Hello World',
};

const Header = (props) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
};

Header.PropTypes = {
  headerText: PropTypes.string,
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
