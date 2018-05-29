import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Animated, Button} from 'react-native';
import {DrawerNavigator, DrawerItems, StackNavigator, TabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles.js';

class ScheduleObj extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: props.startTime,
      endTime: props.endTime,
      myScheduledEvent: props.eventObj,
      navigation: props.navigation,
    };
    this.changeScreen = this.changeScreen.bind(this);
  }

  changeScreen(){
    navigation = this.state.navigation;
    navigation.navigate("AddPageSc", {timeSlot: this.props.timeSlot});
  }

  render(){
    var content;
    if(this.props.children != undefined) {
      content = (
        <View>
          {this.props.children}
        </View>
      );
    } else {
      content = (
        <View style = {styles.empty}>
          <TouchableOpacity style = {styles.buttonStyle}
            onPress={this.changeScreen}>
            <View style = {styles.iconContainer}>
              <Icon name="ios-add" size={45} color = 'black'/>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style = {styles.containerTheme}>
        <Text style = {styles.time}>{this.state.startTime}</Text>
        <View style = {styles.timeline}>
          {content}
        </View>
      </View>
    );
  }
}

export default ScheduleObj;