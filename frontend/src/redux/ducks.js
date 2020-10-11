// Action Types
const SET_USER = 'SET_USER';
const SET_DOG = 'SET_DOG';
const SET_DOGS = 'SET_DOGS';
const SET_CURRENT_DOG_ID = 'SET_CURRENT_DOG_ID';
const ADD_DOG = 'ADD_DOG';
const REMOVE_DOG = 'REMOVE_DOG';
const EMPTY_DOGS = 'EMPTY_DOGS';

// Action Creators
export const actions = {
  setUser: (user) => ({ type: SET_USER, payload: user }),
  setDog: (dog) => ({ type: SET_DOG, payload: dog }),
  setDogs: (dogs) => ({ type: SET_DOGS, payload: dogs }),
  setCurrentDogId: (dogId) => ({ type: SET_CURRENT_DOG_ID, payload: dogId }),
  addDog: (dog) => ({ type: ADD_DOG, payload: dog }),
  removeDog: (dogId) => ({ type: REMOVE_DOG, payload: dogId }),
  emptyDogs: () => ({ type: EMPTY_DOGS }),
};

// Reducers
const initialState = {
  user: {},
  dog: {},
  dogs: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };

    case SET_DOG:
      if (!Object.keys(action.payload).length) return state;
      return { ...state, dog: {...action.payload, label: action.payload.name, value: action.payload.id } };

    case SET_DOGS:
      if (!Object.keys(action.payload).length) return state;
      return { ...state, dogs: 
        action.payload.map(dog => {
          return { ...dog, label: dog.name, value: dog.id }
        })
      };

    case SET_CURRENT_DOG_ID:
      return {
        ...state,
        user: { ...state.user, currentDogId: [action.payload] },
      };

    case ADD_DOG:
      const dogsA = [ ...state.dogs, { ...action.payload, label: action.payload.name, value: action.payload.id } ];
      return { ...state, dogs: dogsA };

    case REMOVE_DOG:
      return { ...state, dogs: state.dogs.filter(dog => dog.id !== action.payload) }

    case EMPTY_DOGS:
      return { ...state, dog: {}, dogs: [], user: { ...state.user, currentDogId: [] } };

    default:
      return state;
  }
};

export default rootReducer;
