import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  BackHandler,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {StylesEfficiency} from '../../assets/styles/StylesEfficiency';
import {IMAGES} from '../../assets/images/index';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Globals} from '../../globals/Globals';
import {BarChart, Grid, XAxis} from 'react-native-svg-charts';
import Dialog, {DialogContent, DialogTitle} from 'react-native-popup-dialog';
import { StyleDashboard } from '../../assets/styles/StyleDashboard';
import {openDatabase} from 'react-native-sqlite-storage';
import {Database} from '../../database/Database';
import Snackbar from 'react-native-snackbar-component';

const db = openDatabase({name: 'SQLite.db'});

const MONTHS = [
  {
    id: 1,
    name: 'Enero',
    dateStart: '2021-01-01 00:00:00',
    dateEnd: '2021-01-31 23:59:59'
  },
  {
    id: 2,
    name: 'Febrero',
    dateStart: '2021-02-01 00:00:00',
    dateEnd: '2021-02-28 23:59:59'
  },
  {
    id: 3,
    name: 'Marzo',
    dateStart: '2021-03-01 00:00:00',
    dateEnd: '2021-03-31 23:59:59'
  },
  {
    id: 4,
    name: 'Abril',
    dateStart: '2021-04-01 00:00:00',
    dateEnd: '2021-04-30 23:59:59'
  },
  {
    id: 5,
    name: 'Mayo',
    dateStart: '2021-05-01 00:00:00',
    dateEnd: '2021-05-31 23:59:59'
  },
  {
    id: 6,
    name: 'Junio',
    dateStart: '2021-06-01 00:00:00',
    dateEnd: '2021-06-30 23:59:59'
  },
  {
    id: 7,
    name: 'Julio',
    dateStart: '2021-07-01 00:00:00',
    dateEnd: '2021-07-31 23:59:59'
  },
  {
    id: 8,
    name: 'Agosto',
    dateStart: '2021-08-01 00:00:00',
    dateEnd: '2021-08-31 23:59:59'
  },
  {
    id: 9,
    name: 'Septiembre',
    dateStart: '2021-09-01 00:00:00',
    dateEnd: '2021-09-30 23:59:59'
  },
  {
    id: 10,
    name: 'Octubre',
    dateStart: '2021-10-01 00:00:00',
    dateEnd: '2021-10-31 23:59:59'
  },
  {
    id: 11,
    name: 'Noviembre',
    dateStart: '2021-11-01 00:00:00',
    dateEnd: '2021-11-30 23:59:59'
  },
  {
    id: 12,
    name: 'Diciembre',
    dateStart: '2021-12-01 00:00:00',
    dateEnd: '2021-12-31 23:59:59'
  },
];

const Touchables = ({id, name, query}) => {
  return(
  <View>
    <View style={StyleDashboard.separator}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={query}
        style={StyleDashboard.buttonDialy}>
        <Text style={StyleDashboard.textButtonDialy}>{name}</Text>
      </TouchableOpacity>
    </View>
  </View>
  )
};

export default class EfficiencyMonth extends Component {
  constructor() {
    super();
    this.state = {
      showDialog: false,
      spin: [],
      fuerza: [],
      velo: [],
      spinTemp: 0,
      fueraTemp: 0,
      veloTemp: 0,
      days: [],
      month: '',
      show: false,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.setState({showDialog: false})
      this.props.navigation.navigate('Dashboard');

      return true;
    });
    this.setState({showDialog: true});
  }

  closeMessage() {
    setTimeout(() => {
      this.setState((_show) => ({ show: !_show }));
    }, 3000);
  }

  average(value){
    
    let temp= 0
    let average = 0
    for (var i = 0; i < value.length; i++) {
      let number = Number(value[i])
      temp += number
    }
    average = temp / value.length
    
    return average.toFixed(2)
  }

  callback = (data) => {
    if(data.length > 0){
      console.log(data)
      let days = []
      let spin = []
      let fuerza = []
      let velo = []
  
      let spinTemp = []
      let fuerzaTemp = []
      let veloTemp = []

      let item0 = data.item(0).date.split(' ')
      let item1 = item0[0].split('-')
  
      let dayNext = ''
      let _day = item1[2]
  
      for (let index = 0; index < data.length; index++) {
        let _split = data.item(index).date.split(' ')
        let split2 = _split[0].split('-')
        
        //console.log(split2[2], _day)

        if(split2[2] == _day){

          spinTemp.push(data.item(index).spin)
          fuerzaTemp.push(data.item(index).fuerza)
          veloTemp.push(data.item(index).velocidad)

          if((index+1) == data.length){
            console.log(_day)
            days.push(Number(_day))
            spin.push(Number(this.average(spinTemp)))
            fuerza.push(Number(this.average(fuerzaTemp)))
            velo.push(Number(this.average(veloTemp)))
            
            spinTemp = []
            fuerzaTemp = []
            veloTemp = []
          }
        }else{
          console.log(_day)
          days.push(Number(_day))
          spin.push(Number(this.average(spinTemp)))
          fuerza.push(Number(this.average(fuerzaTemp)))
          velo.push(Number(this.average(veloTemp)))

          spinTemp = []
          fuerzaTemp = []
          veloTemp = []
        }
        _day = split2[2]
      }
      console.log('day ', days)
      console.log('spin ', spin)
      console.log('fuerza ', fuerza)
      console.log('velo ', velo)
      this.setState({
        spin, fuerza, velo, days,
        spinTemp: this.average(spin),
        fueraTemp: this.average(fuerza),
        veloTemp: this.average(velo),
      })
    }else{
      this.setState({
        show: true,
        spin: [], 
        fuerza: [], 
        velo: [],
        days: [],
        spinTemp: 0,
        fueraTemp: 0,
        veloTemp: 0
      })
      this.closeMessage()
    }
    
  };


  query = (id) => {
    console.log(MONTHS[id-1])
    this.setState({showDialog: false, month:MONTHS[id-1].name})
    Database.SelectRecords(this.callback, db, MONTHS[id-1].dateStart, MONTHS[id-1].dateEnd)
  }

  render() {
    const renderItem = ({item}) =>{
      return (
        <Touchables 
          name= {item.name} 
          query={() => this.query(item.id)}
        />
      )
    }
    
    const dataSpin = this.state.spin;
    const dataFuerza = this.state.fuerza;
    const dataVelo = this.state.velo;

    const d = this.state.days;

    return (
      <SafeAreaView style={StylesEfficiency.container}>
        <Dialog
          visible={this.state.showDialog}
          dialogTitle={<DialogTitle title="Meses" />}
          onTouchOutside={() => {
            this.setState({showDialog: false});
          }}
          width={'0.9'}
          height={'0.6'}>
          <DialogContent
            style={{paddingBottom: 20}}>
            <View style={StyleDashboard.separator}>
              <FlatList
                data={MONTHS}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={this.query}
              />
            </View>
          </DialogContent>
        </Dialog>
        <View style={StylesEfficiency.containerUp}>
          <View style={StylesEfficiency.viewDate}>
            <View style={StylesEfficiency.viewRowDate}>
              <Text style={StylesEfficiency.textDate}>
                {this.state.month.toUpperCase()}
              </Text>
            </View>
            <View style={StylesEfficiency.viewRowTime}>
              <Text style={StylesEfficiency.textTime}>Mensual</Text>
            </View>
          </View>
          <View style={StylesEfficiency.viewBatteryImage}>
            <View style={StylesEfficiency.viewRowSpace}></View>
            <View style={StylesEfficiency.viewBattery}>
              <View style={StylesEfficiency.viewPaddingBatery}>
                <TouchableOpacity
                onPress={() => this.setState({showDialog: true})}>
                  <Icon
                    name="calendar-day"
                    size={hp('4%')}
                    color={Globals.SALMON}
                    light
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={StylesEfficiency.viewImage}>
              <Image
                style={StylesEfficiency.imageLogo}
                source={IMAGES.skodaNegro}></Image>
            </View>
          </View>
        </View>

        <View style={_StylesEfficiency.containerChart}>        
          <Text style={_StylesEfficiency.textSpin}>Spin</Text>
          <Text style={_StylesEfficiency.textAvgSpin}>{this.state.spinTemp} RPM</Text>
        </View>

        <View style={StylesEfficiency.spacer}></View>

        <View style={_StylesEfficiency.containerChart}>
          <Text style={_StylesEfficiency.textStrong}>Fuerza</Text>
          <Text style={_StylesEfficiency.textAvgStrong}>{this.state.fueraTemp} </Text>

        </View>
        <View style={StylesEfficiency.spacer}></View>

        <View style={_StylesEfficiency.containerChart}>
          <Text style={_StylesEfficiency.textVelo}>Velocidad</Text>
          <Text style={_StylesEfficiency.textAvgVelo}>{this.state.veloTemp} KM/h</Text>

        </View>
        <View style={StylesEfficiency.spacer}></View>

        <View style={StylesEfficiency.containerBottom}>
          <View style={StylesEfficiency.viewBtnBlue}>
            <TouchableOpacity
              style={StylesEfficiency.touchBlue}
              activeOpacity={0.8}
              onPress={() => ''}
              disabled={true}>
              <Icon name="bluetooth-b" size={hp('4%')} color={Globals.SALMON} />
              <Text style={StylesEfficiency.textBlue}>{this.props.route.params.blue}</Text>
            </TouchableOpacity>
          </View>
          <View style={StylesEfficiency.viewBtnSettings}>
            <TouchableOpacity
              style={StylesEfficiency.touchSettings}
              activeOpacity={0.8}
              onPress={() => this.props.navigation.navigate('Settings')}>
              <Icon name="cog" size={hp('4%')} color={Globals.SALMON} />
              <Text style={StylesEfficiency.textSettings}>Ajustes</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Snackbar
          visible={this.state.show}
          textMessage={
            <Text style={{ fontFamily: 'DINPro-Bold_13934' }}>
              No existen datos
            </Text>
          }
          actionHandler={() => {
            this.setState({ show: false });
          }}
          actionText="Cerrar"
          backgroundColor={Globals.SALMON}
          accentColor={'#FFFF'}
          messageColor={'#FFFFFF'}
        />
      </SafeAreaView>
    );
  }
}


const _StylesEfficiency = StyleSheet.create({
    containerChart:{
      flex: 1/3.5,
      backgroundColor: "#000",
      flexDirection: 'column',
      borderRadius: wp('10%'),
      height: hp('10%'),
      justifyContent: 'center'
  },
  textSpin:{
      fontFamily: 'DINPro-Bold_13934',
      fontSize: hp('3.5%'),
      color: '#fff',
      paddingTop:hp('1.4%'),
      paddingLeft:hp('3.8%'),
      
  },
  textAvgSpin:{
      fontFamily: 'DINPro-Bold_13934',
      fontSize: hp('6.2%'),
      color: Globals.GREEN,
      paddingLeft:hp('3.8%')
  },
  textStrong:{
      fontFamily: 'DINPro-Bold_13934',
      fontSize: hp('3.5%'),
      color: '#fff',
      paddingTop:hp('1.4%'),
      paddingLeft:hp('3.8%')
  },
  textAvgStrong:{
      fontFamily: 'DINPro-Bold_13934',
      fontSize: hp('6.2%'),
      color: Globals.YELLOW,
      paddingLeft:hp('3.8%')
  },
  textVelo:{
      fontFamily: 'DINPro-Bold_13934',
      fontSize: hp('3.5%'),
      color: '#fff',
      paddingTop:hp('1.4%'),
      paddingLeft:hp('3.8%')
  },
  textAvgVelo:{
      fontFamily: 'DINPro-Bold_13934',
      fontSize: hp('6.2%'),
      color: Globals.ROSE,
      paddingLeft:hp('3.8%')
  }
})