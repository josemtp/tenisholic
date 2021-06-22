import React, {Component} from 'react';
import {View, Text, TextInput, Image, SafeAreaView, TouchableOpacity, Keyboard, BackHandler, LogBox } from 'react-native';
import {StylesLogin} from '../../assets/styles/StyleLogin';
import {IMAGES} from '../../assets/images/index';
import Snackbar from 'react-native-snackbar-component';
import { Globals } from '../../globals/Globals';
import Dialog, {DialogContent, DialogTitle} from 'react-native-popup-dialog';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {openDatabase} from 'react-native-sqlite-storage';
import {Database} from '../../database/Database';

const db = openDatabase({name: 'SQLite.db'});
/*
db.transaction(function (txn) {
  txn.executeSql(
    `DELETE FROM records`,
    [],
  );
});


for (let index = 0; index < 3; index++) {
  Database.InsertQueryRecords(
    db, 
    Math.floor(Math.random() * 256).toString(), 
    Math.floor(Math.random() * 256).toString(), 
    Math.floor(Math.random() * 256).toString(), 
    Math.floor(Math.random() * 256).toString()
  )
}
*/

export default class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      pass: '',
      show: false,
      message: '',
      showDialog: false
    }
  }
  
  storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@user', jsonValue)
    } catch (e) {
      // saving error
      console.log("async ", e)
    }
  }

  getData = async () => {
    console.log('aquiiiii')
    try {
      const value = await AsyncStorage.getItem('@user')
      console.log(value)
      if(value !== null) {
        // value previously stored
       //console.log()
        let data = JSON.parse(value)
        if(data.login == 'v'){
          this.setState({showDialog: false})
          this.props.navigation.navigate('Dashboard')
        }else{
          this.setState({showDialog: false})
        }
      }else{
        this.setState({showDialog: false})
      }
    } catch(e) {
      console.log('login storage ', e)
      return false
      // error reading value
    }

    try {
      const value = await AsyncStorage.getItem('@limits');
      console.log(value);
      if (value !== null) {
        
      } else {
        try {
          const obj = {
            spin: 0,
            fuerza: 0,
            velo: 0,
          }
          await AsyncStorage.setItem('@limits', JSON.stringify(obj))
        } catch (e) {
          
        }
      }
    } catch (e) {
      console.log('login storage ', e);
      return false;
      // error reading value
    }
  }

  callback = (data) =>{
    /**
     * Aqui en el callback reciba la informacion la cual corresponde
     * al resto del inicio de sesion por lo tanto, termina de validar todo
     * dependiende accede al dashboard y guarda en async-storage
    */
  
   if(data.status){
      this.setState({showDialog: false})
      this.storeData(data.user)
      console.log("login ", data.user)
      this.props.navigation.navigate('Dashboard')      
    }else{
      this.setState({
        show: true,
        message: 'Ocurrio un error, intenta de nuevo',
        showDialog: false
      })
    }
    this.closeMessage()
  }
  

  closeMessage() {
    setTimeout(() => {
      this.setState((_show) => ({ show: false }));
    }, 3000);
  }

  login() {
    Keyboard.dismiss()
    if(this.state.email == ''){
      this.setState({show: true, message: '¡Revisa el campo de email, no puede estar vacío!'})
      this.closeMessage()
      return
    }
    if(this.state.pass == ''){
      this.setState({show: true, message: '¡Revisa el campo de constraseña, no puede estar vacío!'})
      this.closeMessage()
      return
    }

    this.setState({showDialog: true})

    fetch('http://34.231.86.5:3000/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        pass: this.state.pass
      })
    }).then((response) => response.json())
    .then((res) => {
      console.log(res.result)
      if(res.result){
        Database.InsertQueryUsers(this.callback, db, res.name, this.state.email, this.state.pass)
      }else{
        this.setState({
          show: true,
          message: 'Ocurrió un error, intenta de nuevo',
          showDialog: false
        })
      }
    }).catch((error) => {
      console.log(error)
      this.setState({
        show: true,
        message: 'Revisa la conexión a internet',
        showDialog: false
      })
    }) 
  }

  componentDidMount(){
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    BackHandler.addEventListener('hardwareBackPress', () => {


      return true;
    })
    this.setState({showDialog: true})
    this.getData()
  }

  render() {
    return (
      <SafeAreaView style={StylesLogin.container}>
        <Dialog
          visible={this.state.showDialog}
          dialogTitle={<DialogTitle title="Cargando..." />}
          onTouchOutside={() => {
            //this.setState({showDialog: false});
          }}
          width={0.6}
          height={0.2}>
          <DialogContent>
            <View style={StylesLogin.viewContentDialog}>
              <Progress.Circle 
                size={52} 
                indeterminate={true}
                color={Globals.SALMON}
                borderWidth={5} />
            </View>
          </DialogContent>
        </Dialog>

        <View style={StylesLogin.viewImage}>
          <Image 
            style={StylesLogin.image}
            source={IMAGES.skodaBlanco}></Image>
        </View>

        <Text style={StylesLogin.labelUser}>Usuario</Text>
        <TextInput 
          style={StylesLogin.inputUser}
          onChangeText={(email) => this.setState({email: email})}
          keyboardType="email-address"
          autoCapitalize='none'
          >
        </TextInput>

        <View style={StylesLogin.separator}></View>

        <Text style={StylesLogin.labelUser}>Contraseña</Text>
        <TextInput 
          style={StylesLogin.inputPassword} 
          secureTextEntry={true}
          onChangeText={(pass) => this.setState({pass: pass})}
          autoCapitalize='none'

          ></TextInput>

        <View style={StylesLogin.separator}></View>
        
        <View style={StylesLogin.viewIngresar}>
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => this.login()} 
            style={StylesLogin.buttonIngresar}>
              <Text style={StylesLogin.textButton}>Ingresar</Text>
          </TouchableOpacity>
        </View>
        
        <Snackbar
          visible={this.state.show}
          textMessage={(
            <Text style={{ fontFamily: 'DINPro-Bold_13934' }}>
              {this.state.message}
            </Text>
          )}
          actionHandler={() => {
            this.setState({ show: false });
          }}
          actionText="Cerrar"
          backgroundColor={Globals.WHITE}
          accentColor={'#000'}
          messageColor={'#000'}
        />
      </SafeAreaView>
    );
  }
}
