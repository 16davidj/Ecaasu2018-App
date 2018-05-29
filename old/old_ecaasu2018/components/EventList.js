import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {ListItem, Button} from "react-native-elements";
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import EventObj from './EventObj'

export default class EventList extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Events',
    drawerIcon: ({tintColor}) => (<MaterialIcon name="event" size={25} color = 'dodgerblue'/>)
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
        <View>
            <ScrollView style = {styles.container}>
              <EventObj title = "Event One: XYZ">
                <Text> testing testing testing testing testing testingtesting testing testingtesting testing testingtesting testing testingtesting testing testingtesting testing testingtesting testing testingtesting testing testingtesting testing testingtesting testing testingtesting testing testingtesting testing testingtesting testing testingtesting testing testingtesting testing testingtesting testing testingtesting testing testing </Text>
              </EventObj>
              <EventObj title = "Event Two" >
                <Text> testing testing testing </Text>
              </EventObj>
          </ScrollView>
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

AppRegistry.registerComponent('EventList', () => EventList);
