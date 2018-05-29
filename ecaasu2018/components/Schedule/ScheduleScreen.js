import React from 'react';
import {FlatList, SectionList, Text, View, Image, ScrollView, TouchableOpacity, Linking} from 'react-native';
import {TabNavigator, StackNavigator, NavigationActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import EventObj from '../EventObj/EventObj.js'
import ScheduleObj from './ScheduleObj.js';

import {TIMESLOTS} from '../../data/times.js';
import {FIXED_EVENTS} from './FixedEvents.js';


class ScDay1 extends React.Component {
  render() {
    return (
      <View>
        <FlatList
          data={FIXED_EVENTS.friday}
          renderItem={({item}) => (
            <ScheduleObj
              navigation={this.props.navigation}
              startTime={item.scheduleMarker}
              >
              <EventObj
                {...item}
                added = {true}
                scheduled = {true}
                fixed={true}
              />
            </ScheduleObj>)}
        />
      </View>
    );
  }
}

var lunch = (
  <EventObj
    title = "Lunch"
    timeSlot ={7}
    location= "Physical Sciences Building Atrium, Klarman Hall Atrium"
    description = "Lunchtime! Your name card should have an “element” at the upper right corner. If you have Air or Earth, go to Physical Sciences Building; if you have Fire or Water, go to Klarman."
    added = {true}
    deletable = {false}
    scheduled = {true}
    speaker = ""
    fixed = {true}
  />);
var networkFairStarts = (
  <EventObj
    title = "Networking Fair Starts"
    timeSlot = {8}
    location = "Klarman Hall Atrium"
    description = "Got some time between lunch, workshops, or caucuses? Come check out our networking fair, which will be running from 12:00pm-4:30pm in Klarman Hall Atrium. There will also be a dedicated time for attendees to check out the fair at 3:30pm!"
    added = {true}
    deletable = {false}
    scheduled = {true}
    speaker = ""
    fixed = {true}
  />);

class ScDay2 extends React.Component {
  constructor(props){
    super(props);
    this.renderUserBlocks = this.renderUserBlocks.bind(this);
    this.removeEventFromSchedule = this.removeEventFromSchedule.bind(this);
  }

  removeEventFromSchedule(eventId) {
    const {nav, screenProps} = this.props;
    return screenProps.removeFromSchedule(eventId);
  }

  renderUserBlocks(slotInd, slotTitle) {
    var content = null;
    if(this.props.events.length == 0 || this.props.schedule[slotInd] == -1) {
      content = null;
    } else {
      let evt = this.props.events[this.props.schedule[slotInd]];
      content = (
        <EventObj
          title = {evt.title}
          timeSlot = {evt.timeSlot}
          speaker = {evt.speaker}
          description = {evt.description}
          location = {evt.location}
          added = {true}
          scheduled = {true}
          onRemove = {() => this.removeEventFromSchedule(evt.key)}
        />);
    }

    return (
      <ScheduleObj
        navigation={this.props.navigation}
        timeSlot = {slotInd}
        startTime={slotTitle}>
        {content}
      </ScheduleObj>
    );
  }

  render() {
    return (
      <View>
        <FlatList
          data={FIXED_EVENTS.saturdayAM}
          renderItem={({item}) => (
            <ScheduleObj
              navigation={this.props.navigation}
              startTime={item.scheduleMarker}>
              <EventObj
                {...item}
                added = {true}
                fixed={true}
                scheduled = {true}
              />
            </ScheduleObj>)}
        />

        {this.renderUserBlocks(5, "9:00 AM  -- Workshops Block 1")}
        {this.renderUserBlocks(6, "10:00 AM -- Workshops Block 2")}

        <ScheduleObj
          navigation={this.props.navigation}
          startTime={"11:00 AM"}
        >
          {lunch}
        </ScheduleObj>
        <ScheduleObj
          navigation={this.props.navigation}
          startTime={"12:00 PM"}
        >
          {networkFairStarts}
        </ScheduleObj>

        {this.renderUserBlocks(9, "1:00 PM  -- Workshops Block 3")}
        {this.renderUserBlocks(10, "2:00 PM  -- Caucus ")}

        <FlatList
          data={FIXED_EVENTS.saturdayPM}
          renderItem={({item}) => (
            <ScheduleObj
              navigation={this.props.navigation}
              startTime={item.scheduleMarker}>
              <EventObj
                {...item}
                added = {true}
                fixed={true}
                scheduled = {true}
              />
            </ScheduleObj>)}
        />
      </View>
    );
  }
}

class BothDays extends React.Component {
  render() {
    const {navigation, screenProps} = this.props;

    if(screenProps == null) {
      return null;
    }

    return (
      <View style={styles.listContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Personal Schedule</Text>
        </View>

        <ScrollView>
          <View style={styles.dividerContainer}>
            <Text style={styles.dividerHeader}> Friday </Text>
          </View>
          <ScDay1 navigation = {navigation} />


          <View style={styles.dividerContainer}>
            <Text style={styles.dividerHeader}> Saturday </Text>
          </View>
          <ScDay2
            schedule={screenProps.schedule}
            favorites={screenProps.favorites}
            events={screenProps.events}
            navigation = {navigation}
            screenProps = {screenProps}
          />
        </ScrollView>
      </View>
    );
  }
}

class SectionHeader extends React.Component {
  render() {
    return (
      <View style={styles.dividerContainer}>
        <Text style={styles.dividerHeader}>{this.props.title}</Text>
      </View>
    );
  }
}

class AddPage extends React.Component {
  constructor(props){
    super(props);
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.addEventToSchedule = this.addEventToSchedule.bind(this);
    this.removeEventFromSchedule = this.removeEventFromSchedule.bind(this);
  }

  addEventToSchedule(eventId, addCallback, removeCallback) {
    const {navigation, screenProps} = this.props;
    screenProps.addToSchedule(eventId, addCallback, removeCallback);
    navigation.dispatch(NavigationActions.back());
  }

  removeEventFromSchedule(eventId) {
    const {nav, screenProps} = this.props;
    return screenProps.removeFromSchedule(eventId);
  }

  toggleFavorite(eventId) {
    const {nav, screenProps} = this.props;
    screenProps.toggle(eventId);
  }

  render() {
    const {screenProps} = this.props;
    const scheduleSlot = this.props.navigation.state.params.timeSlot;

    var fav_evts = [];
    var unf_evts = [];

    screenProps.events.forEach( evt => {
      if(evt.timeSlot == scheduleSlot && !screenProps.isScheduled[evt.key]) {
        if(screenProps.favorites.includes(evt.key)) {
          fav_evts.push(evt);
        } else {
          unf_evts.push(evt);
        }
      }
    });

    return (
      <View>
        <SectionList
          renderSectionHeader={({section}) => <SectionHeader title={section.title} />}
          sections = {[
            {
              data: fav_evts,
              title: 'Favorites',
              renderItem: ({item}) => (
                <EventObj
                  id = {item.key}
                  title = {item.title}
                  speaker = {item.speaker}
                  location = {item.location}
                  description = {item.description}
                  timeSlot = {item.timeSlot}
                  added = { false }
                  favorited = { true }
                  scheduled = {true}
                  onFavorite = {() => this.toggleFavorite(item.key)}
                  onAdd = {this.addEventToSchedule}
                  onRemove = {() => this.removeEventFromSchedule(item.key)}
                />)
            },
            {
              data: unf_evts,
              title: 'Other',
              renderItem: ({item}) => (
                <EventObj
                  id = {item.key}
                  title = {item.title}
                  speaker = {item.speaker}
                  location = {item.location}
                  description = {item.description}
                  timeSlot = {item.timeSlot}
                  added = { false }
                  favorited = { false }
                  scheduled = {true}
                  onFavorite = {() => this.toggleFavorite(item.key)}
                  onAdd = {this.addEventToSchedule}
                  onRemove = {() => this.removeEventFromSchedule(item.key)}
                />)
            },
          ]}
        />
      </View>
    );
  }
}

const ScheduleStack = StackNavigator({
  Schedule: {
    screen: BothDays,
    navigationOptions: { header: null}
  },
  AddPageSc: {
    screen: AddPage,
    navigationOptions: {title: "Events",},
  },
})

export default class ScheduleScreen extends React.Component {
  render() {
    const {nav, screenProps} = this.props;
    if (screenProps == null) {
      return null;
    }

    return <ScheduleStack navigation={nav} screenProps={screenProps}/>;
  }
}
