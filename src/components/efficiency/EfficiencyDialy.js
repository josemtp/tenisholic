import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  BackHandler,
  TouchableOpacity,
  Image,
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
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Dialog, {DialogContent, DialogTitle, DialogFooter, DialogButton} from 'react-native-popup-dialog';
import {LocaleConfig} from 'react-native-calendars';
import {openDatabase} from 'react-native-sqlite-storage';
import {Database} from '../../database/Database';
import Snackbar from 'react-native-snackbar-component';

let d = []

for (let index = 0; index < 25; index++) {
  if(index % 6 == 0){
    d[index] = index + " H" 
  }else{
    d[index] = null
  }
  
}

const db = openDatabase({name: 'SQLite.db'});

LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Seotiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
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
  ],
  dayNames: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
  ],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mier', 'Jue', 'Vie', 'Sab'],
  today: "Hoy'dia",
};
LocaleConfig.defaultLocale = 'es';


export default class EfficiencyDialy extends Component {
  constructor() {
    super();
    this.state = {
      showDialog: false,
      show:false,
      data: [],
      day: '',
      rangeDate: {},
      startDate: '',
      endDate: '',
      spin: [], 
      fuerza: [], 
      velo: [],
      hours: [],
      spinTemp: 0,
      fueraTemp: 0,
      veloTemp: 0
    };
  }

  setCurrentDate(){
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year

    //'2021-08-01 00:00:00'
    let _month = month > 9 ? month : '0' + month
    let day = date > 9 ? date : '0' + date
  
    let _return = `${year}-${_month}-${day}`

    let stringStartDate = _return

    const obj = {
      [stringStartDate]: {startingDay: true, color: Globals.SALMON, endingDay: true}, 
    }

    let split1 = stringStartDate.split('-')

    let _day = this.getDay(stringStartDate).toUpperCase() + ", " +
    split1[2] + " " + LocaleConfig.locales['es'].monthNamesShort[Number(split1[1])-1].toUpperCase()

    this.setState({
      rangeDate: obj,
      startDate: stringStartDate + " 00:00:00",
      endDate: stringStartDate + " 23:59:59",
      day:_day,
      showDialog: true
    });             
  }
      

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.setState({showDialog: false});
      this.props.navigation.navigate('Dashboard');
      return true;
    });
    this.setCurrentDate()
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

  getDay(date){
    var days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    var d = new Date(date);
    var dayName = days[d.getDay()+1];
    return dayName;
  }

  callback = (data) => {
    let _spin = []
    let _fuerza = []
    let _velo = []
    for (let index = 0; index < 25; index++) {
      _spin[index] = 1
      _fuerza[index] = 1
      _velo[index] = 1
    }

    this.setState({
      spin: _spin,
      fuerza: _fuerza,
      velo: _velo
    })   

    if(data.length > 0){
      console.log(data)
      let hours = []
      let spin = []
      let fuerza = []
      let velo = []
  
      let spinTemp = []
      let fuerzaTemp = []
      let veloTemp = []

      //'2021-08-01 00:00:00'

      let item0 = data.item(0).date.split(' ')
      let item1 = item0[1].split(':')

      let _hour = item1[0]
  
      for (let index = 0; index < data.length; index++) {
        let _split = data.item(index).date.split(' ')
        let split2 = _split[1].split(':')
        
        console.log(split2[0], _hour)

        if(split2[0] == _hour){
          
          spinTemp.push(data.item(index).spin)
          fuerzaTemp.push(data.item(index).fuerza)
          veloTemp.push(data.item(index).velocidad)

          if((index+1) == data.length){
            //console.log(_hour)
            hours.push(_hour)
            spin.push(Number(this.average(spinTemp)))
            fuerza.push(Number(this.average(fuerzaTemp)))
            velo.push(Number(this.average(veloTemp)))
            
            spinTemp = []
            fuerzaTemp = []
            veloTemp = []
          }
        }else{
          console.log(_hour)
          hours.push(_hour)
          spin.push(Number(this.average(spinTemp)))
          fuerza.push(Number(this.average(fuerzaTemp)))
          velo.push(Number(this.average(veloTemp)))

          spinTemp = []
          fuerzaTemp = []
          veloTemp = []
        }
        
        _hour = split2[0]
        
      }
      console.log('hours ', hours)
      console.log('spin ', spin)
      console.log('fuerza ', fuerza)
      console.log('velo ', velo)

      for (let index = 0; index < hours.length; index++) {
        this.state.spin[Number(hours[index])] = spin[index]
        this.state.fuerza[Number(hours[index])] = fuerza[index]
        this.state.velo[Number(hours[index])] =velo[index]
      }

      this.setState({
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
        hours: [],
        spinTemp: 0,
        fueraTemp: 0,
        veloTemp: 0
      })
      this.closeMessage()
    }
    
  };

  query = () => {
    this.setState({showDialog: false})
    Database.SelectRecords(this.callback, db, this.state.startDate, this.state.endDate)
  }

  render() {
    const dataSpin = this.state.spin;
    const dataFuerza = this.state.fuerza;
    const dataVelo = this.state.velo;

    return (
      <SafeAreaView style={StylesEfficiency.container}>
        <Dialog
          visible={this.state.showDialog}
          dialogTitle={<DialogTitle title="Calendario" />}
          onTouchOutside={() => {
            this.setState({showDialog: false});
          }}
          width={'0.9'}
          footer={
            <DialogFooter>
              <DialogButton
                text="Cancelar"
                onPress={() => {
                  this.setState({showDialog: false})
                }}
              />
              <DialogButton
                text="Aceptar"
                onPress={() => {
                  this.query()
                }}
              />
            </DialogFooter>
          }>
          <DialogContent>
            <Calendar
              // Initially visible month. Default = Date()
              current={Date()}
              // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
              //minDate={'2012-05-10'}
              // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
              //maxDate={'2012-05-30'}
              // Handler which gets executed on day press. Default = undefined
              markedDates={this.state.rangeDate}
              onDayPress={(day) => {
                console.log('selected day', day);

                let stringStartDate = day.dateString
                let finalDate = day.dateString

                const obj = {
                  [stringStartDate]: {startingDay: true, color: Globals.SALMON, endingDay: true}, 
                }

                let split1 = stringStartDate.split('-')

                let _day = this.getDay(stringStartDate).toUpperCase() + ", " +
                split1[2] + " " + LocaleConfig.locales['es'].monthNamesShort[Number(split1[1])-1].toUpperCase()

                this.setState({
                  rangeDate: obj,
                  startDate: stringStartDate + " 00:00:00",
                  endDate: finalDate + " 23:59:59",
                  day:_day
                });             

              }}
              markingType={'period'}
              // Handler which gets executed on day long press. Default = undefined
              onDayLongPress={(day) => {
                console.log('selected day', day);
              }}
              // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
              monthFormat={'MMMM - yyyy'}
              // Handler which gets executed when visible month changes in calendar. Default = undefined
              onMonthChange={(month) => {
                console.log('month changed', month);
              }}
              // Hide month navigation arrows. Default = false
              //hideArrows={true}
              // Replace default arrows with custom ones (direction can be 'left' or 'right')
              //renderArrow={(direction) => (<Arrow/>)}
              // Do not show days of other months in month page. Default = false
              hideExtraDays={true}
              // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
              // day from another month that is visible in calendar page. Default = false
              disableMonthChange={true}
              // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
              firstDay={1}
              // Hide day names. Default = false
              //hideDayNames={true}
              // Show week numbers to the left. Default = false
              showWeekNumbers={true}
              // Handler which gets executed when press arrow icon left. It receive a callback can go back month
              onPressArrowLeft={(subtractMonth) => subtractMonth()}
              // Handler which gets executed when press arrow icon right. It receive a callback can go next month
              onPressArrowRight={(addMonth) => addMonth()}
              // Disable left arrow. Default = false
              //disableArrowLeft={true}
              // Disable right arrow. Default = false
              //disableArrowRight={true}
              // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
              disableAllTouchEventsForDisabledDays={true}
              // Replace default month and year title with custom one. the function receive a date as parameter.
              //renderHeader={(date) => {}}
              // Enable the option to swipe between months. Default = false
              enableSwipeMonths={true}
            />
          </DialogContent>
        </Dialog>
        <View style={StylesEfficiency.containerUp}>
          <View style={StylesEfficiency.viewDate}>
            <View style={StylesEfficiency.viewRowDate}>
              <Text style={StylesEfficiency.textDate}>
                {this.state.day}
              </Text>
            </View>
            <View style={StylesEfficiency.viewRowTime}>
              <Text style={StylesEfficiency.textTime}>Diario</Text>
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

        <View style={StylesEfficiency.containerChart}>
          <Text style={StylesEfficiency.textSpin}>Spin</Text>
          <Text style={StylesEfficiency.textAvgSpin}>{this.state.spinTemp} RPM</Text>
          <BarChart
            style={{
              height: hp('10%'),
              width: wp('83%'),
              paddingLeft: hp('3.8%'),
            }}
            data={dataSpin}
            svg={{
              fill: `rgb(${Globals.GREEN_RGB.R}, ${Globals.GREEN_RGB.G}, ${Globals.GREEN_RGB.B})`,
            }}
            contentInset={{top: 10, bottom: 20}}
            animate={true}
            animationDuration={300}>
            <Grid />
          </BarChart>
          <XAxis
            style={{
              height: 1,
              width: wp('83%'),
              color: '#ffff',
              paddingLeft: hp('3.8%'),
            }}
            data={d}
            formatLabel={(value, index) => d[index]}
            contentInset={{left: 20, right: 20}}
            svg={{fontSize: 10, fill: 'white', fontFamily: 'DINPro-Bold_13934'}}
          />
        </View>
        <View style={StylesEfficiency.spacer}></View>

        <View style={StylesEfficiency.containerChart}>
          <Text style={StylesEfficiency.textStrong}>Fuerza</Text>
          <Text style={StylesEfficiency.textAvgStrong}>{this.state.fueraTemp} </Text>
          <BarChart
            style={{
              height: hp('10%'),
              width: wp('83%'),
              paddingLeft: hp('3.8%'),
            }}
            data={dataFuerza}
            svg={{
              fill: `rgb(${Globals.YELLOW_RGB.R}, ${Globals.YELLOW_RGB.G}, ${Globals.YELLOW_RGB.B})`,
            }}
            contentInset={{top: 10, bottom: 20}}
            animate={true}
            animationDuration={300}>
            <Grid />
          </BarChart>
          <XAxis
            style={{
              height: 1,
              width: wp('83%'),
              color: '#ffff',
              paddingLeft: hp('3.8%'),
            }}
            data={d}
            formatLabel={(value, index) => d[index]}
            contentInset={{left: 20, right: 20}}
            svg={{fontSize: 10, fill: 'white', fontFamily: 'DINPro-Bold_13934'}}
          />
        </View>
        <View style={StylesEfficiency.spacer}></View>

        <View style={StylesEfficiency.containerChart}>
          <Text style={StylesEfficiency.textVelo}>Velocidad</Text>
          <Text style={StylesEfficiency.textAvgVelo}>{this.state.veloTemp} KM/h</Text>
          <BarChart
            style={{
              height: hp('10%'),
              width: wp('83%'),
              paddingLeft: hp('3.8%'),
            }}
            data={dataVelo}
            svg={{
              fill: `rgb(${Globals.ROSE_RGB.R}, ${Globals.ROSE_RGB.G}, ${Globals.ROSE_RGB.B})`,
            }}
            contentInset={{top: 10, bottom: 20}}
            animate={true}
            animationDuration={300}>
            <Grid />
          </BarChart>
          <XAxis
            style={{
              height: 1,
              width: wp('83%'),
              color: '#ffff',
              paddingLeft: hp('3.8%'),
            }}
            data={d}
            formatLabel={(value, index) => d[index]}
            contentInset={{left: 20, right: 20}}
            svg={{fontSize: 10, fill: 'white', fontFamily: 'DINPro-Bold_13934'}}
          />
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
