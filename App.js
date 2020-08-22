
import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';


//importing navigator component
import RootNavigator from './src/components/navigator/bottomNavigator';



class App extends Component {
  
  render(){
  return (
     <RootNavigator/>
   
  )
}
};


export default App;
