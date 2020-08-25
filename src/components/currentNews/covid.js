import axios from 'axios';
import React , {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
  } from 'react-native';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

  class Covid extends Component{

    state={
        ActiveCases:'',
        Discharged:'',
        Death:'',
        TotalCases:''
    }

    getCovidData = () => {
        const request = axios.get('https://api.covidindiatracker.com/total.json')
                            .then((response) => {
                                var data = response.data;
                               const values = Object.values(data);
                                this.setState({"ActiveCases":values[2],"Discharged":values[4],"Death":values[5],"TotalCases":values[3]})
                            })
                            .catch(e => console.log(e));
    }

    componentDidMount = () => {
        this.getCovidData();
    }

      render(){
          return(
              <View style={{
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                backgroundColor:'black',
                justifyContent: 'center',
              }}>
              <MaterialCommunityIcons name="virus" size={50} color={'teal'} />
              <Text style={{fontWeight:'bold',color:'teal',fontSize:25,padding:10}}>Covid Data Here...!</Text>

              <Text style={{fontWeight:'bold',color:'yellow',fontSize:20,padding:7}}>Current Active Cases - {this.state.ActiveCases}</Text>
              <Text style={{fontWeight:'bold',color:'darkgreen',fontSize:20,padding:7}}>Recovered Patients - {this.state.Discharged}</Text>
              <Text style={{fontWeight:'bold',color:'teal',fontSize:20,padding:7}}>Total Covid Cases (India) - {this.state.TotalCases}</Text>
              <Text style={{fontWeight:'bold',color:'red',fontSize:20,padding:7}}>Total Death Count - {this.state.Death}</Text>

              <TouchableOpacity delayPressIn={0} onPress={this.getCovidData}>
              <View style={{backgroundColor:'teal',paddingVertical:12,paddingHorizontal:25,borderRadius:25}}>
                  <Text style={{color:'white',fontSize:18}}>Refresh Data!</Text>
              </View>
              </TouchableOpacity> 
              
              </View>
          )
      }
  }

  export default Covid;