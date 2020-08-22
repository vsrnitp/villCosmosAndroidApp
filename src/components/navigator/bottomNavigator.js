import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {Text,View} from 'react-native';

//importing various screens...
import FastFoodItem from '../fastFood/fastFoodItem';
import VegetablePage from '../vegetable/vegetableItem';
import FastFoodDedicatedPage from '../fastFood/fastFoodDedicatedPage';
import ConfirmFastFoodOrdere from '../fastFood/confirmFastFoodOrder';
import MasterSearch from '../search/searchBox';
import VegetableDedicatedPage from '../vegetable/vegetableDedicatedPage';
import ConfirmVegetableOrder from '../vegetable/confirmVegetableOrder';


const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack  = createStackNavigator();

 const BottomNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Fast Food"
      tabBarOptions={{
        activeTintColor: '#e91e64',
      }}
    >
      <Tab.Screen
        name="Fast Food"
        component={FastFoodStackNavigator}
        options={{
          tabBarLabel: 'Fast Food',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="hamburger" color={color} size={size} />
          ),
          
        }}
      />
      <Tab.Screen
        name="Vegetable"
        component={VegetableStackNavigator}
        options={{
          tabBarLabel: 'Vegetable',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="fruit-watermelon" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="search"
        component={MasterSearch}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cloud-search" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

//preparing a basic component (testing)...
const Header = () => {
  return(
    <View>
      <Text>Village Cosmos</Text>
    </View>
  )
}

//preparing final navigator combining all the navigators...
const FinalNavigator = () => {
  return(
    <Drawer.Navigator initialRouteName = "Home"
    drawerStyle={{
      backgroundColor:'#F0FFF0',
    }}
    drawerContentOptions={{
      activeTintColor: '#e91e63',
    }}
    >
        <Drawer.Screen name="Village cosmos" component={Header}/>
        <Drawer.Screen name="Home" component={BottomNavigator} options={{drawerIcon:() => 
          <MaterialCommunityIcons name="home" />
        }}/>
    </Drawer.Navigator>
  )
}

//fast food stack navigator....
const FastFoodStackNavigator = () =>{
  return(
    <Stack.Navigator>
      <Stack.Screen name="FastFoodItem" component={FastFoodItem} options={{headerShown:false}}/>
      <Stack.Screen name="FastFoodDedicatedPage" component={FastFoodDedicatedPage} options={{headerShown:false}}/>
      <Stack.Screen name="confirmFastFoodOrder" component={ConfirmFastFoodOrdere} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

//vegetable stack navigator....
const VegetableStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Vegetable" component={VegetablePage} options={{headerShown:false}}/>
      <Stack.Screen name="VegetableDedicatedPage" component={VegetableDedicatedPage} options={{headerShown:false}}/>
      <Stack.Screen name="confirmVegetableOrder" component={ConfirmVegetableOrder} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

//combining the tab and stack navigator....
export default function RootNavigator(){
  return(
    <NavigationContainer>
    {/*<BottomNavigator/>*/} 
    <FinalNavigator/>   
    </NavigationContainer>
  )
}
