

// Uncomment the respective url for staging or prod
// Localhost
// const url = 'http://localhost:3000';

// Staging
// const url = 'https://staging.risefutbol.com';

// Prod
const url = 'https://skills-institute-dev.herokuapp.com';

// const url = 'http://94.130.150.70:9292';

export const moduleAndPhasePath = 'unlocked_pyramid_modules';
export const pyramidReadPath = 'pyramid_modules?include=phases,phases.workouts&sort=position&page[size]=20';
export const endpointHost = url;
export const endpointPath = '/api/v1';
export const createUserPath = `${url}/api/v1/users`;
export const logInPath = `${url}/api/v1/sign_in`;
export const resetPasswordPath = `${url}/users/password`;
export const userPackages = `${url}/api/v1/show_user_payments`;
export const getRatingOfExercisePath = `${url}/api/v1/confidence_ratings?filter[exercise_id]=`;
