import React from 'react';
import {Text, View, Image, ScrollView, TouchableOpacity, Linking, FlatList} from 'react-native';
import {ListItem, Button} from "react-native-elements";
import Icon from 'react-native-vector-icons/Entypo';
import {EventObj} from '../EventObj';
import {StackNavigator} from 'react-navigation';
import styles from './styles';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';


class HubScreen extends React.Component {
  render() {
    return (
      <ScrollView>
        <View style={{paddingTop: 50}}>
          <Text style={styles.header}> Programming List by Section:</Text>
        </View>
        <View style={styles.buttonListContainer}>
          <TouchableOpacity
            style = {styles.roundContainer}
            activeOpacity = {0.5}
            onPress = {() => this.props.navigation.navigate('Block1')}
          >
            <Text style = {{textAlign: 'center', fontSize: 20}}> Block 1 Workshops</Text>
          </TouchableOpacity>  
          <TouchableOpacity
            style = {styles.roundContainer}
            activeOpacity = {0.5}
            onPress = {() => this.props.navigation.navigate('Block2')}
          >
            <Text style = {{textAlign: 'center', fontSize: 20}}> Block 2 Workshops</Text>
          </TouchableOpacity>  
          <TouchableOpacity
            style = {styles.roundContainer}
            activeOpacity = {0.5}
            onPress = {() => this.props.navigation.navigate('Block3')}
          >
            <Text style = {{textAlign: 'center', fontSize: 20}}> Block 3 Workshops</Text>
          </TouchableOpacity>  
          <TouchableOpacity
            style = {styles.roundContainer}
            activeOpacity = {0.5}
            onPress = {() => this.props.navigation.navigate('Caucuses')}
          >
            <Text style = {{textAlign: 'center', fontSize: 20}}> Caucuses </Text>
          </TouchableOpacity>  
        
          <TouchableOpacity
            style={{height:40, alignSelf: 'center', justifyContent: 'center'}}
            onPress={() => Linking.openURL('https://goo.gl/forms/aWrlefZB7zyciNOz1')}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <MCIcons
                  name={'lead-pencil'}
                  size={20}
                />
                <View style={{margin:5, borderLeftWidth:1, borderColor:'black'}}>
                  <Text style={{color: 'blue'}}>
                    {" "}Did you like the workshops? {"\n "}Leave some feedback!
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
        </View>

      </ScrollView>
    );
  }
}

class WSScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduled: props.screenProps.isScheduled
    };

    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.addEventToSchedule = this.addEventToSchedule.bind(this);
    this.removeEventFromSchedule = this.removeEventFromSchedule.bind(this);
  }

  isFavorited(eventId) {
    const {nav, screenProps} = this.props;
    if(screenProps.favorites != null) {
      return screenProps.favorites.includes(eventId);
    }
    return false; 
  }

  toggleFavorite(eventId) {
    const {nav, screenProps} = this.props;
    screenProps.toggle(eventId);
  }

  addEventToSchedule(eventId, addCallback, removeCallback) {
    const {nav, screenProps} = this.props;
    return screenProps.addToSchedule(eventId, addCallback, removeCallback);
  }

  removeEventFromSchedule(eventId) {
    const {nav, screenProps} = this.props;
    if(screenProps.removeFromSchedule(eventId)) {
      console.log("unscheduling...");
      let issch_copy = this.state.scheduled.splice(0);
      issch_copy[eventId] = false;

      this.setState({scheduled: issch_copy});
      return true;
    }
    return false;
  }

  render() {
    const {nav, screenProps} = this.props;

    if(screenProps == null) {
      return null;
    }

    var myItems = [];
    screenProps.events.forEach(evt => {
      if(evt.timeSlot == this.props.timeSlot) {
        myItems.push(evt);
      }
    });

    return (
      <View>
        <FlatList
          data = {myItems}
          renderItem = {({item}) =>
            <EventObj
              id = {item.key}
              title = {item.title}
              speaker = {item.speaker}
              location = {item.location}
              description = {item.description}
              timeSlot = {item.timeSlot}
              added = {this.state.scheduled[item.key]}
              favorited = { this.isFavorited(item.key) }
              onFavorite = {() => this.toggleFavorite(item.key)}
              onAdd = {this.addEventToSchedule}
              onRemove = {() => this.removeEventFromSchedule(item.key)}
            />}
        />
      </View>
    );
  }
}

const EventStack =  StackNavigator({
  Hub: {
    screen: HubScreen,
    navigationOptions: {header: null}
  },
  Block1: {
    screen: props => (<WSScreen {...props} timeSlot={5}/>),
    navigationOptions: {title: "Block 1 Workshops",},
  },
  Block2: {
    screen: props => (<WSScreen {...props} timeSlot={6}/>),
    navigationOptions: {title: "Block 2 Workshops",},
  },
  Block3: {
    screen: props => (<WSScreen {...props} timeSlot={9}/>),
    navigationOptions: {title: "Block 3 Workshops",},
  },
  Caucuses: {
    screen: props => (<WSScreen {...props} timeSlot={10}/>),
    navigationOptions: {title: "Caucuses"},
  }
}, {
  initialRouteName: 'Hub',
});

export default class EventScreen extends React.Component {
  render() {
    const {nav, screenProps} = this.props;
    if (screenProps == null) {
      return null;
    }
    return <EventStack navigation={nav} screenProps = {screenProps}/>;
  }
}