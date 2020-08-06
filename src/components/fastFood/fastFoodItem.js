import React , {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    ActivityIndicator,
    ScrollView
  } from 'react-native';
  
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  //importing the getList action..
  import {getFastFoodList} from '../../actions/fastFood/getList';
  import {connect} from 'react-redux';


  class FastFoodItem extends Component{
    
    componentDidMount(){
      this.props.dispatch(getFastFoodList());
    }
    renderFastFood = (fastFood) => (
      fastFood.fastFoodList ?
      fastFood.fastFoodList.map((item)=>(
        <TouchableWithoutFeedback delayPressIn={0} key={item.id} onPress={()=>this.props.navigation.navigate('FastFoodDedicatedPage',{
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
        <Text style={{padding:5,fontWeight:'bold',color:'#66CC8A',textAlign:'center',fontSize:30}}>
        <MaterialCommunityIcons name="heart" size={30}/>
        Today's Special
        <MaterialCommunityIcons name="heart" size={30}/>
        </Text>
        <View style={styles.container}>
             {this.renderFastFood(this.props.fastFood)}
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
      fastFood:state.fastFoodAvailabilityList
    }
  }
  export default connect(mapStateToProps)(FastFoodItem);