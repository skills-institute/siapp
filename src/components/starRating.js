import React from 'react';
import PropTypes from 'prop-types';
import {View, Image, TouchableWithoutFeedback} from 'react-native';
import styles from './componentStyles/starRating.style';

const propTypes = {
  rating: PropTypes.number,
  onPress: PropTypes.func,
  smallStars: PropTypes.bool,
};

const defaultProps = {
  rating: 0,
  onPress: null,
  smallStars: true,
};

function displayStars(rating, onPress, smallStars) {
  const starEmpty = require('../../assets/Icon/StarEmpty.png');
  const starFilled = require('../../assets/Icon/StarFilled.png');
  const starStyle = smallStars ? styles.smallImageStyle : styles.imageStyle;
  switch (rating) {
    case 0:
      return (
        <View style={styles.viewStyle}>
          <TouchableWithoutFeedback onPress={() => onPress(1)}>
            <View style={styles.starStyle}>
              <Image style={starStyle} source={starEmpty} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => onPress(2)}>
            <View style={styles.starStyle}>
              <Image style={starStyle} source={starEmpty} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => onPress(3)}>
            <View style={styles.starStyle}>
              <Image style={starStyle} source={starEmpty} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => onPress(4)}>
            <View style={styles.starStyle}>
              <Image style={starStyle} source={starEmpty} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    case 1:
      return (
        <View style={styles.viewStyle}>
          <TouchableWithoutFeedback onPress={() => onPress(1)}>
            <View style={styles.starStyle}>
              <Image style={starStyle} source={starFilled} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => onPress(2)}>
            <View style={styles.starStyle}>
              <Image style={starStyle} source={starEmpty} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => onPress(3)}>
            <View style={styles.starStyle}>
              <Image style={starStyle} source={starEmpty} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => onPress(4)}>
            <View style={styles.starStyle}>
              <Image style={starStyle} source={starEmpty} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    case 2:
      return (
        <View style={styles.viewStyle}>
          <TouchableWithoutFeedback onPress={() => onPress(1)}>
            <View style={styles.starStyle}>
              <Image style={starStyle} source={starFilled} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => onPress(2)}>
            <View style={styles.starStyle}>
              <Image style={starStyle} source={starFilled} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => onPress(3)}>
            <View style={styles.starStyle}>
              <Image style={starStyle} source={starEmpty} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => onPress(4)}>
            <View style={styles.starStyle}>
              <Image style={starStyle} source={starEmpty} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    case 3:
      return (
        <View style={styles.viewStyle}>
          <TouchableWithoutFeedback onPress={() => onPress(1)}>
            <View style={styles.starStyle}>
              <Image style={starStyle} source={starFilled} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => onPress(2)}>
            <View style={styles.starStyle}>
              <Image style={starStyle} source={starFilled} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => onPress(3)}>
            <View style={styles.starStyle}>
              <Image style={starStyle} source={starFilled} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => onPress(4)}>
            <View style={styles.starStyle}>
              <Image style={starStyle} source={starEmpty} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    case 4:
      return (
        <View style={styles.viewStyle}>
          <TouchableWithoutFeedback onPress={() => onPress(1)}>
            <View style={styles.starStyle}>
              <Image style={starStyle} source={starFilled} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => onPress(2)}>
            <View style={styles.starStyle}>
              <Image style={starStyle} source={starFilled} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => onPress(3)}>
            <View style={styles.starStyle}>
              <Image style={starStyle} source={starFilled} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => onPress(4)}>
            <View style={styles.starStyle}>
              <Image style={starStyle} source={starFilled} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    default:
      return (
        <View style={styles.viewStyle}>
          <TouchableWithoutFeedback onPress={() => onPress(1)}>
            <View style={styles.starStyle}>
              <Image style={starStyle} source={starEmpty} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => onPress(2)}>
            <View style={styles.starStyle}>
              <Image style={starStyle} source={starEmpty} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => onPress(3)}>
            <View style={styles.starStyle}>
              <Image style={starStyle} source={starEmpty} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => onPress(4)}>
            <View style={styles.starStyle}>
              <Image style={starStyle} source={starEmpty} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
  }
}

const StarRating = ({rating, onPress, smallStars}) => {
  const {viewStyle} = styles;
  return (
    <View style={viewStyle}>{displayStars(rating, onPress, smallStars)}</View>
  );
};

StarRating.propTypes = propTypes;
StarRating.defaultProps = defaultProps;

export default StarRating;
