import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, FlatList} from 'react-native';
import {ListItem, Button} from "react-native-elements";
import Icon from 'react-native-vector-icons/Entypo';

export default class Directory extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Directory',
    drawerIcon: ({tintColor}) => (<Icon name="book" size={25} color = 'dodgerblue'/>)
  };
  render() {
    return(
      <View> </View>
    );
  }
}

AppRegistry.registerComponent('Directory', () => Directory);
