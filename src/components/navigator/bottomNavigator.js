import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';

//importing various screens...
import FastFoodItem from '../fastFood/fastFoodItem';
import VegetablePage from '../vegetable/vegetablePage';
import FastFoodDedicatedPage from '../fastFood/fastFoodDedicatedPage';
import ConfirmFastFoodOrdere from '../fastFood/confirmFastFoodOrder';

const Tab = createBottomTabNavigator();
const Stack  = createStackNavigator();

 const BottomNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Fast Food"
      tabBarOptions={{
        activeTintColor: '#e91e63',
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
        component={VegetablePage}
        options={{
          tabBarLabel: 'Vegetable',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="fruit-watermelon" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="shopping Cart"
        component={VegetablePage}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
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

//combining the tab and stack navigator....
export default function RootNavigator(){
  return(
    <NavigationContainer>
    <BottomNavigator/>
    </NavigationContainer>
  )
}
