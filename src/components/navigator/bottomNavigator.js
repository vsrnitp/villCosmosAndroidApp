import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {Text,View,Image, Alert} from 'react-native';

//importing various screens...
import FastFoodItem from '../fastFood/fastFoodItem';
import VegetablePage from '../vegetable/vegetableItem';
import FastFoodDedicatedPage from '../fastFood/fastFoodDedicatedPage';
import ConfirmFastFoodOrdere from '../fastFood/confirmFastFoodOrder';
import MasterSearch from '../search/searchBox';
import VegetableDedicatedPage from '../vegetable/vegetableDedicatedPage';
import ConfirmVegetableOrder from '../vegetable/confirmVegetableOrder';
import UserProfile from '../user/userProfile';
import UpdateUserProfile from '../user/updateUserProfile';
import Covid from '../../components/currentNews/covid';
import MasterCart from '../cart/masterCart';


const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack  = createStackNavigator();



 const BottomNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Vegetable"
      tabBarOptions={{
        activeTintColor: 'teal',
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
      name="Cart"
      component={MasterCart}
      options={{
        tabBarLabel: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
      }}
      />
      <Tab.Screen
        name="search"
        component={SearchStackNavigator}
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

//preparing a basic component (Header for the side navigation)...

const Header = () => {
 
  return(
    <View style={{   alignItems: 'center',
    justifyContent: 'center',}}>
      <Text style={{fontWeight:'bold',color:'teal',textAlign:'center',padding:3,fontSize:25}}>Village Cosmos</Text>
      <Text style={{fontWeight:'bold',color:'black',textAlign:'center',padding:8,fontSize:15}}>All the details about village cosmos....
      An api should be made at the back end that will be populated with all the details of village 
      cosmos app and it should be called here. Api should be made so that it remains dynamic and should keep on changing as 
      directed from the server.
      </Text>
    <Image source={{uri:'https://i.ibb.co/MC5JqcK/ic-launcher.png'}} style={{width:'95%',height:'50%',marginTop:20}}/>
    <Text style={{fontSize:15,fontWeight:'bold',padding:15}}>Happy shopping!</Text>
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
      activeTintColor: 'teal',
    }}
    >
        <Drawer.Screen name="Village cosmos" component={Header}
        options={{drawerIcon:() => 
          <MaterialCommunityIcons name="compass-rose" style={{fontSize:25}}/>
        }}/>
        <Drawer.Screen name="Home" component={BottomNavigator} options={{drawerIcon:() => 
          <MaterialCommunityIcons name="home" style={{fontSize:25}}/>
        }}/>
        <Drawer.Screen name="User" component={UserStackNavigator} 
        options={{drawerIcon:() => 
          <Ionicons name="person" style={{fontSize:25}}/>
        }}/>
        <Drawer.Screen name="News" component={NewsStackNavigator} options={{drawerIcon:() => 
        <Ionicons name="newspaper" style={{fontSize:25}}/>
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

//search stack navigator....
const SearchStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="search" component={MasterSearch} options={{headerShown:false}}/>
      <Stack.Screen name="VegetableDedicatedPage" component={VegetableDedicatedPage} options={{headerShown:false}}/>
      <Stack.Screen name="confirmVegetableOrder" component={ConfirmVegetableOrder} options={{headerShown:false}}/>
      <Stack.Screen name="FastFoodDedicatedPage" component={FastFoodDedicatedPage} options={{headerShown:false}}/>
      <Stack.Screen name="confirmFastFoodOrder" component={ConfirmFastFoodOrdere} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

//userProfile stack navigator....
const UserStackNavigator = () => {
  return(
  <Stack.Navigator>
    <Stack.Screen name="User Profile" component={UserProfile} options={{headerShown:false}}/>
    <Stack.Screen name="Update User Profile" component={UpdateUserProfile} options={{headerShown:false}}/>
  </Stack.Navigator>
  )
}

//latest News stack navigator.....
const NewsStackNavigator = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Covid" component={Covid} options={{headerShown:false}}/>
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
