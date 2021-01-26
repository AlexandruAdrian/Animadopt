// System
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
// Reducer
import rootReducer from './rootReducer';
// Saga
import rootSaga from './rootSaga';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const composeEnhancers = composeWithDevTools(applyMiddleware(...middlewares));

const store = createStore(persistedReducer, composeEnhancers);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
