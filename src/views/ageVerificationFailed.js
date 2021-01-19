import React, {Component} from 'react';
import {View, Text, Image, Linking} from 'react-native';
import PropTypes from 'prop-types';
/* eslint-disable import/extensions */
import LinearGradient from 'react-native-linear-gradient';
/* eslint-enable import/extensions */
import {connect} from 'react-redux';
import Analytics from '@segment/analytics-react-native';
import {thirteenOrOlder} from '../actions/userActions';
import CustomButton from '../components/customButton';
import styles from './viewStyles/ageVerificationFailed.style';

const propTypes = {
  thirteenOrOlder: PropTypes.func.isRequired,
};

const defaultProps = {};

class AgeVerificationFailed extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.thirteenOrOlder(false);
  }

  render() {
    return (
      <LinearGradient
        colors={['#000000', '#131313', '#272727']}
        style={styles.container}>
        <View style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}>
          <Image
            resizeMode="contain"
            style={styles.imageStyle}
            source={require('../../assets/Illustration/Request Notification.png')}
          />
        </View>
        <View style={{flex: 1}}>
          <Text
            style={[
              styles.headerTextStyle,
              {fontSize: 20, textAlign: 'center'},
            ]}>
            We limit access to this training app to athletes 13 years of age and
            older.
          </Text>
          <View style={{height: 30}} />
          <Text style={[styles.textStyle, {color: '#6F7276'}]}>
            We believe that parents should be actively involved in their child’s
            training schedule and ask for parental consent for anyone under the
            age of 13. To request access, please have your parents e-mail us at
          </Text>
          <View style={{height: 30}} />
          <CustomButton
            onPress={() => {
              Linking.openURL(
                'mailto:appsupport@lilkickers.com?subject=Parental Consent&body=body',
              );
            }}>
            {' '}
            appsupport@lilkickers.com{' '}
          </CustomButton>
        </View>
      </LinearGradient>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,

  thirteenOrOlder: (overTwelve) => {
    dispatch(thirteenOrOlder(overTwelve));
  },
});

const mapStateToProps = (state) => ({user: state.users});

AgeVerificationFailed.propTypes = propTypes;
AgeVerificationFailed.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AgeVerificationFailed);
