import {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_ERROR,
  ADD_CATEGORY,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_ERROR,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_ERROR,
  DELETE_CATEGORY,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_ERROR,
  SET_SELECTED_CATEGORY,
} from './constants';

const INITIAL_STATE = {
  categories: [],
  isLoading: false,
  selectedCategory: {},
};

const categoriesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
    case UPDATE_CATEGORY:
    case DELETE_CATEGORY:
    case FETCH_CATEGORIES:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.categories,
        isLoading: false,
      };

    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, action.newCategory],
      };

    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.map((category) => {
          if (category._id === action.updatedCategory._id) {
            category = action.updatedCategory;
          }

          return category;
        }),
      };

    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category._id !== action.categoryId
        ),
      };

    case ADD_CATEGORY_ERROR:
    case UPDATE_CATEGORY_ERROR:
    case DELETE_CATEGORY_ERROR:
    case FETCH_CATEGORIES_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    case SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.category,
      };

    default:
      return state;
  }
};

export default categoriesReducer;
