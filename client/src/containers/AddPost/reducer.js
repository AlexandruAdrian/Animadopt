import {
  FETCH_COUNTIES,
  FETCH_COUNTIES_SUCCESS,
  FETCH_COUNTIES_ERROR,
} from './constants';

const INITIAL_STATE = {
  counties: [],
  isLoading: false,
};

const countiesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COUNTIES:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_COUNTIES_SUCCESS:
      return {
        counties: action.counties,
        isLoading: false,
      };

    case FETCH_COUNTIES_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default countiesReducer;
