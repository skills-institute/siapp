import React, {Component} from 'react';
import {Scene, Router} from 'react-native-router-flux';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CreateAccount from '../../views/createAccount';
import CreatePassword from '../../views/createPassword';
import EnterCode from '../../views/enterCode';
import Home from '../../views/home';
import Landing from '../../views/landing';
import Onboarding from '../../views/onboarding';
import WelcomeTo from '../../views/welcomeTo';
import WelcomeBack from '../../views/welcomeBack';
import UserDetails from '../../views/userDetails';
import UserOverview from '../../views/userOverview';
import trainingPyramid from '../../views/trainingPyramid';
import ModuleIntro from '../../views/moduleIntro';
import PhaseOverview from '../../views/phaseOverview';
import Workout from '../../views/workout';
import CompletePhaseFourStars from '../../views/completePhaseFourStars';
import CompletePhaseNotFourStars from '../../views/completePhaseNotFourStars';
import CompleteWorkout from '../../views/completeWorkout';
import EliteSkills from '../../views/eliteSkills';
import NotificationAcceptance from '../../views/notificationAcceptance';
import Notifications from '../../views/notifications';
import TermsOfService from '../../views/termsOfService';
import PrivacyPolicy from '../../views/privacyPolicy';
import PlayerInfoUpdate from '../../views/playerInfoUpdate';
import VideoTest from '../../views/videoTest';
import SupplementalOverview from '../../views/supplementalOverview';
import BlankInitialScreen from '../../views/blankInitialScreen';
import IntroVideo1 from '../../views/introVideo1';
import AgeVerification from '../../views/ageVerification';
import AgeVerificationFailed from '../../views/ageVerificationFailed';

const styles = StyleSheet.create({
  defaultBG: {
    backgroundColor: 'black',
  },
});

class NavigationRouter extends Component {
  render() {
    return (
      <LinearGradient
        colors={['#000000', '#131313', '#272727']}
        style={{flex: 1, backgroundColor: '#F5FCFF'}}>
        <View
          style={{flex: 1, backgroundColor: 'transparent', paddingBottom: 20}}>
          <Router type={'replace'} getSceneStyle={() => styles.defaultBG}>
            <Scene
              key="root"
              sceneStyle={{backgroundColor: 'black'}}
              leftButtonIconStyle={{tintColor: '#FFFFFF'}}
              navigationBarStyle={{
                borderBottomColor: 'transparent',
                borderBottomWidth: 65,
                backgroundColor: '#000000',
              }}
              titleStyle={{
                fontWeight: 'bold',
                fontSize: 16,
                fontFamily: 'Montserrat-Regular',
                color: '#ce0e2d',
                width: '100%',
              }}>
              <Scene
                key="blankInitialScreen"
                sceneStyle={{backgroundColor: 'black'}}
                hideNavBar
                component={BlankInitialScreen}
                title=""
              />
              <Scene
                key="home"
                type="reset"
                initial
                sceneStyle={{backgroundColor: 'black'}}
                hideNavBar
                component={Home}
                title=""
              />
              <Scene
                key="createAccount"
                sceneStyle={{backgroundColor: 'black'}}
                hideNavBar={false}
                component={CreateAccount}
                title="CREATE ACCOUNT"
              />
              <Scene
                key="ageVerification"
                sceneStyle={{backgroundColor: 'black'}}
                hideNavBar={false}
                component={AgeVerification}
                title="DATE OF BIRTH"
              />
              <Scene
                key="ageVerificationFailed"
                sceneStyle={{backgroundColor: 'black'}}
                hideNavBar
                component={AgeVerificationFailed}
                title="MUST BE OVER 13"
              />
              <Scene
                key="createPassword"
                sceneStyle={{backgroundColor: 'black'}}
                hideNavBar={false}
                component={CreatePassword}
                title="CREATE PASSWORD"
              />
              <Scene
                key="enterCode"
                sceneStyle={{backgroundColor: 'black'}}
                renderBackButton={() => null}
                hideNavBar={false}
                component={EnterCode}
                title="ENTER PROMO CODE"
              />
              <Scene
                key="welcomeTo"
                sceneStyle={{backgroundColor: 'black'}}
                renderBackButton={() => null}
                hideNavBar={false}
                component={WelcomeTo}
                title="WELCOME TO SKILLS INSTITUTE"
              />
              <Scene
                key="welcomeBack"
                sceneStyle={{backgroundColor: 'black'}}
                hideNavBar={false}
                component={WelcomeBack}
                title="WELCOME BACK"
              />
              <Scene
                key="moduleIntro"
                sceneStyle={{backgroundColor: 'black'}}
                hideNavBar
                component={ModuleIntro}
                title=""
              />
              <Scene
                key="landing"
                sceneStyle={{backgroundColor: 'black'}}
                hideNavBar
                // type="reset"
                component={Landing}
                title=""
              />
              <Scene
                key="phaseOverview"
                sceneStyle={{backgroundColor: 'black'}}
                hideNavBar={false}
                component={PhaseOverview}
                title="MODULE NAME"
              />
              <Scene
                key="workout"
                sceneStyle={{backgroundColor: 'black'}}
                hideNavBar
                component={Workout}
                title="Exercise 7 of 9"
              />
              <Scene
                key="completePhaseFourStars"
                sceneStyle={{backgroundColor: 'black'}}
                hideNavBar
                component={CompletePhaseFourStars}
                title="Phase Complete"
              />
              <Scene
                key="completePhaseNotFourStars"
                sceneStyle={{backgroundColor: 'black'}}
                hideNavBar
                component={CompletePhaseNotFourStars}
                title="Phase Complete Not 4 Stars"
              />
              <Scene
                key="completeWorkout"
                sceneStyle={{backgroundColor: 'black'}}
                hideNavBar
                component={CompleteWorkout}
                title="Workout Complete"
              />
              <Scene
                key="introVideo1"
                sceneStyle={{backgroundColor: 'black'}}
                hideNavBar
                component={IntroVideo1}
                title=""
              />
              <Scene
                key="eliteSkills"
                sceneStyle={{backgroundColor: 'black'}}
                hideNavBar
                component={EliteSkills}
                title=""
              />
              <Scene
                key="notificationAcceptance"
                sceneStyle={{backgroundColor: 'black'}}
                hideNavBar
                component={NotificationAcceptance}
                title=""
              />
              <Scene
                key="notifications"
                sceneStyle={{backgroundColor: 'black'}}
                hideNavBar={false}
                component={Notifications}
                title="NOTIFICATIONS"
              />
              <Scene
                key="termsOfService"
                sceneStyle={{backgroundColor: 'black'}}
                hideNavBar
                component={TermsOfService}
                title=""
              />
              <Scene
                key="privacyPolicy"
                sceneStyle={{backgroundColor: 'black'}}
                hideNavBar
                component={PrivacyPolicy}
                title=""
              />
              <Scene
                key="playerInfoUpdate"
                sceneStyle={{backgroundColor: 'black'}}
                hideNavBar
                component={PlayerInfoUpdate}
                title=""
              />
              <Scene
                key="videoTest"
                sceneStyle={{backgroundColor: 'black'}}
                hideNavBar={false}
                component={VideoTest}
                title="Video Test Screen"
              />
              <Scene
                key="supplementalOverview"
                sceneStyle={{backgroundColor: 'black'}}
                hideNavBar={false}
                component={SupplementalOverview}
                title="Supplemental"
              />
              <Scene
                key="onboarding"
                sceneStyle={{backgroundColor: 'black'}}
                hideNavBar={false}
                component={Onboarding}
                title="Onboarding"
              />
              <Scene
                key="userDetails"
                sceneStyle={{backgroundColor: 'black'}}
                hideNavBar={false}
                component={UserDetails}
                title="User Details"
              />
              <Scene
                key="userOverview"
                sceneStyle={{backgroundColor: 'black'}}
                hideNavBar={false}
                component={UserOverview}
                title="User Overview"
              />
              <Scene
                key="trainingPyramid"
                sceneStyle={{backgroundColor: 'black'}}
                hideNavBar={false}
                component={trainingPyramid}
                title="Training Pyramid"
              />
            </Scene>
          </Router>
        </View>
      </LinearGradient>
    );
  }
}

export default NavigationRouter;
