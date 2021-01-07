// System
import { all } from 'redux-saga/effects';
// Sagas
import registerSaga from '../containers/Register/saga';

const rootSaga = function* rootSaga() {
  yield all([registerSaga()]);
};
export default rootSaga;
