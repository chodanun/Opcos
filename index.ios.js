import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReduxers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './App/reducers';
import AppContainer from './App/containers/AppContainer'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

const loggerMiddleware = createLogger({predicate: (getState,action) => __DEV__});

function configureStore(initialState){
  const enhancer = compose(
    applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
    ),
);
return createStore(reducer, initialState, enhancer);
}

const store = configureStore({})

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);


AppRegistry.registerComponent('Opcos', () => App);
