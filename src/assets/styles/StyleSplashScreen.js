import { StyleSheet } from 'react-native';
import { Globals } from '../../globals/Globals';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const StylesSplashScreen = StyleSheet.create({
    container:{
        backgroundColor: Globals.SALMON,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    view:{
        width: wp('12%'), //50,
        height: hp('6%'), //50,
    },
    image:{
        height:90,
        width:290
    }
})