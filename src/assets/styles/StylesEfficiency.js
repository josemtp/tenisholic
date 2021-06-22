import { StyleSheet, Dimensions, Platform, PixelRatio  } from 'react-native';
import { Globals } from '../../globals/Globals';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export const StylesEfficiency = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffff',
        width: wp('100%'), //50,
        height: hp('100%'), //50,
        paddingTop: 20,
        paddingHorizontal: 20
    },
    containerUp:{
        flex: 1/8,
        flexDirection: 'row'
    },
    viewDate:{
        flex: 1/2,
        width: '30%',
        flexDirection: 'column'
    },
    viewRowDate:{
        flex:1/3,
        width: '100%',
    },
    textDate:{
        fontFamily: 'DINPro-Bold',
        fontSize: hp('2%')
    },
    viewRowTime:{
        flex:1,
        width: '100%',
    },
    textTime:{
        fontFamily: 'DINPro-Bold',
        fontSize: hp('5%')  
    },
    viewBatteryImage:{
        flex: 1/2,
        width: '30%',
        flexDirection: 'column'
    },
    viewRowSpace:{
        flex:1/5,
        width: '100%',
    },
    viewRowReverse:{
        flexDirection: 'row-reverse',
        flex:1,
        justifyContent: 'flex-start',
    },  
    viewBattery:{
        width: '100%',
        flexDirection: 'row-reverse',
        //flex: 1,
        justifyContent: 'flex-start'
    },
    viewPaddingBatery:{
        paddingTop:hp('0.3%'), 
        paddingLeft:hp('0.3%')
    },
    textBattery:{
        fontFamily: 'DINPro-Bold',
        fontSize: hp('2%')
    },
    viewImage:{
        width: '100%',
        flexDirection: 'row-reverse',
        flex: 1/3,
        alignItems: 'flex-end',
        paddingTop: hp('5%')
    },
    imageLogo:{
        height: 20,//20,
        width: 60, //55,
        resizeMode: 'contain'
    },
    containerChart:{
        flex: 1/3.5,
        backgroundColor: "#000",
        flexDirection: 'column',
        borderRadius: wp('10%'),
        height: 200,
        paddingBottom: hp('3%')
    },
    textSpin:{
        fontFamily: 'DINPro-Bold',
        fontSize: hp('3.5%'),
        color: '#fff',
        paddingTop:hp('1.4%'),
        paddingLeft:hp('3.8%'),
        
    },
    textAvgSpin:{
        fontFamily: 'DINPro-Bold',
        fontSize: hp('5%'),
        color: Globals.GREEN,
        paddingLeft:hp('3.8%')
    },
    textStrong:{
        fontFamily: 'DINPro-Bold',
        fontSize: hp('3.5%'),
        color: '#fff',
        paddingTop:hp('1.4%'),
        paddingLeft:hp('3.8%')
    },
    textAvgStrong:{
        fontFamily: 'DINPro-Bold',
        fontSize: hp('5%'),
        color: Globals.YELLOW,
        paddingLeft:hp('3.8%')
    },
    textVelo:{
        fontFamily: 'DINPro-Bold',
        fontSize: hp('3.5%'),
        color: '#fff',
        paddingTop:hp('1.4%'),
        paddingLeft:hp('3.8%')
    },
    textAvgVelo:{
        fontFamily: 'DINPro-Bold',
        fontSize: hp('5%'),
        color: Globals.ROSE,
        paddingLeft:hp('3.8%')
    },
    spacer:{
        flex: 1/80,
        width: wp('100%')
    },
    
    containerBottom:{
        flex: 1/10,
        flexDirection: 'row'
    },
    touchBlue:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewBtnBlue:{
        flex: 1/2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textBlue:{
        fontSize: hp('2.5%'),
        fontFamily: 'DINPro-Bold',
    },
    touchSettings:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewBtnSettings:{
        flex: 1/2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textSettings:{
        fontSize: hp('2.5%'),
        fontFamily: 'DINPro-Bold',
    },
    buttonDialy:{
        elevation: 8,
        backgroundColor: Globals.GREEN,
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    textButtonDialy:{
        fontSize: 18,
        fontFamily: 'DINPro-Bold'
    },
    separator:{
        paddingVertical: 10
    }
})