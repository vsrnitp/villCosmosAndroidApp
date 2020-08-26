/*This is an example of Image Picker in React Native*/
import React , {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Alert,TouchableOpacity,TextInput } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';

 class UpdateUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filePath: {},
      showButton:true,
      showSaveDataButton:false,
      dataNotSaved:false,
      dataSaved:false,
      userName:'',
      userMobile:'',
      userEmail:'',
      userAddress:'',
      imgUri:'',
      saveConfirmation:'',
    };
  }

  //handling various keyboard inputs...
  handleUserName = (text) => {
    this.setState({"userName":text})
}

  handleUserMobile = (text) => {
    this.setState({"userMobile":text})
  }

  handleUserEmail = (text) => {
    this.setState({"userEmail":text})
  }

  handleUserAddress = (text) => {
    this.setState({"userAddress":text})
  }

  //using react native image picker.....
  chooseFile = () => {
    var options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
     // console.log('Response = ', response);

      if (response.didCancel) {
        //Alert.alert('User cancelled image picker');
      } else if (response.error) {
        //console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
       // console.log('User tapped custom button: ', response.customButton);
       // alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          filePath: source,
          showButton:false,
          showSaveDataButton:true,
          dataNotSaved:true
        });
      }
    });
  };

  // using async storage....
  //saving the data...
  saveYourData = async() => {
    try {
      if(this.state.userName!=='')
      await AsyncStorage.setItem('userName', this.state.userName)
     // console.log('I ran')
    } catch (e) {
      // saving error
      console.log(e);
    }
    try {
        await AsyncStorage.setItem('showButton',(this.state.showButton).toString())
       // console.log('I ran')
      } catch (e) {
        // saving error
        console.log(e);
      }
      try {
        await AsyncStorage.setItem('showSaveDataButton',(this.state.showSaveDataButton).toString())
       // console.log('I ran')
      } catch (e) {
        // saving error
        console.log(e);
      }
      try {
        await AsyncStorage.setItem('dataNotSaved',(this.state.dataNotSaved).toString())
       // console.log('I ran')
      } catch (e) {
        // saving error
        console.log(e);
      }
      try {
        await AsyncStorage.setItem('dataSaved',(this.state.dataSaved).toString())
       // console.log('I ran')
      } catch (e) {
        // saving error
        console.log(e);
      }
      try {
        if(this.state.userMobile!=='')
        await AsyncStorage.setItem('userMobile', this.state.userMobile)
       // console.log('I ran')
      } catch (e) {
        // saving error
        console.log(e);
      }
      try {
        if(this.state.userEmail!=='')
        await AsyncStorage.setItem('userEmail', this.state.userEmail)
       // console.log('I ran')
      } catch (e) {
        // saving error
        console.log(e);
      }
      try {
        if(this.state.userAddress!=='')
        await AsyncStorage.setItem('userAddress', this.state.userAddress)
       // console.log('I ran')
      } catch (e) {
        // saving error
        console.log(e);
      }
       //saving img uri to the local async storage...
       try {
        await AsyncStorage.setItem('filePath', JSON.stringify(this.state.filePath))
       // console.log('I ran')
      } catch (e) {
        // saving error
        console.log(e);
      }
  }


  //combinig saving and retriving....
  saveAndRetriveData = () => {
    this.saveYourData();
    this.setState({"showSaveDataButton":false,"saveConfirmation":'Data Saved Successfully! Will be updated with the database soon!',"dataNotSaved":false,"dataSaved":true
  })
}


  


  render() {
    return (
        <ScrollView style={{backgroundColor:'black'}}>
      <View style={styles.container}>
        <View style={styles.container}>
          {/*<Image 
          source={{ uri: this.state.filePath.path}} 
          style={{width: 100, height: 100}} />*/}
          <Text style={{color:'teal',fontSize:20,fontWeight:'bold',padding:8}}>Edit Your Profile!</Text>
          <Text style={{color:'teal',fontSize:20,fontWeight:'bold',padding:8}}>Welcome {this.state.userName}</Text>
          {!this.state.imageSizeIsTooLarge &&
          <Image
            source={{
              uri: 'data:image/jpeg;base64,' + this.state.filePath.data,
            }}
            style={{ width: 200, height: 200,borderRadius:150 }}
          />
          }
          
          {this.state.showButton &&
            <TouchableOpacity delayPressIn={0} onPress={this.chooseFile.bind(this)}>
            <View style={{backgroundColor:'teal',paddingVertical:12,paddingHorizontal:25,borderRadius:25}}>
                <Text style={{color:'white',fontSize:18}}>Upload Avatar!!</Text>
            </View>
            </TouchableOpacity> 
            }
           
            {this.state.dataNotSaved &&
            <Text style={{fontWeight:'bold',fontSize:20,color:'white',padding:8}}>Personal Details...!</Text>
            }

            {this.state.dataNotSaved &&
            <TextInput style={{color:'black',height:50,width:300,fontSize:18,backgroundColor:'white',borderRadius:3,marginTop:10}}
            placeholder="First Name"
            placeholderTextColor="teal"
            onChangeText={this.handleUserName}
            />}
            {this.state.dataNotSaved &&
            <TextInput style={{color:'black',height:50,width:300,fontSize:18,backgroundColor:'white',borderRadius:3,marginTop:10}}
            placeholder="Mobile Number"
            keyboardType={"number-pad"}
            placeholderTextColor="teal"
            onChangeText={this.handleUserMobile}
            />}
            {this.state.dataNotSaved &&
            <TextInput style={{color:'black',height:50,width:300,fontSize:18,backgroundColor:'white',borderRadius:3,marginTop:10}}
            placeholder="Email-Address"
            keyboardType={"email-address"}
            placeholderTextColor="teal"
            onChangeText={this.handleUserEmail}
            />}
            {this.state.dataNotSaved &&
            <TextInput style={{color:'black',height:50,width:300,fontSize:18,backgroundColor:'white',borderRadius:3,marginTop:10}}
            placeholder="Address (Enter only village name!)"
            placeholderTextColor="teal"
            onChangeText={this.handleUserAddress}
            />}
            

            {this.state.showSaveDataButton &&
                <TouchableOpacity delayPressIn={0} onPress={this.saveAndRetriveData}>
                <View style={{backgroundColor:'teal',paddingVertical:12,paddingHorizontal:25,borderRadius:25,marginTop:10}}>
                    <Text style={{color:'white',fontSize:18}}>Save Your Data!!</Text>
                </View>
                </TouchableOpacity> 
            }
              
            <Text style={{fontWeight:'bold',color:'green',padding:10,fontSize:18,textAlign:'center'}}>{this.state.saveConfirmation}</Text>
          
        </View>
      </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    backgroundColor:'black'
    //justifyContent: 'center',
  },
});
export default UpdateUserProfile;

