// System
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
// Reducer
import rootReducer from './rootReducer';
// Saga
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const composeEnhancers = composeWithDevTools(applyMiddleware(...middlewares));

const store = createStore(rootReducer, composeEnhancers);

sagaMiddleware.run(rootSaga);

export default store;
