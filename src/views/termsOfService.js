import React, {Component} from 'react';
import {View, ScrollView, Alert, Text} from 'react-native';
import PropTypes from 'prop-types';
import {readEndpoint} from 'redux-json-api';
import LinearGradient from 'react-native-linear-gradient';
import Analytics from '@segment/analytics-react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import CustomButton from '../components/customButton';
import SimpleButton from '../components/simpleButton';
import Header from '../components/header';
import {setTermsOfService} from '../actions/userActions';
import styles from './viewStyles/termsOfService.style';
import HTML from 'react-native-render-html';

const propTypes = {
  review: PropTypes.bool,
  readEndpoint: PropTypes.func.isRequired,
  TOS: PropTypes.string,
};

const defaultProps = {
  review: false,
  TOS: null,
};

const TOSDeclined = () => {
  Alert.alert(
    'Terms of Service',
    'You must agree to the Terms of Service to use the Rise App.',
    [{text: 'OK'}],
    {cancelable: false},
  );
};

class TermsOfService extends Component {
  componentWillMount() {
    Analytics.screen('Terms of Service');
    this.props.readEndpoint('snippets/terms-of-service');
  }

  render() {
    return (
      <LinearGradient
        colors={['#000000', '#131313', '#272727']}
        style={styles.container}>
        <View style={{flex: 1, justifyContent: 'center', marginTop: 10}}>
          <Header headerText={'TERMS OF SERVICE'} />
        </View>
        <View style={{flex: 4, justifyContent: 'center'}}>
          <ScrollView style={{backgroundColor: 'transparent'}}>
            <HTML
              html={this.props.TOS}
              tagsStyles={{
                h1: {color: '#fff'},
                strong: {color: '#fff'},
                div: {color: '#fff'},
                li: {color: '#fff'},
                before: {color: '#fff'},
                'li::before': {color: '#fff'},
              }}
            />
          </ScrollView>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <CustomButton
            onPress={() => {
              if (this.props.review) {
                Analytics.screen('Pyramid');
                Actions.landing();
              } else {
                Analytics.screen('Privacy Policy');
                Actions.privacyPolicy();
              }
            }}>
            ACCEPT
          </CustomButton>
          <View style={{alignSelf: 'center', alignItems: 'center'}}>
            <SimpleButton onPress={() => TOSDeclined()}>Decline</SimpleButton>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  readEndpoint: (endpoint) => {
    dispatch(readEndpoint(endpoint))
      .then((response) => {
        dispatch(setTermsOfService(response.data.attributes.content));
      })
      .catch(() => {
        Alert.alert('Error', 'Unable to Read Snippets Data.', [{text: 'OK'}], {
          cancelable: false,
        });
      });
  },
});

TermsOfService.propTypes = propTypes;
TermsOfService.defaultProps = defaultProps;

const mapStateToProps = (state) => ({TOS: state.users.termsOfService});

export default connect(mapStateToProps, mapDispatchToProps)(TermsOfService);
