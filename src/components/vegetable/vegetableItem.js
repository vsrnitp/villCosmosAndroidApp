import React, { Component } from 'react';
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

  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import {connect} from 'react-redux';
  //importing the getList action..
  import {getVegetableList} from '../../actions/vegetables/getList';

  class VegetablePage extends Component{

    componentDidMount(){
        this.props.dispatch(getVegetableList());
      }


      renderVegetable = (vegetable) => (
        vegetable.vegetableList ?
        vegetable.vegetableList.map((item)=>(
          <TouchableWithoutFeedback delayPressIn={0} key={item.id} onPress={()=>this.props.navigation.navigate('VegetableDedicatedPage',{
            itemId:item._id,
            itemName:item.productName,
            itemDescription:item.productDescription,
            itemImageUri:item.productImgUri,
            itemPrice:item.productPrice
          })}>
          <View
            style={styles.card}
          >
            <Image source={{uri: `${item.productImgUri}`}} style={styles.cardImage} />
            <View>
              <Text style={{fontWeight:'bold',fontSize:25,padding:5,color:'white'}}>{item.productName}</Text>
              <Text style={{color:'white'}}>{item.productDescription}
              </Text>
              <Text style={{color:'white',marginLeft:'50%',fontWeight:'bold',fontSize:15}}>Price - {item.productPrice}/Unit</Text>
              
              
            </View>
            <View
              style={{
              borderBottomColor: 'teal',
              borderBottomWidth: 1,
              padding:2
                  }}
                  />
          </View>
               </TouchableWithoutFeedback>
        ))
        : <View>
        <ActivityIndicator
       style={{justifyContent:'center',padding:25}}
       color = '#bc2b78'
        size = "large"
       />
       <Text style={{textAlign:'center',fontSize:15,padding:15,fontWeight:'bold'}}> checking your internet connection.....
       </Text>
       <Text style={{textAlign:'center',fontSize:15,padding:2,color:'red'}}>(If it takes more time than expected plz enable your internet and restart the app!)</Text>
       </View>
      )


    render(){
        return(
               
        <ScrollView style={{backgroundColor:'black'}}>
        <Text style={{padding:5,fontWeight:'bold',color:'#66CC8A',fontSize:30,textAlign:'center'}}>
        
        <MaterialCommunityIcons name="heart" size={30} color='red'/>
        Fresh Vegetables
        <MaterialCommunityIcons name="heart" size={30} color='red'/>
        </Text>
        <View style={styles.container}>
             {this.renderVegetable(this.props.vegetable)}
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

  function mapStateToProps(state){
    return {
      vegetable:state.vegetableAvailabilityList
    }
  }

  export default connect(mapStateToProps)(VegetablePage);