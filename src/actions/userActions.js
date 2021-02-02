export const logUserIn = (userInfo, userId, authToken) => {
  return {
    type: 'LOG_USER_IN',
    payload: {userInfo, userId, authToken},
  };
};

export const setPrivacyPolicy = (privacyPolicy) => {
  return {
    type: 'SET_PRIVACY_POLICY',
    payload: {privacyPolicy},
  };
};

export const thirteenOrOlder = (userOverTwelve) => {
  return {
    type: 'THIRTEEN_OR_OLDER',
    payload: {overTwelve: userOverTwelve},
  };
};

export const setTermsOfService = (termsOfService) => {
  return {
    type: 'SET_TERMS_OF_SERVICE',
    payload: {termsOfService},
  };
};

export const updatePhaseAttempts = (phaseAttempts) => {
  return {
    type: 'UPDATE_PHASE_ATTEMPTS',
    payload: {phaseAttempts},
  };
};

export const loading = (isLoading) => {
  return {
    type: 'LOADING',
    payload: {loading: isLoading},
  };
};

export const loggedIn = (isLoggedIn) => {
  return {
    type: 'LOGGED_IN',
    payload: {loggedIn: isLoggedIn},
  };
};

export const pullData = (pullData) => {
  return {
    type: 'PULL_DATA',
    payload: {pullNewData: pullData},
  };
};

export const readPyramidData = (pyramidData) => {
  return {
    type: 'READ_PYRAMID_DATA',
    payload: pyramidData,
  };
};

export const updateConfidenceRatings = (ratings) => {
  return {
    type: 'UPDATE_CONFIDENCE_RATINGS',
    payload: {confidenceRatings: ratings},
  };
};

export const readModulesAndPhases = (modulesAndPhases) => {
  return {
    type: 'READ_MODULES_AND_PHASES',
    payload: modulesAndPhases,
  };
};

export const loggingIn = (newLogInStatus) => {
  return {
    type: 'LOGGING_IN',
    payload: {loggingIn: newLogInStatus},
  };
};

export const createAccount = (user) => {
  return {
    type: 'CREATE_ACCOUNT',
    payload: {name: 'Create a New Accountr', userType: 'New'},
  };
};

export const userUpdate = ({prop, value}) => {
  return {
    type: 'USER_UPDATE',
    payload: {prop, value},
  };
};

export const modulePressed = ({prop, value}) => {
  return {
    type: 'MODULE_PRESSED',
    payload: {prop, value},
  };
};

export const showTabBar = ({prop, value}) => {
  return {
    type: 'SHOW_TAB_BAR',
    payload: {prop, value},
  };
};

export const updatePhase = ({prop, value}) => {
  return {
    type: 'UPDATE_PHASE',
    payload: prop,
  };
};

export const rateExercise = ({prop, value}) => {
  return {
    type: 'RATE_EXERCISE',
    payload: {prop, value},
  };
};

export const increaseAttempts = ({prop, value}) => {
  return {
    type: 'INCREASE_ATTEMPTS',
    payload: {prop, value},
  };
};

export const unlockModules = ({prop, value}) => {
  return {
    type: 'UNLOCK_MODULES',
    payload: {prop, value},
  };
};

export const rateAllFour = ({prop, value}) => {
  return {
    type: 'RATE_ALL_FOUR',
    payload: {prop, value},
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT',
    payload: {},
  };
};

export const newImage = ({prop, value}) => {
  return {
    type: 'NEW_IMAGE',
    payload: {prop, value},
  };
};

export const receivedPyramidData = ({prop, value}) => {
  return {
    type: 'RECEIVED_PYRAMID_DATA',
    payload: {prop, value},
  };
};
