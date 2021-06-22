import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  AppState,
  LogBox,
  Button,
  BackHandler,
} from 'react-native';
import { StyleDashboard } from '../../assets/styles/StyleDashboard';
import { IMAGES } from '../../assets/images/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Globals } from '../../globals/Globals';
import { BleManager } from 'react-native-ble-plx';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Snackbar from 'react-native-snackbar-component';
import base64 from 'react-native-base64';
import Dialog, {
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogButton,
} from 'react-native-popup-dialog';
import { Stopwatch } from 'react-native-stopwatch-timer';
import { openDatabase } from 'react-native-sqlite-storage';
import { Database } from '../../database/Database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StylesLogin } from '../../assets/styles/StyleLogin';

const db = openDatabase({ name: 'SQLite.db' });

const manager = new BleManager();
var builder = '';
var counter = 0;
var _contador = 0;
let _mili = '';
let percentSpin = 0;
let percentFuerza = 0;
let percentVelocidad = 0;

const monthNamesShort = [
  'Ene.',
  'Feb.',
  'Mar.',
  'Abr.',
  'May.',
  'Jun.',
  'Jul.',
  'Ago.',
  'Sept.',
  'Oct.',
  'Nov.',
  'Dic.',
];

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      service: '0000ffe0-0000-1000-8000-00805f9b34fb',
      chara: '0000ffe1-0000-1000-8000-00805f9b34fb',
      appState: AppState.currentState,
      message: '',
      show: false,
      connectBlue: false,
      textBlue: 'Conectar',
      UUID: '',
      disabledBtn: false,
      showDialog: false,
      activeBtn: true,
      spin: '0',
      fuerza: '0',
      velocidad: '0',
      bateria: '0',
      iconBattery: 0,
      contador: 0,
      textoGolpes: 'Golpe',
      textoJugar: 'Jugar',
      timer: '00:00:00.00',
      activeTimer: false,
      timeEnd: 0,
      getLap: false,
      day: '',
      setTimer: false,
      time: '00:00:00:000',
      circleSpin: 0,
      circleFuerza: 0,
      circleVelocidad: 0,
    };
  }

  getDay() {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year

    //'2021-08-01 00:00:00'
    let _month = month > 9 ? month : '0' + month;
    let _day = date > 9 ? date : '0' + date;

    let _return = `${year}-${_month}-${_day}`;

    var days = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ];
    var d = new Date(_return);
    var dayName = days[d.getDay() + 1];

    let DAY =
      dayName.toUpperCase() +
      ', ' +
      _day +
      ' ' +
      monthNamesShort[Number(_month) - 1].toUpperCase();

    this.setState({ day: DAY });
  }

  getSetting() {
    setTimeout(() => {
      this.getData()
    }, 500)
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@user');
      if (value !== null) {
        // value previously stored

        if (JSON.parse(value).login === 'v') {
          const limits = await AsyncStorage.getItem('@limits');
          console.log('aquiiiiiii ', limits);
          if (limits !== null) {
            let json = JSON.parse(limits);
            this.setState({
              showDialog: false,
            });
            percentSpin = json.spin
            percentFuerza = json.fuerza,
              percentVelocidad = json.velo

            console.log('aqui1 ', percentSpin)
            console.log('aqui2 ', percentFuerza)
            console.log('aqui3 ', percentVelocidad)
          } else {
            this.setState({ showDialog: false });
          }
        } else {
          this.setState({ showDialog: false });
        }
      } else {
        this.setState({ showDialog: false });
      }
    } catch (e) {
      // error reading value
      this.setState({ showDialog: false });
    }
  };


  componentDidMount() {
    this.getDay();
    this.getData();

    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    manager.stopDeviceScan();
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then((result) => {
        if (result) {
          console.log('Permission is OK');
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ).then((result) => {
            if (result) {
              console.log('User accept');
            } else {
              console.log('User refuse');
            }
          });
        }
      });
    }
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.setState({
        showDialog: false
      })
      return true;
    });
  }

  closeMessage() {
    setTimeout(() => {
      this.setState((_show) => ({ show: !_show }));
    }, 4500);
  }

  scann() {
    //alert('push');
    this.setState({
      disabledBtn: true,
      textBlue: 'Conectando...',
      activeBtn: true,
      //activeTimer:true
    });
    let i = 0;
    if (this.state.UUID != '') {
      manager.cancelDeviceConnection(this.state.UUID);
    }

    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        //alert(JSON.stringify(error));
        this.setState({
          show: true,
          message: '¡Revisa si el bluetooth y el GPS están encendidos!',
          disabledBtn: false,
          textBlue: 'Conectar',
          activeBtn: true,
          timeEnd: 0,
          activeTimer: false,
          UUID: '',
        });
        this.closeMessage();
      } else {
        console.log(device.name, ' ', device.id);
        console.log(i);
        let name = device.name != null ? device.name : '';
        //console.log(name.includes('S-KODA2_V0'))

        if (name.includes('S-KODA2_V0')) {
          manager.stopDeviceScan();
          console.log(device.name);
          this.setState({ UUID: device.id });

          device
            .connect()
            .then((device) => {
              //alert('Discovering services and characteristics');
              this.setState({
                show: true,
                message: 'El dispositivo se conectó correctamente',
                disabledBtn: false,
                textBlue: 'Conectado',
              });
              setTimeout(() => {
                this.setState({ activeBtn: false });
              }, 2000);
              return device.discoverAllServicesAndCharacteristics();
            })
            .then((device) => {
              this.setupNotifications(device);
            })
            .catch((error) => {
              this.setState({ activeBtn: true });
              console.log(JSON.stringify(error));
              this.setState({
                show: true,
                message: '¡Revisa si el bluetooth y el GPS esten encendidos!',
                disabledBtn: false,
                textBlue: 'Conectar',
                activeBtn: true,
                timeEnd: 0,
                activeTimer: false,
                UUID: '',
              });
            });
        }

        if (i > 20) {
          manager.stopDeviceScan();
          this.setState({
            show: true,
            message: 'No se encontró el dispositivo, intenta nuevamente.',
            disabledBtn: false,
            textBlue: 'Conectar',
          });
          this.closeMessage();
        }
        i++;
      }
    });
  }

  round(value) {
    let round = Math.round(Number(value));
    return round.toString();
  }

  percentValues(value, index) {
    let _value = value * 100;
    switch (index) {
      case 1:
        //spin
        console.log(percentSpin);
        if (value >= percentSpin) {
          this.setState({
            show: true,
            message: '¡Superaste el nivel de spin!',
          });
          this.closeMessage();
        }

        this.setState({
          circleSpin: _value / percentSpin,
        });
        break;
      case 2:
        //fuerza
        console.log(percentFuerza);
        if (value >= percentFuerza) {
          this.setState({
            show: true,
            message: '¡Superaste el nivel de fuerza!',
          });
          this.closeMessage();
        }
        this.setState({
          circleFuerza: _value / percentFuerza,
        });
        break;
      case 3:
        //velocidad
        console.log(percentVelocidad);
        if (value >= percentVelocidad) {
          this.setState({
            show: true,
            message: '¡Superaste el nivel de velocidad!',
          });
          this.closeMessage();
        }
        this.setState({
          circleVelocidad: _value / percentVelocidad,
        });
        break;
    }
  }

  random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  _isNan(value) {
    if (isNaN(value)) {
      return true;
    } else {
      return false;
    }
  }

  async setupNotifications(device) {
    device.monitorCharacteristicForService(
      this.state.service,
      this.state.chara,
      (error, characteristic) => {
        if (error) {
          console.log(JSON.stringify(error));
          return;
        }
        //console.log(base64.decode(characteristic.value))
        //console.log(characteristic.value)
        /*
        RPM: 1.73\r\n
        Fuerza: 3\r\n   0
        0.00\r\n
        Velocidad: 17.\r\n   1
        54\r\n
        2\r\n
        Estado baterÃ­a: 53%\r\n   3      
        4

        Tiempo de juego: 288\r\n
        .52 Segundo\r\n
      */
        let value = base64.decode(characteristic.value);
        try {
          if (value == 'Menu principal\r\n') {
          } else if (value == 'modojuego\r\n') {
          } else {
            if (value.includes('Tiempo de juego:')) {
              console.log(value);
              let splitTiempo = value.split('\r\n');
              //la primera parte de los segundos
              let splitTime1 = splitTiempo[0].split(': ');
              //segunda parte
              builder = splitTime1[1];
            } else if (value.includes('Segundos\r\n')) {
              console.log(value);
              let _splitTiempo = value.split(' ');
              builder += _splitTiempo[0];
              let time = Number(builder);
              this.setState({
                timeEnd: time,
                fuerza: '0',
                spin: '0',
                velocidad: '0',
                //contador: '0',
              });
              _contador = 0;
              counter = 0;
              builder = '';
            } else if (value.includes('Cargando...')) {
              console.log('cargando ', value);
              this.setState({
                show: true,
                message: 'Equipo cargando...',
                fuerza: '0',
                spin: '0',
                velocidad: '0',
                contador: 0,
              });
              _contador = 0;
              counter = 0;
              builder = '';
            } else if (value.includes('Porfavor cargue equipo')) {
              console.log('cargue equipo ', value);
              this.setState({
                show: true,
                message: 'Por favor cargue equipo...',
                fuerza: '0',
                spin: '0',
                velocidad: '0',
                contador: 0,
              });
              _contador = 0;
              counter = 0;
              builder = '';
            } else if (value.includes('Equipo cargado')) {
              console.log('cargado ', value);
              this.setState({
                show: true,
                message: 'Equipo cargado...',
                fuerza: '0',
                spin: '0',
                velocidad: '0',
                contador: 0,
              });
            } else if (value.includes('Equipo desconectado')) {
              console.log('desconectado ', value);
              this.setState({
                show: true,
                message: 'Equipo desconectado...',
                fuerza: '0',
                spin: '0',
                velocidad: '0',
                contador: 0,
              });
            } else {
              console.log(value);
              let nan = false;
              switch (counter) {
                case 0:
                  let splitLine = value.split('\r\n');
                  //console.log('splitLine ', splitLine)
                  let splitSpin = splitLine[0].split(': ');
                  //console.log('splitSpin', splitSpin)
                  if (this._isNan(this.round(splitSpin[1]))) {
                    counter = 0;
                    builder = '';
                    nan = true;
                  } else {
                    this.setState({
                      spin: this.round(splitSpin[1]),
                    });
                    this.percentValues(Number(this.state.spin), 1);
                    //aqui obtenemos la parte de fuerza
                    builder += splitLine[1];
                    counter++;
                  }

                  break;
                case 1:
                  let splitLine1 = value.split('\r\n');
                  //agregamos la otra parte de la fuerza
                  builder += splitLine1[0];
                  let splitFuerza = builder.split(': ');

                  if (this._isNan(this.round(splitFuerza[1]))) {
                    counter = 0;
                    builder = '';
                    nan = true;
                  } else {
                    this.setState({
                      fuerza: this.round(splitFuerza[1]),
                    });
                    this.percentValues(Number(this.state.fuerza), 2);
                    //aqui agregamos la parte de velocidad
                    builder = splitLine1[1];
                    counter++;
                  }

                  break;
                case 2:
                  let splitLine2 = value.split('\r\n');
                  //agregamos la otra parte de velocidad
                  builder += splitLine2[0];
                  let splitVelo = builder.split(': ');
                  //console.log(builder, " VELOCIDAD")

                  if (this._isNan(this.round(splitVelo[1]))) {
                    counter = 0;
                    builder = '';
                    nan = true;
                  } else {
                    this.setState({
                      velocidad: this.round(splitVelo[1]),
                    });
                    this.percentValues(Number(this.state.velocidad), 3);
                    counter++;
                  }

                  break;
                case 3:
                  if (nan) {
                    nan = false;
                    counter = 0;
                    builder = '';
                  } else {
                    let splitBater3 = value.split(': ');
                    this.setState({
                      bateria: splitBater3[1],
                      iconBattery: Number(splitBater3[1]),
                    });
                    counter++;
                  }

                  break;
                case 4:
                  counter = 0;
                  builder = '';
                  _contador++;
                  let golpes = 'Golpe';
                  if (_contador > 1) {
                    golpes = 'Golpes';
                  }
                  this.setState({
                    contador: _contador,
                    textoGolpes: golpes,
                    getLap: true,
                  });

                  Database.InsertQueryRecords(
                    db,
                    this.state.spin,
                    this.state.fuerza,
                    this.state.velocidad,
                    this.state.timer,
                  );
                  break;
              }
            }
          }
        } catch (error) { }
      },
    );
  }

  sendData() {
    this.getData();

    if (percentSpin == 0) {
      this.setState({
        show: true,
        message: '¡Configura el tope de spin, en objetivos personales en Ajustes!',
      });
      this.closeMessage();
      return
    } else if (percentFuerza == 0) {
      this.setState({
        show: true,
        message: '¡Configura el tope de fuerza, en objetivos personales en Ajustes!',
      });
      this.closeMessage();
      return
    } else if (percentVelocidad == 0) {
      this.setState({
        show: true,
        message: '¡Configura el tope de velocidad, en objetivos personales en Ajustes!',
      });
      this.closeMessage();
      return
    }

    console.log(this.state.UUID);
    console.log(this.state.service);
    console.log(this.state.chara);

    manager
      .writeCharacteristicWithoutResponseForDevice(
        this.state.UUID,
        this.state.service,
        this.state.chara,
        this.state.textoJugar == 'Jugar' ? 'MQ==' : 'MA==',
      )
      .then((characteristic) => {
        console.log(JSON.stringify(characteristic));
        return;
      })
      .catch((error) => {
        console.log('Error 2');
        console.log(JSON.stringify(error));
        if (this.state.textoJugar == 'Jugar') {
          console.log('ceroooooooooo');
          this.setState({
            mili: 0,
            setTimer: false,
            contador: 0,
          });
        } else {
          console.log('entro ', _mili);
          this.setState({
            show: true,
            message: '¡Puedes ir a resumen para verificar tus juegos!',
            setTimer: true,
            time: _mili
          })
          _mili = 0
          this.closeMessage()
        }
        this.setState({
          textoJugar: this.state.textoJugar == 'Jugar' ? 'Fin' : 'Jugar',
          activeTimer: this.state.activeTimer == false ? true : false,
          timeEnd: this.state.textoJugar == 'Jugar' ? 0 : this.state.timeEnd,

        });
      });
  }

  navigate(navigate) {
    this.setState({ showDialog: false });
    this.props.navigation.navigate(navigate, {
      blue: this.state.textBlue,
    });
  }

  render() {
    //console.log(_mili, " render")
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{width:wp('4%'),backgroundColor: '#ffff'}}></View>
        <SafeAreaView style={StyleDashboard.container}>
          <Dialog
            visible={this.state.showDialog}
            dialogTitle={<DialogTitle title="Rendimiento..." />}
            onTouchOutside={() => {
              this.setState({ showDialog: false });
            }}>
            <DialogContent>
              <View style={StyleDashboard.separator}></View>
              <View style={StyleDashboard.separator}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => this.navigate('EfficiencyDialy')}
                  style={StyleDashboard.buttonDialy}>
                  <Text style={StyleDashboard.textButtonDialy}>
                    Rendimiento Diario
                </Text>
                </TouchableOpacity>
              </View>
              <View style={StyleDashboard.separator}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => this.navigate('EfficiencyWeek')}
                  style={StyleDashboard.buttonDialy}>
                  <Text style={StyleDashboard.textButtonDialy}>
                    Rendimiento Semanal
                </Text>
                </TouchableOpacity>
              </View>
              <View style={StyleDashboard.separator}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => this.navigate('EfficiencyMonth')}
                  style={StyleDashboard.buttonDialy}>
                  <Text style={StyleDashboard.textButtonDialy}>
                    Rendimiento Mensual
                </Text>
                </TouchableOpacity>
              </View>
            </DialogContent>
          </Dialog>

          <View style={StyleDashboard.containerUp}>
            <View style={StyleDashboard.viewDate}>
              <View style={StyleDashboard.viewRowDate}>
                <Text style={StyleDashboard.textDate}>{this.state.day}</Text>
              </View>
              <View style={StyleDashboard.viewRowTime}>
                <Text style={StyleDashboard.textTime}>Tiempo</Text>
              </View>
            </View>
            <View style={StyleDashboard.viewBatteryImage}>
              <View style={StyleDashboard.viewRowSpace}></View>
              <View style={StyleDashboard.viewBattery}>
                <View style={StyleDashboard.viewPaddingBatery}>
                  <Icon name={'battery'} size={hp('2%')} />
                </View>
                <Text style={StyleDashboard.textBattery}>
                  {this.state.bateria}
                </Text>
              </View>
              <View style={StyleDashboard.viewImage}>
                <Image
                  style={StyleDashboard.imageLogo}
                  source={IMAGES.skodaNegro}></Image>
              </View>
            </View>
          </View>

          <View style={StyleDashboard.containerCounter}>
            <View style={StyleDashboard.viewCounter}>
              {this.state.setTimer ? (
                <Text style={StyleDashboard.timer}>
                  {this.state.time}
                </Text>
              ) : (
                <Stopwatch
                  msecs
                  start={this.state.activeTimer}
                  // To start
                  reset={!this.state.activeTimer}
                  // To reset
                  options={options}
                  // Options for the styling
                  //startTime={this.state.timeEnd}
                  getTime={(time) => {
                    if (time != '') {
                      _mili = time.toString();
                    }

                    if (this.state.getLap) {
                      this.setState({
                        timer: time.toString(),
                        getLap: false,
                      });
                    }

                    if (this.state.setTimer) {
                      console.log(_mili, ' mili');
                      this.setState({
                        setTimer: false,
                      });
                      //console.log(mili);
                    }
                  }}
                />
              )}
            </View>
            <View style={StyleDashboard.viewPlay}>
              <TouchableOpacity
                style={StyleDashboard.play}
                activeOpacity={0.8}
                onPress={() => this.sendData()}
                disabled={this.state.activeBtn}
              >
                <Text style={StyleDashboard.textPlay}>
                  {this.state.textoJugar}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={StyleDashboard.spacer}></View>

          <View style={StyleDashboard.containerActivity}>
            <View style={StyleDashboard.viewActivity}>
              <Text style={StyleDashboard.textActivity}>Actividad</Text>
            </View>
            <View style={StyleDashboard.viewResume}>
              <TouchableOpacity
                style={{}}
                activeOpacity={0.8}
                onPress={() => this.setState({ showDialog: true })}>
                <Text style={StyleDashboard.textResume}>Ver resumen</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={StyleDashboard.spacer2}></View>

          <View style={StyleDashboard.containerResume}>
        
            <View style={StyleDashboard.viewStrong}>
              <View style={StyleDashboard.viewSpaceStrong}></View>
              <View style={StyleDashboard.viewStrongSpin}>
                <Text style={StyleDashboard.textStrog}>Fuerza</Text>
                <AnimatedCircularProgress
                  size={hp('19%')}
                  width={hp('3%')}
                  fill={this.state.circleFuerza}
                  tintColor={Globals.GREEN}
                  backgroundColor={Globals.SHADOW}
                  rotation={360}
                  style={{ backgroundColor: '#ffff', borderRadius: hp('19%') }}>
                  {() => (
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#ffff',
                      }}>
                      <Text style={StyleDashboard.textPercentageSpin}>
                        {this.state.fuerza}
                      </Text>
                    </View>
                  )}
                </AnimatedCircularProgress>
              </View>
              <View style={StyleDashboard.viewBeat}>
                <TouchableOpacity style={StyleDashboard.beat} activeOpacity={0.8}>
                  <Text style={StyleDashboard.textBeat}>
                    {this.state.contador}
                  </Text>
                  <Text style={StyleDashboard.textNumberBeat}>
                    {this.state.textoGolpes}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={StyleDashboard.viewSpinVelo}>
              <View style={StyleDashboard.viewSpinRow}>
                <Text style={StyleDashboard.textSpin}>Spin</Text>
                <AnimatedCircularProgress
                  size={hp('19%')}
                  width={hp('3%')}
                  fill={this.state.circleSpin}
                  tintColor={Globals.GREEN}
                  backgroundColor={Globals.SHADOW}
                  rotation={360}
                  style={{ backgroundColor: '#ffff', borderRadius: hp('19%') }}>
                  {() => (
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#ffff',
                      }}>
                      <Text style={StyleDashboard.textPercentageSpin}>
                        {this.state.spin}
                      </Text>
                      <Text style={StyleDashboard.textRPM}>RPM</Text>
                    </View>
                  )}
                </AnimatedCircularProgress>
              </View>
              <View style={StyleDashboard.viewVeloRow}>
                <AnimatedCircularProgress
                  size={hp('19%')}
                  width={hp('3%')}
                  fill={this.state.circleVelocidad}
                  tintColor={Globals.GREEN}
                  backgroundColor={Globals.SHADOW}
                  rotation={360}
                  style={{ backgroundColor: '#ffff', borderRadius: hp('19%') }}>
                  {() => (
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#ffff',
                      }}>
                      <Text style={StyleDashboard.textPercentageVelo}>
                        {this.state.velocidad}
                      </Text>
                      <Text style={StyleDashboard.textKmH}>KM/h</Text>
                    </View>
                  )}
                </AnimatedCircularProgress>
                <Text style={StyleDashboard.textSpin}>Velocidad</Text>
              </View>
            </View>
          </View>

          <View style={StyleDashboard.containerBottom}>

            <View style={StyleDashboard.viewBtnBlue}>
              <TouchableOpacity
                style={StyleDashboard.touchBlue}
                activeOpacity={0.8}
                onPress={() => this.scann()}
                disabled={this.state.disabledBtn}>
                <Icon name="bluetooth-b" size={hp('4%')} color={Globals.SALMON} />
                <Text style={StyleDashboard.textBlue}>{this.state.textBlue}</Text>
              </TouchableOpacity>
            </View>
            <View style={StyleDashboard.viewBtnSettings}>
              <TouchableOpacity
                style={StyleDashboard.touchSettings}
                activeOpacity={0.8}
                onPress={() => this.props.navigation.navigate('Settings')}
                disabled={this.state.disabledBtn}>
                <Icon name="cog" size={hp('4%')} color={Globals.SALMON} />
                <Text style={StyleDashboard.textSettings}>Ajustes</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Snackbar
            visible={this.state.show}
            textMessage={(
              <Text style={{ fontFamily: 'DINPro-Bold' }}>
                {this.state.message}
              </Text>
            )}
            actionHandler={() => {
              this.setState({ show: false });
            }}
            actionText="Cerrar"
            backgroundColor={Globals.SALMON}
            accentColor={'#FFFF'}
            messageColor={'#FFFFFF'}
          />
        </SafeAreaView>
        <View style={{width:wp('4%'),backgroundColor: '#ffff',}}></View>
      </View>

    );
  }
}

const options = {
  text: {
    fontFamily: 'DINPro-Bold',
    fontSize: hp('4.7%'),
    color: '#ffff',
  },
};
