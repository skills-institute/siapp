import { setHeader, readEndpoint } from 'redux-json-api';

function readConfidenceRatings(email, authToken, dispatchUpdate) {
  // Fetch Users Exercises
  const getExerciseRatingsPath = 'http://athletefit.headway.io/api/v1/confidence_ratings';
  // const newState = { ...state };
  let exerciseRatings = [];

  // Move this fetch to external file and dispatch this action with the returned data.
  // fetch(getExerciseRatingsPath, {
  //   method: 'GET',
  //   headers: {
  //     Accept: 'application/json',
  //     'X-User-Email': email,
  //     'X-User-Token': authToken,
  //     'Content-Type': 'application/json',
  //   },
  // })
  //   .then(response => response.json())
  //   .then((responseJSON) => {
  //     if (responseJSON.error) {
  //       console.log('Error Reading exercise confidence rating!');
  //     } else {
  //       // console.log('Exercise Ratings after response: ', responseJSON.data);
  //       exerciseRatings = responseJSON.data;
  //       dispatchUpdate(exerciseRatings);
  //       return exerciseRatings;
  //     }
  //   })
  //   .catch((error) => {
  //     console.log('Fetch ERROR reading confidence ratinhgs:');
  //     console.log(error);
  //     return ({ error });
  //   });


}

export default readConfidenceRatings;
