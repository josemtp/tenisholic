import { StyleSheet, Dimensions, Platform, PixelRatio  } from 'react-native';
import { Globals } from '../../globals/Globals';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export const StyleDashboard = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffff',
        width: wp('100%'), //50,
        height: hp('100%'), //50,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    container2:{
        paddingHorizontal: wp('4.5%')
    },
    containerUp:{
        flex: 1/8,
        flexDirection: 'row',
        //paddingHorizontal: wp('4.5%')
    },
    viewDate:{
        flex: 1/1,
        width: '30%',
        flexDirection: 'column'
    },
    viewRowDate:{
        flex:1/4,
        width: '100%',
        //paddingTop:10
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
        fontSize: hp('5.5%')  
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
        flex: 1/5,
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
    },
    imageLogo:{
        height: 20,//20,
        width: 60, //55,
        resizeMode: 'contain'
    },
    containerCounter:{
        flex: 1/9,
        backgroundColor: Globals.SALMON,
        flexDirection: 'row',
        borderRadius: wp('10%'),
    },
    viewCounter:{
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: wp('5%'),
    },
    textCounter:{
        fontFamily: 'DINPro-Bold',
        fontSize: hp('5%'),
        color: '#ffff'
    },
    viewPlay:{
        flex: 1/3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    play:{
        width: hp('6%'), //50,
        height: hp('6%'), //50,
        borderRadius: hp('6%'),
        backgroundColor: '#ffff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Globals.GREEN 
    },
    textPlay:{
        fontFamily: 'DINPro-Bold',
        fontSize: hp('2%')  
    },
    spacer:{
        flex: 1/80,
        width: wp('100%')
    },
    containerActivity:{
        flex: 1/10,
        flexDirection: 'row',
        //paddingLeft:wp('4.5%')
    },
    viewActivity:{
        flex: 1/1.10,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    textActivity:{
        fontFamily: 'DINPro-Bold',
        fontSize: hp('5.7%')  
    },
    viewResume:{
        paddingTop: hp('1%'),
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    textResume:{
        fontFamily: 'DINPro-Bold',
        fontSize: hp('2.2%')  
    },
    spacer2:{
        flex: 1/10000,
        width: wp('100%')
    },
    containerResume:{
        flex: 1/1.50,
        backgroundColor: Globals.SALMON,
        flexDirection: 'row',
        borderRadius: wp('10%'),
        //width:wp('95%')
    },
    viewStrong:{
        flex:1/2,
        flexDirection: 'column',
    },
    viewSpaceStrong:{
        flex:1/4,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop:hp('9%')
    },
    textStrog:{
        fontSize: hp('3.5%'),
        fontFamily: 'DINPro-Bold',
        color: '#ffff'
    },
    viewStrongSpin:{
        flex:1/2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewBeat:{
        flex: 1/3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight:hp('10%'),
        paddingTop:hp('9%')
    },
    beat:{
        width: hp('8.5%'), //50,
        height: hp('8.5%'), //50,
        borderRadius: hp('8.5%'),
        backgroundColor: '#ffff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Globals.GREEN 
    },
    textBeat:{
        fontFamily: 'DINPro-Bold',
        fontSize: hp('3%')  
    },
    textNumberBeat:{
        fontFamily: 'DINPro-Bold',
        fontSize: hp('2%')  
    },
    viewSpinVelo:{
        flex:1/2,
        flexDirection: 'column',
    },
    viewSpin:{
        alignItems: 'center'
    },
    textSpin:{
        fontSize: hp('3.5%'),
        fontFamily: 'DINPro-Bold',
        color: '#ffff'
    },
    viewSpinRow:{
        flex: 1/2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textPercentageSpin:{
        fontSize: hp('5.8%'),
        fontFamily: 'DINPro-Bold',
    },
    textRPM:{
        fontSize: hp('2.5%'),
        fontFamily: 'DINPro-Bold',
    },
    viewVeloRow:{
        flex: 1/2,
        flexDirection: 'row'
    },
    viewVelo:{
        alignItems: 'center'
    },
    textVelo:{
        fontSize: hp('3.5%'),
        fontFamily: 'DINPro-Bold',
        color: '#ffff'
    },
    viewVeloRow:{
        flex: 1/2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textPercentageVelo:{
        fontSize: hp('5.8s%'),
        fontFamily: 'DINPro-Bold',
    },
    textKmH:{
        fontSize: hp('2.5%'),
        fontFamily: 'DINPro-Bold',
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
        //elevation: 8,
        backgroundColor: Globals.GREEN,
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    textButtonDialy:{
        fontSize: hp('2.5%'),
        fontFamily: 'DINPro-Bold'
    },
    separator:{
        paddingBottom: 20
    },
    timer: {
        fontFamily: 'DINPro-Bold',
        fontSize: hp('5.1%'),
        color: '#ffff',
    }
})