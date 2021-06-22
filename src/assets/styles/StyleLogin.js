import { StyleSheet } from 'react-native';
import { Globals } from '../../globals/Globals';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const StylesLogin = StyleSheet.create({
    container:{
        backgroundColor: Globals.SALMON,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingLeft: 40,
        paddingRight: 40
    },
    container2:{
        paddingHorizontal: wp('4.5%')
    },
    labelUser:{
        paddingBottom: 5,
        fontFamily: 'DINPro-Bold',
        fontSize: 25,
        color:"#fff"
    },
    inputUser:{
        height: hp('6%'),
        borderColor: Globals.GREEN,
        borderWidth: 3,
        backgroundColor: Globals.WHITE,
        borderRadius: 30,
        fontFamily: 'DINPro-Bold',
        color: '#000',
        paddingStart: 23,
        fontSize: hp('2.3%')
    },
    inputPassword:{
        height: hp('6%'),
        borderColor: Globals.GREEN,
        borderWidth: 3,
        backgroundColor: Globals.WHITE,
        borderRadius: 30,
        fontFamily: 'DINPro-Bold',
        color: '#000',
        paddingStart: 23,
        fontSize: hp('2.3%')
    },
    separator:{
        paddingTop: 10,
        paddingBottom: 15
    },
    viewIngresar:{
        alignItems: 'center'
    },
    buttonIngresar:{
        elevation: 8,
        backgroundColor: Globals.GREEN,
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 30,
        paddingTop: 10
    },
    textButton:{
        fontSize: hp('2.3%'),
        fontFamily: 'DINPro-Bold'
    },
    viewImage:{
        alignItems: 'center',
        paddingBottom: 30
    },
    image:{
        height:90,
        width:290
    },
    viewContentDialog:{
        paddingTop: 10,
        alignItems: 'center',
    }
})