import React , {useEffect} from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

//setting up redux
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';

//bringing root reducer
import reducers from './src/reducers/rootReducer';

//using middlewares
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);

const RootApp = () =>(

    
    <Provider store={createStoreWithMiddleware(reducers)}>
     <App/>
    </Provider>
)

AppRegistry.registerComponent(appName, () => RootApp);
