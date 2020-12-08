import {REHYDRATE} from 'redux-persist/constants';
import update from 'immutability-helper';
import defaultState from './defaultState';

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'LOG_USER_IN': {
      return {...state, loggedIn: true};
    }
    // Store any data user could modify in state.userModifiedData.
    // Use this to re-populate our main user state
    // Be sure to save all types and id's from API call in store.
    // look up confidence ratings and any other user data by ID
    case 'API_READ': {
      return {...state};
    }

    case 'USER_UPDATE': {
      const modifiedData = {email: 'testing', password: 'testpassword'};
      return {
        ...state,
        [action.payload.prop]: action.payload.value,
        userModifiedData: modifiedData,
      };
    }

    case 'MODULE_PRESSED':
      return {...state};

    case 'INCREASE_ATTEMPTS': {
      const {module, selectedPhase} = action.payload.prop;
      const workingModule = Object.create(module);
      const currentAttempts = module.phases[selectedPhase - 1].attempts;
      workingModule.phases[selectedPhase - 1].attempts = currentAttempts + 1;
      return update(state, {
        module: workingModule,
      });
    }

    case 'RATE_EXERCISE': {
      const {
        module,
        selectedPhase,
        workout,
        exercise,
        rating,
      } = action.payload.prop;
      const workingModule = Object.create(module);
      workingModule.phases[selectedPhase - 1].workouts[workout].exercises[
        exercise
      ].confidenceRating = rating;
      return {
        ...state,
        module: workingModule,
      };
    }

    case 'UNLOCK_MODULES': {
      const {module} = action.payload.prop;
      const newState = JSON.parse(JSON.stringify(state));
      if (module.leftModule !== 0) {
        newState[`module${module.leftModule}`].locked = false;
      }
      if (module.rightModule !== 0) {
        newState[`module${module.rightModule}`].locked = false;
      }
      let moduleNumber = 6;
      while (moduleNumber < 16) {
        const childModuleLeft =
          newState[`module${moduleNumber}`].childModules[0];
        const childModuleRight =
          newState[`module${moduleNumber}`].childModules[1];
        let leftChildRating = 0;
        let rightChildRating = 0;
        let totalExercises = 0;
        let totalRating = 0;
        newState[`module${childModuleLeft}`]?.phases.forEach((phase) => {
          phase.workouts.forEach((workout) => {
            workout.exercises.forEach((exercise) => {
              totalExercises += 1;
              totalRating += exercise.confidenceRating;
            });
          });
        });
        leftChildRating = (totalRating / totalExercises).toFixed(1);
        totalRating = 0;
        totalExercises = 0;
        newState[`module${childModuleRight}`]?.phases.forEach((phase) => {
          phase.workouts.forEach((workout) => {
            workout.exercises.forEach((exercise) => {
              totalExercises += 1;
              totalRating += exercise.confidenceRating;
            });
          });
        });
        rightChildRating = (totalRating / totalExercises).toFixed(1);
        if (leftChildRating >= 4 && rightChildRating >= 4) {
          newState[`module${moduleNumber}`].locked = false;
        }
        moduleNumber += 1;
      }
      return newState;
    }

    case 'UPDATE_PHASE': {
      const moduleName = `module${action.payload.module}`;
      const currentPhase = action.payload.currentPhase;
      const phase = currentPhase <= 2 ? currentPhase + 1 : 3;
      return {
        ...state,
        [moduleName]: {...state[moduleName], currentPhase: phase},
      };
    }

    case 'NEW_IMAGE': {
      return {...state, playerImage: action.payload.value};
    }

    case 'RATE_ALL_FOUR': {
      const newState = JSON.parse(JSON.stringify(state));
      const moduleName = `module${action.payload.prop.module.module}`;
      let workoutCounter = 0;
      let exerciseCounter = 0;
      newState[moduleName].phases[
        action.payload.prop.selectedPhase - 1
      ].workouts.forEach((workout) => {
        exerciseCounter = 0;
        workout.exercises.forEach(() => {
          newState[moduleName].phases[
            action.payload.prop.selectedPhase - 1
          ].workouts[workoutCounter].exercises[
            exerciseCounter
          ].confidenceRating = 4;
          exerciseCounter += 1;
        });
        workoutCounter += 1;
      });
      newState[moduleName].currentPhase =
        newState[moduleName].currentPhase < 3
          ? (newState[moduleName].currentPhase += 1)
          : newState[moduleName].currentPhase;
      return {
        ...state,
        [moduleName]: newState[moduleName],
      };
    }

    case 'SHOW_TAB_BAR':
      return {...state, [action.payload.prop]: action.payload.value};

    case REHYDRATE:
      return action.payload.users || defaultState;

    default:
      return state;
  }
};
