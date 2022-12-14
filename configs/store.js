import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from '../reducers';

const composeEnhancers = composeWithDevTools({
  name: 'mbkChat',
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
