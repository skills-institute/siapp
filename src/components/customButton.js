import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import styles from './componentStyles/customButton.style';

const propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func,
};

const defaultProps = {
  onPress: null,
};

const CustomButton = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

CustomButton.propTypes = propTypes;
CustomButton.defaultProps = defaultProps;

export default CustomButton;
