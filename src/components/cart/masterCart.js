import React , {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    ActivityIndicator,
    ScrollView,
    Alert
  } from 'react-native';
  import axios from 'axios';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

  
//global variable...
var ordererMobileNumber = 0;

  const URL = 'https://villCosmos.vsrnitp.repl.co/api/cart/fetch/ordersList' //for fetching cart orders list(GET)
  const URL1 = 'https://villCosmos.vsrnitp.repl.co/api/cart/orderConfirm/confirmCartOrder' //for confirming cart order(POST)

  class MasterCart extends Component{

    state={
        cartOrderData:'',
    }

    //fetching cart orders....
    fetchCartOrder = (ordererMobileNumber) => {
        const request = axios.get(`${URL}/${ordererMobileNumber}`)
                        .then(response=>{
                            const cartOrderData = [];
           
                            for(let key in response.data){
                                cartOrderData.push({
                                    ...response.data[key],
                                    id:key
                                })  
                            }
                            //setting state....
                            if(cartOrderData) this.setState({"cartOrderData":cartOrderData});
                            //console.log(cartOrderData);
                        })
                        .catch(e=>console.log(e))
    }

    //checkout for cart orders....
    checkoutCart = (ordererMobileNumber) => {
        const request = axios.post(`${URL1}/${ordererMobileNumber}`)
          .then(Alert.alert('Order placed successfully!'))
          .catch(e=>console.log(e));
    }

    //rendering cart data....
    renderCartOrderData = () => (
        this.state.cartOrderData ? 
            this.state.cartOrderData.map((item)=>(
                
                <TouchableOpacity key={item.id}>
                <View style={{padding:8}}>
                    <Text style={{fontWeight:'bold', fontSize:20,paddingBottom:5,color:'red'}}>{item.productName}</Text>
                    <Text style={{fontWeight:'bold',color:'teal',fontSize:18}}>Price - {item.productPrice}/Unit</Text>
                    <Text style={{fontWeight:'bold', fontSize:10,paddingBottom:5}}>Quantity - {item.productQuantity}</Text>
                    <Text style={{fontWeight:'bold', fontSize:10,paddingBottom:5}}>Address - {item.deliveryAddress}</Text>
                    <Text style={{fontWeight:'bold', fontSize:10,paddingBottom:5}}>Mob No - {item.customerMobileNo}</Text>
                    <Text style={{fontWeight:'bold', fontSize:10,paddingBottom:5}}>Total Amount - {item.totalBillingAmount}</Text>
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
            <Text style={{textAlign:'center'}}>Nothing found</Text>
    )

    //getting orderes mobile no here from async storage....
    getOrdererMobileNo = async() =>{
        try {
            const ordererMobileNo = await AsyncStorage.getItem('ordereMobNo')
            if(ordererMobileNo !== null) {
               ordererMobileNumber = ordererMobileNo;
               //console.log(ordererMobileNumber);
            }
          } catch(e) {
            // error reading value
          }
    }
    
    componentDidMount(){
        this.getOrdererMobileNo();
        this.fetchCartOrder(ordererMobileNumber);
        this.renderCartOrderData()
    }

      render(){
          return(
              <ScrollView style={{backgroundColor:'#F0FFF0'}}>
              <View style={{
                flex: 1,
                //alignItems: 'center',
                //justifyContent: 'center',
              }}>
              <Text style={{textAlign:'center',fontWeight:'bold',color:'teal',fontSize:18,padding:10}}>Welcome to your Cart!</Text>
              {this.componentDidMount()}
              {this.renderCartOrderData()}

              {/**Making the buttons.. */}

              <View style={{flex: 1, flexDirection: 'row',alignItems:'center',justifyContent:'center',padding:10}}>
              {/*Making a button to add to cart */}
              {this.state.cartOrderData!='' && 
              <TouchableOpacity delayPressIn={0} onPress={()=>this.checkoutCart(ordererMobileNumber)}>
              <View style={{backgroundColor:'darkgreen',paddingVertical:12,paddingHorizontal:25,borderRadius:25,marginLeft:5}}>
                  <Text style={{color:'white',fontSize:18}}>Checkout! {' '}
                  <MaterialCommunityIcons name="cart" size={18} color={'white'}/>
                  </Text>
              </View>
              </TouchableOpacity> 
              }

              {this.state.cartOrderData=='' &&
              <Text style={{fontWeight:'bold',color:'red'}}>Cart is empty! {' '} 
              <MaterialCommunityIcons name="emoticon-sad-outline" size={15} color={'red'}/>
              </Text>
            }
              </View>

              </View>
              </ScrollView>
          )
      }
  }

  export default MasterCart;