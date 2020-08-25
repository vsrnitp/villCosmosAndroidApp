import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Alert
  } from 'react-native';
  import axios from 'axios';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  const URL = `https://villCosmos.vsrnitp.repl.co/api`;

  class ConfirmFastFoodOrder extends Component{
      state={
            confirmationAfterPlacingOrder:'',
            showButton:true
      }

      placeOrder = (itemName,itemPrice,quantity,address,mobileNo,totalBill) => {
         // Alert.alert('Your order of '+itemName+' has been placed successfully!')
         //make a post request to the axios to submit the order and change the state  accordingly....
         var confirmation = null;
          confirmation = axios.post(`${URL}/orderPlace/confirm`,{
             "productName":itemName,
             "productPrice":itemPrice,
             "productQuantity":quantity,
             "deliveryAddress":address,
             "customerMobileNo":mobileNo,
             "totalBillingAmount":totalBill
         })//.then(this.setState({confirmationAfterPlacingOrder:'Your order has been successfully placed! SMS has been sent to your mobile no.! Please take a screenshot of this page and show this to our delivery-guy! Happy Eating',showButton:false}))
         //.catch(e=>Alert.alert(e))
         if(confirmation) {this.setState({confirmationAfterPlacingOrder:'Your order has been successfully placed! SMS has been sent to your mobile no.  Please take a screenshot of this page and show this to our delivery-guy! Happy Eating',showButton:false})
          Alert.alert('Order placed successfully!');
        }
        else{Alert.alert('Order couldnt be placed! Check your internet.')}
      }

      render(){
            //receving the parameters here...
        const {itemId} = this.props.route.params;
        const {itemName} = this.props.route.params;
        const {itemDescription} = this.props.route.params;
        const {itemImageUri} = this.props.route.params;
        const {itemPrice} = this.props.route.params;
        const {totalBill} = this.props.route.params;
        const {quantity} = this.props.route.params;
        const {mobileNo} = this.props.route.params;
        var  {address} = this.props.route.params;

       address = address.slice(44,address.length)
      return(
          <ScrollView style={{backgroundColor:'black'}}>
            <View style={{flex:1,alignItems:'center',justifyContent:'center',marginBottom:20}}>
               <Text style={{textAlign:'center',fontSize:30,fontWeight:'bold',color:'teal',padding:10}}>Confirm your Order!{' '}
               </Text>
               <MaterialCommunityIcons name="food" size={50} color={'white'} style={{paddingBottom:10}}/>
               {/* Confirm order */}
                <Text style={{color:'white',padding:3,fontWeight:'bold',fontSize:20}}>Item Name - {itemName}</Text>
                <Text style={{color:'white',padding:3,fontWeight:'bold',fontSize:20}}>Item price - {itemPrice}/Unit</Text>
                <Text style={{color:'white',padding:3,fontWeight:'bold',fontSize:20}}>Ordered Quantity - {quantity}</Text>
                <Text style={{color:'white',padding:3,fontWeight:'bold',fontSize:20}}>Delivery Address - {address}</Text>
                <Text style={{color:'white',padding:3,fontWeight:'bold',fontSize:20}}>Customer Mobile No - +91{mobileNo}</Text>
                <Text style={{color:'red',padding:3,fontWeight:'bold',fontSize:20,paddingBottom:30}}>Total Billing Amount - Rs.{totalBill}</Text>

                {/* Confirm order button */}
                {/**Making it disabled for now..... */}
                {/** 
                {this.state.showButton && 
                <TouchableOpacity delayPressIn={0} onPress={()=>this.placeOrder(itemName,itemPrice,quantity,address,mobileNo,totalBill)}>
                <View style={{backgroundColor:'darkgreen',paddingVertical:12,paddingHorizontal:25,borderRadius:25}}>
                    <Text style={{color:'white',fontSize:18}}>Confirm Order!</Text>
                </View>
                </TouchableOpacity> 
                }
              */}
              <Text style={{fontSize:25,color:'red'}}>We will very soon operate for fast food also.....</Text>
                <Text style={{color:'green',fontWeight:'bold',padding:25,fontSize:15}}>{this.state.confirmationAfterPlacingOrder}</Text>
            </View>
          </ScrollView>
      )
  }
}

  export default ConfirmFastFoodOrder;