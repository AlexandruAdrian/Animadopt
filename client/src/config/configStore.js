// System
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
// Reducer
import rootReducer from './rootReducer';
// Saga
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  compose(composeWithDevTools(), applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
