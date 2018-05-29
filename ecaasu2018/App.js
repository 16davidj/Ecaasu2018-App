import React from 'react';
import {Alert, AsyncStorage, StyleSheet, Text, View, Image, FlatList, AppRegistry, StatusBar} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
import * as firebase from 'firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {HomeScreen} from './components/HomeScreen';
import {InfoScreen} from './components/Info';
import {ScheduleScreen} from './components/Schedule';
import {EventScreen} from './components/EventScreen';

const firebaseConfig = {
  apiKey: "AIzaSyCLjvrwzPU4QVq8Op3Ax4edOW27VtLM-qU",
  authDomain: "ecaasu2018.firebaseapp.com",
  databaseURL: "ecaasu2018.firebaseio.com/",
  storageBucket: "ecaasu2018.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const NUM_TIME_SLOTS = 15;
const NUM_EVENTS = 86;

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      events: [],
      announcements: [],
      schedule: Array(NUM_TIME_SLOTS).fill(-1), // each value is the id of event scheduled
      isScheduled: Array(NUM_EVENTS).fill(false), // t/f if event is scheduled
      callBacks: Array(NUM_TIME_SLOTS).fill(null) // callbacks to update state after removal from schedule
    };
    this.eventsRef = firebaseApp.database().ref("events");
    this.announcementsRef = firebaseApp.database().ref("announcements");
    this.toggle_favorite = this.toggle_favorite.bind(this);
    this.add_to_schedule = this.add_to_schedule.bind(this);
    this.remove_from_schedule = this.remove_from_schedule.bind(this);
  }

  toggle_favorite(id) {
    let ind = this.state.favorites.indexOf(id);
    let arr_copy = this.state.favorites.splice(0);

    if (ind != -1) {
      arr_copy.splice(ind,1);
    } else {
      arr_copy.push(id);
    }
    this.setState({favorites: arr_copy}, () => this.storeFavoriteList());
  }

  add_to_schedule(id, addCallback, removeCallback) {
    let evt = this.state.events[id];
    if(this.state.schedule[evt.timeSlot] != -1) {
      Alert.alert(
        "Oops",
        "You already have an event in this time slot. Place this event in schedule anyways?",
        [
          {text: 'Yes', onPress: () => {
            console.log("pressed yes");
            let schedule_copy = this.state.schedule.splice(0);
            let issch_copy = this.state.isScheduled.splice(0);

            // remove previous event
            issch_copy[schedule_copy[evt.timeSlot]] = false;
            this.state.callBacks[evt.timeSlot]();

            // add current event
            issch_copy[id] = true;
            schedule_copy[evt.timeSlot] = id;
            addCallback();

            let cb_copy = this.state.callBacks.splice(0);
            cb_copy[evt.timeSlot] = removeCallback;

            this.setState({
              schedule: schedule_copy,
              isScheduled: issch_copy,
              callBacks: cb_copy
            });
            this.storeSchedule();
          }},
          {text: 'Cancel', onPress: () => {}}
        ],
        { cancelable: false }
      );
    } else {
      var schedule_copy = this.state.schedule.splice(0);
      schedule_copy[evt.timeSlot] = id;

      var issch_copy = this.state.isScheduled.splice(0);
      issch_copy[id] = true;
      addCallback();

      var cb_copy = this.state.callBacks.splice(0);
      cb_copy[evt.timeSlot] = removeCallback;

      this.setState({
        schedule: schedule_copy,
        isScheduled: issch_copy,
        callBacks: cb_copy
      }, () => this.storeSchedule());
    }
  }

  remove_from_schedule(id) {
    let evt = this.state.events[id];
    if(this.state.schedule[evt.timeSlot] == id) {
      let schedule_copy = this.state.schedule.splice(0);
      let issch_copy = this.state.isScheduled.splice(0);

      schedule_copy[evt.timeSlot] = -1;
      issch_copy[id] = false;

      this.setState({
        schedule: schedule_copy,
        isScheduled: issch_copy
      }, () => this.storeSchedule());

      console.log("removed from scheudle");
      return true;
    }
    if(this.state.isScheduled[id]) {
      console.error("isScheduled has item scheduled but schedule doesn't");
    }
    return false;
  }


  get_favorite_events() {

  }

  async load_favorites() {
    try {
      let response = await AsyncStorage.getItem('favorites');
      let listOfItems = await JSON.parse(response) || [];
      this.setState({
        favorites: listOfItems
      });
    } catch (error) {
      console.error(error);
    }
  }

  async load_schedule() {
    try {
      let response = await AsyncStorage.getItem('schedule');
      let def = {schedule: Array(NUM_TIME_SLOTS).fill(-1), isScheduled: Array(NUM_EVENTS).fill(false)};
      let listOfItems = await JSON.parse(response) || def;
      if( listOfItems.schedule.length != NUM_TIME_SLOTS 
        || listOfItems.isScheduled.length != NUM_EVENTS) {
        listOfItems = def;
      }
      this.setState({
        schedule: listOfItems.schedule,
        isScheduled: listOfItems.isScheduled,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async storeFavoriteList() {
    await AsyncStorage.setItem('favorites', JSON.stringify(this.state.favorites));
  }

  async storeSchedule() {
    let saveVal = {
      schedule: this.state.schedule,
      isScheduled: this.state.isScheduled
    };

    await AsyncStorage.setItem('schedule', JSON.stringify(saveVal));
  }

  listenForEvents(eventsRef) {
    eventsRef.on('value', (snapshot) => {
      console.log("updating events");
      var items = [];
      snapshot.forEach( (child) => {
        items.push({
          key:         child.key,
          title:       child.val().title,
          location:    child.val().location,
          speaker:     child.val().speaker,
          timeSlot:    child.val().timeSlot,
          description: child.val().description
        });
      });
      this.setState({
        events: items
      });
    });
  }

  listenForAnnouncements(announcementsRef) {
    announcementsRef.on('value', (snapshot) => {   
      console.log("updating announcements");   
      var announcements = [];
      snapshot.forEach( (child) => {
        announcements.push({
          key: child.key,
          title: child.val().title,
          message: child.val().message,
          timeStamp: child.val().timestamp,
        });
      });

      // reverse announcements:
      var rev_announcements = [];
      while(announcements.length > 0) {
        rev_announcements.push(announcements.pop());
      }

      this.setState({
        announcements: rev_announcements
      })
    })
  }

  componentDidMount() {
    this.load_favorites();
    this.load_schedule();
    this.listenForEvents(this.eventsRef);
    this.listenForAnnouncements(this.announcementsRef);
  }

  render() {
    if (this.state.favorites == null) {
      return null;
    }
    if (this.state.events == null){
      return null;
    }

    return <RootTabs screenProps=
        {{
          favorites: this.state.favorites,
          events: this.state.events,
          announcements: this.state.announcements,
          schedule: this.state.schedule,
          isScheduled: this.state.isScheduled,
          addToSchedule: this.add_to_schedule,
          removeFromSchedule: this.remove_from_schedule,
          toggle: this.toggle_favorite,
        }}
      />;
  }
}

const RootTabs = TabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Home',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-home' : 'ios-home-outline'}
          size={26}
          style={{ color: 'white' }}
        />
      ),
    },
  },
  Events: {
    screen: props => (<EventScreen {...props}/>),
    navigationOptions: {
      title: 'Program',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-list' : 'ios-list-outline'}
          size={26}
          style={{ color: 'white' }}
        />
      ),
    }
  },
  Schedule: {
    screen: ScheduleScreen,
    navigationOptions: {
      title: 'Schedule',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-calendar' : 'ios-calendar-outline'}
          size={26}
          style={{ color: 'white' }}
        />
      ),
    },
  },
  Info: {
    screen: InfoScreen,
    navigationOptions: {
      title: 'Info',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-information' : 'ios-information-circle'}
          size={26}
          style={{ color: 'white' }}
        />
      ),
    },
  },
},
{
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    style: {
      backgroundColor: '#ed1f24',
    },
  },
  initialRouteName: 'Home',
  swipeEnabled: false,
  lazyLoad: true,
  animationEnabled: false,
});