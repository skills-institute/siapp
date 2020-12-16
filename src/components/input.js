import React from 'react';
import PropTypes from 'prop-types';
import {TextInput, View, Text} from 'react-native';
import styles from './componentStyles/input.style';

const propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  keyboardType: PropTypes.string,
  onEndEditing: PropTypes.func,
  returnKeyType: PropTypes.string,
  blurOnSubmit: PropTypes.bool,
};

const defaultProps = {
  placeholder: ' ',
  value: null,
  secureTextEntry: false,
  keyboardType: 'default',
  onEndEditing: null,
  returnKeyType: 'default',
  blurOnSubmit: true,
};

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  onEndEditing,
  returnKeyType,
  blurOnSubmit,
  onSubmitEditing,
}) => {
  const {inputStyle, labelStyle, containerStyle} = styles;
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        onEndEditing={onEndEditing}
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'words'}
        keyboardType={keyboardType}
        underlineColorAndroid="transparent"
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        secureTextEntry={secureTextEntry}
        selectionColor="#ce0e2d"
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#94989E"
        blurOnSubmit={blurOnSubmit}
        returnKeyType={returnKeyType || 'default'}
        onSubmitEditing={onSubmitEditing}
      />
      <View style={styles.dividerView} />
    </View>
  );
};

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export {Input}; // TODO: Refactor to default export and change in any files that import this.
