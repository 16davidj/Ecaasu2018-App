import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, FlatList, StatusBar} from 'react-native';
import {ListItem, Button} from "react-native-elements";
import Icon from 'react-native-vector-icons/Entypo';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({tintColor}) => (<Icon name="home" size={25} color = 'dodgerblue'/>)
  };
  render() {
    return (
      <View>
        <View style = {styles.topBar}>
          <Button style = {{position: 'absolute', top: 1, left: -15}}
            onPress={() => this.props.navigation.navigate('DrawerOpen')}
            icon =  {{name : 'list', size: 60}}
            backgroundColor = 'skyblue'
            />
        </View>
        <View style = {styles.container}>
          <Image style={{width: 250, height: 250}} source={require('./logo1profilecompress.png')}/>
        </View>
        <View style = {styles.announcements}>
          <Text style={{color: 'black', fontSize: 20}}> Announcements </Text>
        </View>
        <View style = {styles.announcementlist}>
          <FlatList data={[{key: 'Announcement: '},{key: '?!??!'},{key: 'Announcement2:'},]}
          renderItem={({item}) => (
            <ListItem
              textInputMultiline
              roundAvatar
              hideChevron
              title={<Text style = {{fontSize: 20}}> {item.key} </Text>}
              avatar= {{uri: 'https://t4.ftcdn.net/jpg/00/96/21/41/240_F_96214153_a9TWktBGdi06Ovyfl0Em2wlsro9W6faX.jpg'}}
              />
          )}
          />
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('HomeScreen', () => HomeScreen);

const styles = StyleSheet.create({
  topBar: {
    height: 75,
    backgroundColor: 'skyblue',
    flexDirection: 'row',
  },
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  announcements: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    height: 100,
  },
  announcementlist: {
    padding: 30,
  }
});
