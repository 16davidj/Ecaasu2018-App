import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, AppRegistry,} from 'react-native';
import {DrawerNavigator, DrawerItems, StackNavigator} from 'react-navigation'
import {Button} from "react-native-elements";
import HomeScreen from './components/HomeScreen';
import Info from './components/Info';
import MapPage from './components/Map';
import EventList from './components/EventList';
import Schedule from './components/Schedule';
import Directory from './components/Directory';
import Profile  from './components/Profile';

const CustomContentComponent = (props) => (
  <View style = {{height: 700}}>
    <View style = {{height: 140}}>
      <Image style = {{ borderRadius: 50, width: 100, height: 100, position: 'absolute', bottom: 0, left: 20}}
           source={require('./components/IMG_7401.jpg')}
      />
      <Text style = {{fontSize: 20, fontWeight: 'bold', position: 'absolute', bottom: 60, right: 85}}> David Jin </Text>
      <Button style = {{position: 'absolute', top: 76, right: 68}}
        onPress={() => navigate('Profile')}
        title = 'View Profile'
        textStyle = {{color: 'blue', fontSize: 15}}
        backgroundColor = 'white'
        borderRadius = {0}
        />
    </View>
    <DrawerItems {...props} />
    <Image style = {{width: 200, height: 200, position: 'absolute', bottom: 0, left: 55}}
           source={require('./components/ecassusquare.png')}/>
  </View>
);

const NavigationStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Profile: {
      screen: Profile,
    }
  }
)

const Drawer = DrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Info: {
      screen: Info,
    },
    MapPage: {
      screen: MapPage,
    },
    EventList: {
      screen: EventList,
    },
    Schedule: {
      screen: Schedule,
    },
    Directory: {
      screen: Directory,
    },
  },
  {
      contentComponent: CustomContentComponent,
      initialRouteName: 'Home',
      drawerPosition: 'left',
  }
);

export default Drawer;
