import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import styles from './componentStyles/simpleButton.style';

const propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.node,
};

const defaultProps = {
  children: 'Press Me!',
};


const SimpleButton = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

SimpleButton.propTypes = propTypes;
SimpleButton.defaultProps = defaultProps;

export default SimpleButton;
