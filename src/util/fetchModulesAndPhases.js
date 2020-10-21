
function fetchModulesAndPhases(email, authToken, userID) {
  // Fetch Modules and Phases
  // athletefit.headway.io/api/v1/users/35/unlocked_pyramid_modules
  const moduleAndPhasePath1 = 'athletefit.headway.io/api/v1/users/';
  const moduleAndPhasePath2 = '/unlocked_pyramid_modules';
  //'http://athletefit.headway.io/api/ v1/confidence_ratings';
  // const newState = { ...state };
  let modulesAndPhases = {};
  const moduleAndPhasePath = `${moduleAndPhasePath1}${userID}${moduleAndPhasePath2}`;
  // Move this fetch to external file and dispatch this action with the returned data.
  fetch(moduleAndPhasePath, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'X-User-Email': email,
      'X-User-Token': authToken,
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then((responseJSON) => {
      console.log(responseJSON);
      if (responseJSON.error) {
      } else {
        modulesAndPhases = responseJSON.data;
        return modulesAndPhases;
      }
    })
    .catch((error) => {
      return ({ error });
    });
}

export default fetchModulesAndPhases;
