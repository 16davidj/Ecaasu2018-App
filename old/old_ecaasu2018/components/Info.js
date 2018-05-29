import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, FlatList} from 'react-native';
import {ListItem, Button} from "react-native-elements";
import Icon from 'react-native-vector-icons/Entypo';

export default class Info extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Info',
    drawerIcon: ({tintColor}) => (<Icon name="info-with-circle" size={25} color = 'dodgerblue'/>)
  };
  render() {
    return(
      <View>
        <View style = {styles.topBar}>
          <Button style = {{position: 'absolute', top: 1, left: -15}}
            onPress={() => this.props.navigation.navigate('DrawerOpen')}
            icon =  {{name : 'list', size: 60}}
            backgroundColor = 'skyblue'
          />
          </View>
          <View style = {styles.statusBar}>
          </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
    statusBar: {
      height: 15,
      backgroundColor: 'white',
    },
    topBar: {
      height: 75,
      backgroundColor: 'skyblue',
      flexDirection: 'row',
    },
    container: {
        height: 500,
    },
    titleContainer : {
        flexDirection: 'row'
    },

    title : {
        flex: 1,
        padding: 5,
        color:'#2a2f43',
        fontWeight:'bold'
    },
    body : {
        padding     : 10,
        paddingTop  : 0
    }
});


AppRegistry.registerComponent('Info', () => Info);
