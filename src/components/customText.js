import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import styles from './componentStyles/customText.style';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const defaultProps = {};

const CustomText = ({ style = {}, txtStyle = {}, children }) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={[viewStyle, style]}>
      <Text style={[textStyle, txtStyle]}>{children}</Text>
    </View>
  );
};

CustomText.propTypes = propTypes;
CustomText.defaultProps = defaultProps;

export default CustomText;
