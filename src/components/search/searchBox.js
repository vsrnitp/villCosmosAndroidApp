import React, { Component } from 'react';
import { Button, View, Text,ScrollView,StyleSheet,Image, TouchableOpacity,TextInput, Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class MasterSearch extends Component{

    render(){
        return(
            <ScrollView>
            <View style={{justifyContent:'center',alignItems:'center'}}>
            <Text style={{textAlign:'center',fontSize:30,fontWeight:'bold',color:'black'}}>Search...</Text>
            <TextInput style={{color:'black',height:50,width:'95%',fontSize:14,backgroundColor:'#F0FFF0',borderRadius:5,margin:10}}
            placeholder="search for anything...(fruits,vegetables etc.)"
            placeholderTextColor="teal"
            />
            <TouchableOpacity delayPressIn={0}>
            <View style={{backgroundColor:'teal',paddingVertical:12,paddingHorizontal:25,borderRadius:25}}>
            <Text style={{color:'white',fontSize:20}}>Search{'  '}
            <MaterialCommunityIcons name="card-search" style={{textAlign:'center',fontSize:25}}/>
            </Text>
            </View>
            </TouchableOpacity>
            </View>
            </ScrollView>
        )
    }
}

export default MasterSearch;
