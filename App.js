import React, {Component} from 'react';
import {View, StatusBar, AsyncStorage} from 'react-native';

import {setEndpointHost, setEndpointPath} from 'redux-json-api';
import thunk from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist';
import {Provider} from 'react-redux';
import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from './src/reducers';
import NavigationRouter from './src/navigation/NavigationRouter';
import * as paths from './src/util/apiPaths';
// import NoInternet from './src/views/noInternet';

const store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(thunk),
    autoRehydrate(),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

store.dispatch(setEndpointHost(paths.endpointHost));
store.dispatch(setEndpointPath(paths.endpointPath));
persistStore(store, {storage: AsyncStorage, whitelist: ['users']});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <StatusBar hidden barStyle="light-content" />
          <NavigationRouter />
          {/* <NoInternet /> */}
        </View>
      </Provider>
    );
  }
}

export default App;
