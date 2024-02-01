import { createStore, applyMiddleware, compose } from 'redux';

// middleware : un outil de Redux pour gérer les appels API (pas vu pendant la spé, on a
// fait différement pour la spé)

import reducer from 'src/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(),
);

const store = createStore(reducer, enhancers);

export default store;
