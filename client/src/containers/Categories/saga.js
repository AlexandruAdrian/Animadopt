// System
import { put, call, all, takeLatest } from 'redux-saga/effects';
// Service
import {
  fetchCategoriesHttp,
  addCategoryHttp,
  updateCategoryHttp,
  deleteCategoryHttp,
} from './service';
// Actions
import {
  fetchCategoriesSuccess,
  fetchCategoriesError,
  addCategorySuccess,
  addCategoryError,
  updateCategorySuccess,
  updateCategoryError,
  deleteCategorySuccess,
  deleteCategoryError,
} from './actions';
// Constants
import {
  FETCH_CATEGORIES,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from './constants';

function* categoriesSaga() {
  yield all([
    takeLatest(FETCH_CATEGORIES, fetchCategoriesSaga),
    takeLatest(ADD_CATEGORY, addCategorySaga),
    takeLatest(UPDATE_CATEGORY, updateCategorySaga),
    takeLatest(DELETE_CATEGORY, deleteCategorySaga),
  ]);
}

function* fetchCategoriesSaga() {
  try {
    const { data } = yield call(fetchCategoriesHttp);
    yield put(fetchCategoriesSuccess(data.categories));
  } catch (err) {
    yield put(fetchCategoriesError());
  }
}

function* addCategorySaga(action) {
  try {
    const { data } = yield call(addCategoryHttp, action);
    yield put(addCategorySuccess(data));
  } catch (err) {
    yield put(addCategoryError());
  }
}

function* updateCategorySaga(action) {
  try {
    const { data } = yield call(updateCategoryHttp, action);
    yield put(updateCategorySuccess(data));
  } catch (err) {
    yield put(updateCategoryError());
  }
}

function* deleteCategorySaga(action) {
  try {
    const { data } = yield call(deleteCategoryHttp, action);
    yield put(deleteCategorySuccess(data));
  } catch (err) {
    yield put(deleteCategoryError());
  }
}

export default categoriesSaga;
