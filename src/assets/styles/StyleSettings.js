import { StyleSheet, Dimensions, Platform, PixelRatio  } from 'react-native';
import { Globals } from '../../globals/Globals';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const StyleSettings = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffff',
        width: wp('100%'), //50,
        height: hp('100%'), //50,
    },
    containerUp:{
        flex: 1/6,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Globals.SALMON
    },
    textAjustes:{
        fontFamily: 'DINPro-Bold_13934',
        color: '#ffff',
        fontSize: hp('5%'),  
    },
    containerAjustes:{
        flex:1/10,
        paddingHorizontal:wp('5%'),
    },
    textAjustes2:{
        fontFamily: 'DINPro-Bold_13934',
        fontSize: hp('2.3%'),  
        paddingTop: hp('3.8%')
    },
    containerEmailCon:{
        flex:1/18,
        paddingHorizontal:wp('5%'),
        flexDirection: 'row'
    },
    containerEmailCon1:{
        flex:1/18,
        paddingHorizontal:wp('5%'),
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#DADADA',
        paddingTop: hp('1.8%'),
    },
    containerEmailCon2:{
        flex:1/18,
        paddingHorizontal:wp('5%'),
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#DADADA',
        paddingTop: hp('1.8%'),
    },
    viewEmail:{
        flex: 1/2,
        flexDirection: 'column',
    },
    viewInputEmail:{
        flex: 1/2,
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    genericText:{
        fontFamily: 'DINPro-Bold_13934',
        fontSize: hp('2.5%'),  
    },
    genericText2:{
        fontFamily: 'DINPro-Bold_13934',
        fontSize: hp('2.5%'),  
        color: '#C4C4C4'
    },
    viewContentDialog:{
        paddingTop: 10,
        alignItems: 'center',
    },
    logout:{
        alignItems: 'center'
    },
    buttonDialy:{
        elevation: 8,
        backgroundColor: Globals.GREEN,
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 30,
        paddingTop: 10
    },
    textButtonDialy:{
        fontSize: hp('2.5%'),
        fontFamily: 'DINPro-Bold_13934'
    },
})