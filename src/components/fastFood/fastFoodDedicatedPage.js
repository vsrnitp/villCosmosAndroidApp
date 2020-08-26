import React, { Component } from 'react';
import { Button, View, Text,ScrollView,StyleSheet,Image, TouchableOpacity,TextInput, Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
class FastFoodDedicatedPage extends Component {
    state={
        quantity:'0',
        mobileNo:'',
        address:'Enter Address to know if item is available or not!',
        deliverable:'red',
        validate:'',
        cartAddress:'',
    }

    handleQuantity = (text) => {
        if(text>0) {this.setState({quantity:text});}
        else this.setState({quantity:0})
    }
    handleMobileNo = (text) => {
        if(text>=1) this.setState({mobileNo:text})
        else this.setState({mobileNo:0})
    }
    handleAddress = (text) => {
        var initialSuccess = 'Congratulations! This item is deliverable in ';
        if(text=='chunni'||text=='chuni'||text=='Chunni'||text=='Chuni'){this.setState({address:initialSuccess+text,deliverable:'green',cartAddress:text})}
        else if(text==''){this.setState({address:'Enter Address to know if item is available or not!',deliverable:'red'})}
        else this.setState({address:'Searching availability database...',deliverable:'yellow'})
    }

    addToCart = (itemName,itemPrice,Quantity,address,mobileNumber,TotalBill) => {
        // Alert.alert('Your order of '+itemName+' has been placed successfully!')
        //make a post request to the axios to submit the order and change the state  accordingly....
        var confirmation = null;
         confirmation = axios.post(`https://villCosmos.vsrnitp.repl.co/api/cart/orderPlace/confirm`,{
            "productName":itemName,
            "productPrice":itemPrice,
            "productQuantity":Quantity,
            "deliveryAddress":this.state.cartAddress,
            "customerMobileNo":mobileNumber,
            "totalBillingAmount":TotalBill
        }).then(Alert.alert('Successfully added to cart!')
        )
        .catch(e=>Alert.alert('No internet!'));
        //here save the mobile no of orderer to async storage and then call that in the cart page to call the APIs...
        if(confirmation)
        try {
             AsyncStorage.setItem('ordereMobNo', mobileNumber)
           // console.log('I ran')
          } catch (e) {
            // saving error
            console.log(e);
          }
     }
   
 
    render(){

        //receving the parameters here...
        const {itemId} = this.props.route.params;
        const {itemName} = this.props.route.params;
        const {itemDescription} = this.props.route.params;
        const {itemImageUri} = this.props.route.params;
        const {itemPrice} = this.props.route.params;

        var TotalBill  = this.state.quantity*itemPrice;
        var Quantity = this.state.quantity;
        var mobileNumber = this.state.mobileNo;
        var address = this.state.address;

        return(
            <ScrollView style={{backgroundColor:'black'}}>
            <View style={{flex:1,alignItems:'center',justifyContent:'center',marginBottom:20}}>
            <View>
                <Text style={{textAlign:'center',fontSize:30,fontWeight:'bold',color:'#66CC8A',padding:10}}>
                <MaterialCommunityIcons name="heart" size={30} color={'red'}/>
                {' '} {itemName} {' '}
                <MaterialCommunityIcons name="heart" size={30} color={'red'}/>
                </Text>
            </View>
            <View style={styles.card}>
            <Image source={{uri: `${itemImageUri}`}} style={styles.cardImage} />
            <View>
              <Text style={{fontWeight:'bold',fontSize:25,padding:5,color:'white'}}>{itemName}</Text>
              <Text style={{color:'white'}}>{itemDescription}
              </Text>
              <Text style={{color:'white',marginLeft:'50%',fontWeight:'bold',fontSize:20}}>Price - {itemPrice}/Unit</Text>
            </View>
            </View>
            </View>

            <View style={{alignItems:'center',justifyContent:'center'}}>
            <View><Text style={{color:'white',padding:2,fontWeight:'bold'}}>Ordered Quantity - {' '}{this.state.quantity}</Text></View>
            <View><Text style={{color:'white',padding:2,fontWeight:'bold'}}>TotalBill - {' '}{itemPrice}*{this.state.quantity}{' '}={' '}{TotalBill}</Text></View>
            <View style={{paddingBottom:10}}>
            <TextInput style={{color:'black',height:50,width:300,fontSize:18,backgroundColor:'white',borderRadius:3}}
             keyboardType={"number-pad"}
             placeholder="Quantity"
             placeholderTextColor="teal"
             onChangeText={this.handleQuantity}
             />
             </View>
             <View style={{paddingBottom:10}}>
             <TextInput style={{color:'black',height:50,width:300,fontSize:18,backgroundColor:'white',borderRadius:3}}
             keyboardType={"number-pad"}
             placeholder="Mobile No."
             placeholderTextColor="teal"
             onChangeText={this.handleMobileNo}
             />
            </View>
            <View style={{paddingBottom:10}}>
            <TextInput style={{color:'black',height:50,width:300,fontSize:18,backgroundColor:'white',borderRadius:3}}
            placeholder="Address (Enter only village name!)"
            placeholderTextColor="teal"
            onChangeText={this.handleAddress}
            />
           </View>
           <View style={{paddingBottom:8}}><Text style={{color:this.state.deliverable,fontWeight:'bold'}}>{this.state.address}</Text></View>

            {/*Making a button to place order*/}
            <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity delayPressIn={0} onPress={()=>{if(this.state.quantity !=0 && this.state.mobileNo != '' && this.state.address != '') { this.props.navigation.navigate('confirmFastFoodOrder',{
                itemId:itemId,
                itemName:itemName,
                itemImageUri:itemImageUri,
                itemPrice:itemPrice,
                itemDescription:itemDescription,
                totalBill:TotalBill,
                quantity:Quantity,
                mobileNo:mobileNumber,
                address:address
            })}
            else {this.setState({validate:'Please enter all the fields!'})}
        }}>
            <View style={{backgroundColor:'darkorange',paddingVertical:12,paddingHorizontal:25,borderRadius:25}}>
                <Text style={{color:'white',fontSize:18}}>Place Order!</Text>
            </View>
            </TouchableOpacity>

            {/*Making a button to add to cart */}
            <TouchableOpacity delayPressIn={0} onPress={()=>{if(this.state.quantity !=0 && this.state.mobileNo != '' && this.state.address != '')
            {this.addToCart(itemName,itemPrice,Quantity,address,mobileNumber,TotalBill)}
            else {this.setState({validate:'Please enter all the fields!'})}
        }}>
            <View style={{backgroundColor:'darkgreen',paddingVertical:12,paddingHorizontal:25,borderRadius:25,marginLeft:5}}>
                <Text style={{color:'white',fontSize:18}}>Add to Cart! {' '}
                <MaterialCommunityIcons name="cart" size={18} color={'white'}/>
                </Text>
            </View>
            </TouchableOpacity> 
            </View>
            <Text style={{paddingTop:5,color:'red'}}>{this.state.validate}</Text>
            </View>
            

            </ScrollView>
        )
        }
}

var styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'black'
    },
    card: {
      height: 300,
      width:'95%',
      marginBottom:10 
    },
    cardImage: {
      height: 200,
    }
  });

export default FastFoodDedicatedPage;