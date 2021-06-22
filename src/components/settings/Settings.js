import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Dialog, {
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogButton,
} from 'react-native-popup-dialog';
import {StyleSettings} from '../../assets/styles/StyleSettings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import {Globals} from '../../globals/Globals';
import * as Progress from 'react-native-progress';
import {StyleDashboard} from '../../assets/styles/StyleDashboard';
import {openDatabase} from 'react-native-sqlite-storage';
import {Database} from '../../database/Database';
import Dashboard from '../dashboard/Dashboard'

const VALUES = {
  spin: 0,
  fuerza: 0,
  velo: 0,
};

const db = openDatabase({name: 'SQLite.db'});

export default class Settings extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      pass: '',
      spin: 0,
      fuerza: 0,
      velo: 0,
      _showDialog: true,
      showDialog: true,
      logout: false,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      const obj = {
        spin: this.state.spin,
        fuerza: this.state.fuerza,
        velo: this.state.velo,
      };
      this.storeData(obj);
      if(this.state._showDialog){
        this.setState({
          showDialog: false  
        })
      }
      new Dashboard().getSetting()
      //this.props.navigation.navigate('Dashboard');
      try {
        this.props
      .navigation
      .dispatch(NavigationActions.reset(
        {
           index: 0,
           actions: [
             NavigationActions.navigate({ routeName: 'Login'})
           ]
         }));
      } catch (error) {
        
      }
      
      return true;
    });
    this.getData();
    this._closeMessage();
    this.closeMessage();
  }

  _closeMessage() {
    setTimeout(() => {
      this.setState((_showDialog) => ({_showDialog: !_showDialog}));
    }, 2500);
  }

  closeMessage() {
    setTimeout(() => {
      this.setState((showDialog) => ({showDialog: !showDialog}));
    }, 2300);
  }

  storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@limits', jsonValue);
    } catch (e) {
      // saving error
      console.log('async ', e);
    }
  };

  logout() {
    this.setState({logout: true});
  }

  _storeData = async () => {
    try {
      let data = {email: '', id: '', login: '', name: '', pass: ''};
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('@user', jsonValue);

      Database.UpdateUserLogin(db);
      this.setState({logout: false});
      this.props.navigation.navigate('Login');
    } catch (e) {
      // saving error
      console.log('async ', e);
    }
  };

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@user');
      console.log(JSON.parse(value));
      if (value !== null) {
        // value previously stored
        //console.log()
        let data = JSON.parse(value);
        console.log(data.email);
        let split = data.email.split('@')
        this.setState({email: split[0]+"..."});
       
      } else {
      }
    } catch (e) {
      console.log('login storage ', e);
      return false;
      // error reading value
    }

    try {
      const value = await AsyncStorage.getItem('@limits');
      console.log(JSON.parse(value));
      if (value !== null) {
        // value previously stored
        let data = JSON.parse(value);

        this.setState({
          spin: Number(data.spin),
          fuerza: Number(data.fuerza),
          velo: Number(data.velo),
        });

        VALUES.spin = Number(data.spin);
        VALUES.fuerza = Number(data.fuerza);
        VALUES.velo = Number(data.velo);
      } else {
      }
    } catch (e) {
      console.log('login storage ', e);
      return false;
      // error reading value
    }
  };

  render() {
    if (this.state._showDialog) {
      return (
        <SafeAreaView style={StyleSettings.container}>
          <Dialog
            visible={this.state.showDialog}
            dialogTitle={<DialogTitle title="Cargando..." />}
            onTouchOutside={() => {
              //this.setState({showDialog: false});
            }}
            width={'0.6'}
            height={'0.2'}>
            <DialogContent>
              <View style={StyleSettings.viewContentDialog}>
                <Progress.Circle
                  size={52}
                  indeterminate={true}
                  color={Globals.SALMON}
                  borderWidth={5}
                />
              </View>
            </DialogContent>
          </Dialog>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={StyleSettings.container}
        >
         
          <Dialog
            visible={this.state.logout}
            dialogTitle={<DialogTitle title="Cerrar sesión..." />}
            onTouchOutside={() => {
              this.setState({logout: false});
            }}
            width={'0.6'}
            footer={
              <DialogFooter>
                <DialogButton
                  text="Cancelar"
                  onPress={() => {
                    this.setState({logout: false});
                  }}
                />
                <DialogButton
                  text="Aceptar"
                  onPress={() => {
                    this._storeData();
                  }}
                />
              </DialogFooter>
            }>
            <DialogContent>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={StyleDashboard.separator}></View>
                <Text style={StyleDashboard.textButtonDialy}>
                  ¿Desea cerrar sesion?
                </Text>
              </View>
            </DialogContent>
          </Dialog>
          <View style={StyleSettings.containerUp}>
            <Text style={StyleSettings.textAjustes}>Ajustes</Text>
          </View>
          <View style={StyleSettings.containerAjustes}>
            <Text style={StyleSettings.textAjustes2}>AJUSTES DE CUENTA</Text>
          </View>
          <View style={StyleSettings.containerEmailCon1}>
            <View style={StyleSettings.viewEmail}>
              <Text style={StyleSettings.genericText}>Correo electrónico</Text>
            </View>

            <View style={StyleSettings.viewInputEmail}>
              <Text style={StyleSettings.genericText2}>{this.state.email}</Text>
            </View>
          </View>
          <View style={StyleSettings.containerEmailCon2}>
            <View style={StyleSettings.viewEmail}>
              <Text style={StyleSettings.genericText}>Contraseña</Text>
            </View>
            <View style={StyleSettings.viewInputEmail}>
              <Text style={StyleSettings.genericText2}>●●●●●●●●●●</Text>
            </View>
          </View>
          <View style={StyleSettings.containerAjustes}>
            <Text style={StyleSettings.textAjustes2}>OBJETIVOS PERSONALES</Text>
          </View>

          <View style={StyleDashboard.separator}></View>
          <View style={StyleDashboard.separator}></View>

          <View style={StyleSettings.containerEmailCon}>
            <View style={StyleSettings.viewEmail}>
              <Text style={StyleSettings.genericText}>Spin</Text>
            </View>
            <View style={StyleSettings.viewInputEmail}>
              <Text style={StyleSettings.genericText2}>
                {this.state.spin} RPM
              </Text>
            </View>
          </View>

          <View
            style={{
              paddingHorizontal: wp('2%'),
            }}>
            <Slider
              style={{
                width: wp('97%'),
                //transform: [{scaleX: 12}, {scaleY: 1.2}],
                
              }}
              minimumValue={1}
              maximumValue={1200}
              minimumTrackTintColor={Globals.SALMON}
              maximumTrackTintColor="#000000"
              thumbTintColor={Globals.SALMON}
              value={VALUES.spin}
              onValueChange={(spin) => {
                this.setState({spin: spin.toFixed(0)});
              }}
            />
            <View
              style={{
                paddingHorizontal: wp('3%'),
              }}>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: '#DADADA',
                  paddingTop: hp('1.8%'),
                }}></View>
            </View>
          </View>
          
          <View style={StyleSettings.containerEmailCon}></View>
          <View style={StyleSettings.containerEmailCon}>
            <View style={StyleSettings.viewEmail}>
              <Text style={StyleSettings.genericText}>Fuerza</Text>
            </View>
            <View style={StyleSettings.viewInputEmail}>
            <Text style={StyleSettings.genericText2}>
                {this.state.fuerza}
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: wp('2%'),
            }}>
            <Slider
              style={{
                width: wp('97%'),
                //height: hp('1%'),
                //transform: [{scaleX: 12}, {scaleY: 1.2}],
              }}
              minimumValue={1}
              maximumValue={150}
              minimumTrackTintColor={Globals.SALMON}
              maximumTrackTintColor="#000000"
              thumbTintColor={Globals.SALMON}
              value={VALUES.fuerza}
              onValueChange={(fuerza) => {
                this.setState({fuerza: fuerza.toFixed(0)});
              }}
            />
            <View
              style={{
                paddingHorizontal: wp('3%'),
              }}>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: '#DADADA',
                  paddingTop: hp('1.8%'),
                }}></View>
            </View>
          </View>

          <View style={StyleSettings.containerEmailCon}></View>
          <View style={StyleSettings.containerEmailCon}>
            <View style={StyleSettings.viewEmail}>
              <Text style={StyleSettings.genericText}>Velocidad</Text>
            </View>
            <View style={StyleSettings.viewInputEmail}>
              <Text style={StyleSettings.genericText2}>
                {this.state.velo} KM/H
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: wp('2%'),
            }}>
            <Slider
              style={{
                width: wp('97%'),
                //height: hp('1%'),
                //transform: [{scaleX: 12}, {scaleY: 1.2}],
              }}
              minimumValue={1}
              maximumValue={100}
              minimumTrackTintColor={Globals.SALMON}
              maximumTrackTintColor="#000000"
              thumbTintColor={Globals.SALMON}
              value={VALUES.velo}
              onValueChange={(velo) => {
                this.setState({velo: velo.toFixed(0)});
              }}
            />
          </View>
          <View style={StyleSettings.containerEmailCon}></View>
          <View style={StyleSettings.logout}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.logout()}
              style={StyleSettings.buttonDialy}>
              <Text style={StyleSettings.textButtonDialy}>
                Cerrar sesión
              </Text>
            </TouchableOpacity>
          </View>
     
        </SafeAreaView>
      );
    }
  }
}
