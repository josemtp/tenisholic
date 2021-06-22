import React, {Component} from 'react';
import {View, Text, StyleSheet, BackHandler} from 'react-native';
import {StyleDashboard} from '../../assets/styles/StyleDashboard';

let i = 0;
let e = 0;
let time = '';
let interval = '';

export default class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
        initial: 'state',
      timer: '00:00:00.0',
    };
    
  }

  componentDidMount() {
    //this.start = this.start.bind(this);
    //this.stop = this.stop.bind(this);
    clearInterval(interval);
  }

  componentWillReceiveProps(nextProps) {
    // update original states
    
    this.setState({
      timer: nextProps.timer,
    });
    }


  timeConversion(millisec) {
    var seconds = (millisec / 60).toFixed(1);
    return seconds;
  }

  getTime(value) {
    let time = new Date(value * 1000).toISOString().substr(11, 8);
    return time.toString();
  }


  

  stop () {
    clearInterval(interval)
  };

  render() {
    return <Text style={StyleDashboard.textCounter}>{this.state.timer}</Text>;
  }
}
