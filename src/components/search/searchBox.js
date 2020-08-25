import React, { Component } from 'react';
import { Button, View, Text,ScrollView,StyleSheet,Image, TouchableOpacity,TextInput, Alert} from 'react-native';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const URL = `https://villcosmos.vsrnitp.repl.co/api/fastFoodSearch/search`; // API for fast food searching
const URL1 = `https://villcosmos.vsrnitp.repl.co/api/vegetableSearch/search`; //API for vegetable searching


class MasterSearch extends Component{

    state = {
        fastFoodSearchData : '',
        vegetableSearchData:'',
        hint:'please enter search string....'
    }
    
   
    handleSearch = (text) => {
     var regex = /^[0-9a-zA-Z]+$/;
      if(text.match(regex)){
        const request = axios.post(`${URL}`,{"searchString":text}).then(response => {
            const searchData = [];
           
            for(let key in response.data){
                searchData.push({
                    ...response.data[key],
                    id:key
                })  
            }
            const request1 = axios.post(`${URL1}`,{"searchString":text}).then(response1 => {
                const searchData1 = [];

                for(let key in response1.data){
                    searchData1.push({
                        ...response1.data[key],
                        id:key
                    })  
                }
                if(searchData && text!=='')this.setState({"fastFoodSearchData":searchData});
                if(searchData1 && text!=='')this.setState({"vegetableSearchData":searchData1});
                console.log(text)
            })
       }).catch(e=>{
           console.log(e);
       })
    }
}


renderFastFoodSearchData = () => (
    this.state.fastFoodSearchData ? 
        this.state.fastFoodSearchData.map((item)=>(
            
            <TouchableOpacity delayPressIn={0} key={item.id} onPress={()=>this.props.navigation.navigate('FastFoodDedicatedPage',{
                itemId:item._id,
                itemName:item.productName,
                itemDescription:item.productDescription,
                itemImageUri:item.productImgUri,
                itemPrice:item.productPrice
              })}>
            <View style={{flex:1,flexDirection:'column'}}>
                <Text style={{fontWeight:'bold', fontSize:20,paddingBottom:5}}>{item.productName}</Text>
                <Text style={{color:'grey',fontSize:15,paddingBottom:5}}>{item.productDescription}</Text>
                <View style={{flex:1,flexDirection:'row'}}>
                <Text style={{fontWeight:'bold',color:'teal',fontSize:18}}>Price - {item.productPrice}/Unit</Text>
                <Text style={{fontWeight:'bold',color:'grey',paddingLeft:'40%'}}>Fast Food</Text>
                </View>
                </View>
                <View
            style={{
            borderBottomColor: 'teal',
            borderBottomWidth: 1,
            padding:2
                }}
                />
                </TouchableOpacity>
          
        ))
        :
        <Text>{this.state.hint}</Text>
)
     
                

renderVegetableSearchData = () => (
    this.state.vegetableSearchData ? 
        this.state.vegetableSearchData.map((item)=>(
            
            <TouchableOpacity delayPressIn={0} key={item.id} onPress={()=>this.props.navigation.navigate('VegetableDedicatedPage',{
                itemId:item._id,
                itemName:item.productName,
                itemDescription:item.productDescription,
                itemImageUri:item.productImgUri,
                itemPrice:item.productPrice
              })}>
            <View style={{flex:1,flexDirection:'column'}}>
                <Text style={{fontWeight:'bold', fontSize:20,paddingBottom:5}}>{item.productName}</Text>
                <Text style={{color:'grey',fontSize:15,paddingBottom:5}}>{item.productDescription}</Text>
                <View style={{flex:1,flexDirection:'row'}}>
                <Text style={{fontWeight:'bold',color:'teal',fontSize:18}}>Price - {item.productPrice}/Unit</Text>
                <Text style={{fontWeight:'bold',color:'grey',paddingLeft:'40%'}}>Vegetable</Text>
                </View>
                </View>
                <View
            style={{
            borderBottomColor: 'teal',
            borderBottomWidth: 1,
            padding:2
                }}
                />
                </TouchableOpacity>
           
        ))
        :
        <Text></Text>
)

    render(){
        return(
            <ScrollView>
            <View style={{justifyContent:'center',alignItems:'center'}}>
            <Text style={{textAlign:'center',fontSize:30,fontWeight:'bold',color:'black'}}>Search...</Text>
            <TextInput style={{color:'black',height:50,width:'95%',fontSize:14,backgroundColor:'#F0FFF0',borderRadius:5,margin:10}}
            placeholder="search for anything...(fruits,vegetables etc.)"
            placeholderTextColor="teal"
            onChangeText={this.handleSearch}
            />
            {/*
            <TouchableOpacity delayPressIn={0}>
            <View style={{backgroundColor:'teal',paddingVertical:12,paddingHorizontal:25,borderRadius:25}}>
            <Text style={{color:'white',fontSize:20}}>Search{'  '}
            <MaterialCommunityIcons name="card-search" style={{textAlign:'center',fontSize:25}}/>
            </Text>
            </View>
            </TouchableOpacity>
            */}
            </View>
            <View style={{padding:15}}>
                {this.renderFastFoodSearchData()}
                {this.renderVegetableSearchData()}
            </View>
           
            </ScrollView>
        )
    }
}

export default MasterSearch;
