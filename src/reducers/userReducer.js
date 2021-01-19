import {REHYDRATE} from 'redux-persist';
import update from 'immutability-helper';
import _ from 'lodash';
import Moment from 'moment';
// import defaultState from './defaultState';
import {funcDefaultState} from './defaultState';

export default (state = funcDefaultState, action) => {
  switch (action.type) {
    case 'LOADING': {
      return {...state, loading: action.payload.loading};
    }

    case 'UPDATE_PHASE_ATTEMPTS': {
      const phaseAttempts = action.payload.phaseAttempts.data.map(
        (phaseAttempt) => {
          return {
            phaseAttemptId: parseInt(phaseAttempt.id, 10),
            phaseId: parseInt(phaseAttempt.attributes.phase_id, 10),
            count: parseInt(phaseAttempt.attributes.count, 10),
            userID: parseInt(phaseAttempt.attributes.user_id, 10),
          };
        },
      );
      return {...state, phaseAttempts};
    }

    case 'SET_TERMS_OF_SERVICE': {
      return {...state, termsOfService: action.payload.termsOfService};
    }
    case 'SET_PRIVACY_POLICY': {
      return {...state, privacyPolicy: action.payload.privacyPolicy};
    }

    case 'THIRTEEN_OR_OLDER': {
      return {...state, thirteenOrOlder: action.payload.overTwelve};
    }
    case 'LOGGED_IN': {
      return {...state, loggedIn: action.payload.loggedIn};
    }

    case 'LOGGING_IN': {
      return {...state, loggingIn: action.payload.loggingIn};
    }

    case 'READ_MODULES_AND_PHASES': {
      let unlocked = [];
      action.payload.data.map((moduleAndPhaseData) => {
        let newData = moduleAndPhaseData;
        newData.attributes.pyramid_module_id = parseInt(
          moduleAndPhaseData.attributes.pyramid_module_id,
          10,
        );
        newData.attributes.days_since_last_confidence_rating = parseInt(
          moduleAndPhaseData.attributes.days_since_last_confidence_rating,
          10,
        )
          ? parseInt(
              moduleAndPhaseData.attributes.days_since_last_confidence_rating,
              10,
            )
          : 0;
        newData.attributes.percentComplete =
          moduleAndPhaseData.attributes.percent_complete;
        unlocked.push(newData.attributes);
      });
      return {...state, unlockedModulesAndPhases: unlocked};
    }

    case 'UPDATE_CONFIDENCE_RATINGS': {
      let exerciseRatingIncludes = [];
      action.payload.confidenceRatings.map((confidenceRating) => {
        exerciseRatingIncludes.push(confidenceRating.attributes);
        return 0;
      });
      return {...state, confidenceRatings: exerciseRatingIncludes};
    }

    case 'LOG_USER_IN': {
      if (!action.payload.userInfo) {
        return {
          ...state,
          authToken: action.payload.authToken,
          id: action.payload.userId,
        };
      }
      const accountCreatedAt = action.payload.userInfo.created_at;
      const currentMoment = new Moment();
      const createdAtDate = new Date(accountCreatedAt);
      const createdAtMoment = new Moment(createdAtDate);
      const accountAge = Moment.duration(
        currentMoment - createdAtMoment,
      ).days();
      const monthNames = [
        'ERR',
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEP',
        'OCT',
        'NOV',
        'DEC',
      ];
      const weekView = action.payload.userInfo.week_view;
      const progressView = weekView.map((dayView, index) => {
        const date = Object.keys(dayView)[0].split('-');
        const value = dayView[Object.keys(dayView)[0]];
        const formattedDay = {
          month: monthNames[parseInt(date[1], 10)],
          day: date[2],
          pyramidId: value ? value : 0,
          status: 0,
          key: index,
        };
        return formattedDay;
      });

      const phaseAttempts = action.payload.userInfo.phase_attempts.map(
        (phaseAttempt) => {
          return {
            phaseAttemptId: parseInt(phaseAttempt.id, 10),
            phaseId: parseInt(phaseAttempt.phase_id, 10),
            count: parseInt(phaseAttempt.count, 10),
            userID: parseInt(phaseAttempt.user_id, 10),
          };
        },
      );
      return {
        ...state,
        progressView,
        phaseAttempts,
        newCode: '',
        activeSubscription: action.payload.userInfo.active_subscription,
        subscriptionExpires: action.payload.userInfo.subscription_expires_on,
        teams: action.payload.userInfo.teams,
        playerImage: action.payload.userInfo.avatar.url,
        dayStreak: action.payload.userInfo.day_streak,
        skillsMastered: action.payload.userInfo.skills_mastered,
        id: action.payload.userId,
        authToken: action.payload.authToken,
        nickName: action.payload.userInfo.nickname
          ? action.payload.userInfo.nickname
          : '',
        firstName: action.payload.userInfo.first_name,
        lastName: action.payload.userInfo.last_name,
        fullName: action.payload.userInfo.full_name,
        activeTrial: accountAge < 15,
        loggedIn: true,
        purchasedPackages: action.payload.userInfo.archieved_user_payments,
        promoCode: action.payload.userInfo.my_promo_codes,
        createdAt: action.payload.userInfo.created_at,
        stripeCustomer: action.payload.userInfo.stripe_customer_id?.to_s,
        stripePlan: action.payload.userInfo.my_stripe_plans,
        stripePlanPrices: action.payload.userInfo.my_stripe_plan_prices,
        price: action.payload.userInfo.my_stripe_plan_prices,
        discountCode: action.payload.userInfo.my_stripe_plan_discount_codes,
        subscription: action.payload.userInfo.subscription,
        roleList: action.payload.userInfo.role_list,
        highestPyramidLevel:
          action.payload.userInfo.highest_pyramid_level_achieved,
        lastModulePlayed: action.payload.userInfo.last_module_played,
        lastPhasePlayed: action.payload.userInfo.last_phase_played,
      };
    }

    case 'READ_PYRAMID_DATA': {
      const pyramidModules = action.payload.data;
      const includedData = action.payload.included;
      const phaseIncludes = [];
      const workoutIncludes = [];
      const exerciseIncludes = [];
      let exerciseRatingIncludes = [];
      const newState = {...state};
      const isOnFreePackage = state.purchasedPackages
        ? state.purchasedPackages.findIndex(
            (p) => p.string_id === '10-day-development-guide',
          ) > -1
        : false;
      let moduleIds = [];
      let userData = {};

      includedData.map((included, index) => {
        if (included.type === 'phases') {
          phaseIncludes.push(included);
        }
        if (included.type === 'workouts') {
          workoutIncludes.push(included);
        }
        return 0;
      });
      workoutIncludes.map((workout) => {
        workout.attributes.exercises.map((exercise) => {
          exerciseIncludes.push(exercise);
          return 0;
        });
        return 0;
      });
      // if (!loggedIn) {
      newState.loggedIn = true;
      // newState.playerImage = require('../../assets/images/morgan_davis.png');
      newState.code = '';
      newState.showTabBar = true;
      newState.club = '';
      newState.team = '';
      newState.coach = '';
      newState.dayStreak = newState.dayStreak || 0;
      // newState.skillsMastered = newState.skillsMastered || 0;
      pyramidModules.map((module, moduleIndex) => {
        const children = [];
        module.attributes.prereq.map((child) => {
          const childPyramidNumber = _.find(pyramidModules, {id: child})
            .attributes.position;
          children.push(childPyramidNumber);
          return 0;
        });
        const pyramidPosition = module.attributes.position;
        const pulledModule = module.attributes;
        const moduleToUpdate = newState[`module${pyramidPosition}`];
        const modulePhaseIds = module.relationships.phases.data;
        moduleToUpdate.type = module.type;
        moduleToUpdate.id = module.id;
        moduleToUpdate.moduleName = pulledModule.name;
        // const foundModuleInUnlocked = _.findLast(state.unlockedModulesAndPhases, { pyramid_module_id: parseInt(module.id, 10) });
        const foundModuleInUnlocked = state.unlockedModulesAndPhases.find(
          (m) => m.pyramid_module_id === parseInt(module.id, 10),
        );

        let maxPhase = 0;
        if (foundModuleInUnlocked) {
          const phaseArrayAsStrings = foundModuleInUnlocked.completed_phases;
          if (phaseArrayAsStrings.length > 0) {
            const phaseArrayAsInts = phaseArrayAsStrings.map((string) =>
              parseInt(string, 10),
            );
            maxPhase = Math.max(...phaseArrayAsInts);
          } else {
            maxPhase = 1;
          }
          moduleToUpdate.dayStreak =
            foundModuleInUnlocked.days_since_last_confidence_rating;
          moduleToUpdate.percentComplete =
            foundModuleInUnlocked.percentComplete;
        } else {
          maxPhase = 1;
          moduleToUpdate.dayStreak = 0;
        }

        moduleToUpdate.currentPhase = maxPhase;

        moduleToUpdate.locked = foundModuleInUnlocked ? false : true;
        // if (isOnFreePackage && (foundModuleInUnlocked && foundModuleInUnlocked.has_restriction)) {
        //   moduleToUpdate.locked = false;
        // } else if (!isOnFreePackage && (foundModuleInUnlocked && !foundModuleInUnlocked.has_restriction)) {
        //   moduleToUpdate.locked = false;
        // } else if (foundModuleInUnlocked) {
        //   moduleToUpdate.locked = false;
        // }

        // moduleToUpdate.locked = foundModuleInUnlocked ? false : true;
        // if (moduleIndex === 2) {
        //   moduleToUpdate.locked = false;
        // }

        moduleToUpdate.childModules = children;
        moduleToUpdate.dayStreak = moduleToUpdate.dayStreak || 0;
        moduleToUpdate.description = pulledModule.description;
        moduleToUpdate.icon = pulledModule.icon ? pulledModule.icon.url : null;
        moduleToUpdate.displayTrack = pulledModule.display_track;
        moduleToUpdate.keyFrame = pulledModule.keyframe;
        moduleToUpdate.keyFrameMedium = pulledModule.keyframe_medium;
        moduleToUpdate.keyFrameThumb = pulledModule.keyframe_thumb;
        moduleToUpdate.video = pulledModule.video;
        moduleToUpdate.moduleTrack = pulledModule.display_track;
        moduleToUpdate.phases = [];
        moduleToUpdate.supplementalPhases = [];
        moduleIds.push({
          id: parseInt(module.id),
          moduleNumber: moduleIndex + 1,
        });
        newState.moduleIds = moduleIds;
        modulePhaseIds.map((phase, phaseIndex) => {
          const foundPhase = _.find(phaseIncludes, modulePhaseIds[phaseIndex]);
          const workoutsInPhaseIds = foundPhase.relationships.workouts.data;
          let workoutsToAdd = [];
          workoutsInPhaseIds.map((workout, workoutIndex) => {
            const foundWorkout = _.find(workoutIncludes, {id: workout.id});
            const exercisesToAdd = [];
            foundWorkout.attributes.exercises.map((exercise) => {
              const foundExerciseRating = _.find(state.confidenceRatings, {
                exercise_id: exercise.id,
                workout_id: parseInt(workout.id),
              });
              const newExercise = {
                type: exercise.type,
                id: exercise.id,
                confidenceRating: foundExerciseRating
                  ? foundExerciseRating.rating
                  : 0,
                exerciseName: exercise.name,
                keyframe: exercise.keyframe,
                keyframeMedium: exercise.keyframe_medium,
                keyframeThumb: exercise.keyframe_thumb,
                exerciseDescription: exercise.description,
                exerciseSetText: exercise.sets,
                exerciseRepText: exercise.reps,
                exerciseRestText: exercise.rest,
                video: exercise.video,
              };
              exercisesToAdd.push(newExercise);
              return 0;
            });
            const newworkout = {
              type: workout.type,
              id: workout.id,
              workoutName: foundWorkout.attributes.name,
              exercises: exercisesToAdd,
            };
            workoutsToAdd.push(newworkout);
            return 0;
          });
          const foundPhaseAttempt = _.find(state.phaseAttempts, {
            phaseId: parseInt(foundPhase.id),
          });
          let numberOfAttempts = 0;
          if (foundPhaseAttempt) {
            numberOfAttempts = foundPhaseAttempt.count;
          }
          const newPhase = {
            type: foundPhase.type,
            id: foundPhase.id,
            attempts: numberOfAttempts,
            phaseRating: 0,
            phase: phaseIndex + 1,
            name: foundPhase.attributes.name,
            keyframe: foundPhase.attributes.keyframe,
            keyframeMedium: foundPhase.attributes.keyframe_medium,
            keyframeThumb: foundPhase.attributes.keyframe_thumb,
            supplemental: foundPhase.attributes.supplemental,
            video: foundPhase.attributes.video,
            workouts: workoutsToAdd,
          };
          moduleToUpdate.phases.push(newPhase);
          // }
          if (phaseIndex > 2) {
            moduleToUpdate.supplementalPhases.push(newPhase);
          }
          return 0;
        });
        return 0;
      });

      newState.loading = false;
      newState.loggingIn = false;
      return {...newState};
    }

    case 'USER_UPDATE': {
      const modifiedData = {email: 'testing', password: 'testpassowrd'};
      return {
        ...state,
        [action.payload.prop]: action.payload.value,
        userModifiedData: modifiedData,
      };
    }

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
        newState[`module${childModuleLeft}`]?.phases.map(
          (phase, phaseIndex) => {
            if (phaseIndex < 3) {
              phase.workouts.map((workout) => {
                workout.exercises.map((exercise) => {
                  totalExercises += 1;
                  totalRating += exercise.confidenceRating;
                  return 0;
                });
                return 0;
              });
            }
            return 0;
          },
        );
        leftChildRating = (totalRating / totalExercises).toFixed(1);
        totalRating = 0;
        totalExercises = 0;
        newState[`module${childModuleRight}`]?.phases.map(
          (phase, phaseIndex) => {
            if (phaseIndex < 3) {
              phase.workouts.map((workout) => {
                workout.exercises.map((exercise) => {
                  totalExercises += 1;
                  totalRating += exercise.confidenceRating;
                  return 0;
                });
                return 0;
              });
            }
            return 0;
          },
        );
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
      ].workouts.map((workout) => {
        exerciseCounter = 0;
        workout.exercises.map((exercise, index) => {
          newState[moduleName].phases[
            action.payload.prop.selectedPhase - 1
          ].workouts[workoutCounter].exercises[
            exerciseCounter
          ].confidenceRating = 4;
          exerciseCounter += 1;
          return 0;
        });
        workoutCounter += 1;
        return 0;
      });

      if (
        action.payload.prop.selectedPhase < 3 &&
        action.payload.prop.selectedPhase === newState[moduleName].currentPhase
      ) {
        newState[moduleName].currentPhase =
          newState[moduleName].currentPhase < 3
            ? (newState[moduleName].currentPhase += 1)
            : newState[moduleName].currentPhase;
      }
      return {
        ...state,
        [moduleName]: newState[moduleName],
      };
    }

    case 'SHOW_TAB_BAR':
      return {...state, [action.payload.prop]: action.payload.value};

    case REHYDRATE:
      return action.payload.users || funcDefaultState();

    default:
      return state;
  }
};
