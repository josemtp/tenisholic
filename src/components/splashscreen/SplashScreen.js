import React, {Component} from 'react';
import {View, Image, BackHandler} from 'react-native';
import {StylesSplashScreen} from '../../assets/styles/StyleSplashScreen';
import {IMAGES} from '../../assets/images/index';

export default class SplashScreen extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Login');
    }, 1000);
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    })
  }

  render() {
    return (
      <View style={StylesSplashScreen.container}>
        <View style={StylesSplashScreen.view} />
        <Image 
                style={StylesSplashScreen.image}
                source={IMAGES.skodaBlanco}></Image>
        <View style={StylesSplashScreen.view} />
      </View>
    );
  }
}
