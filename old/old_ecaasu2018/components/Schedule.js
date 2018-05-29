import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, FlatList} from 'react-native';
import {ListItem, Button} from "react-native-elements";
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

export default class Schedule extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Schedule',
    drawerIcon: ({tintColor}) => (<MaterialIcon name="schedule" size={25} color = 'dodgerblue'/>)
  };
  render() {
    return(
      <View> </View>
    );
  }
}

AppRegistry.registerComponent('Schedule', () => Schedule);
