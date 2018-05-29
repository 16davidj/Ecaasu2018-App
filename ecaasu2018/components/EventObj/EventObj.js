import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Animated, Button, ScrollView} from 'react-native';
import {DrawerNavigator, DrawerItems, StackNavigator, TabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo';
import Collapsible from 'react-native-collapsible';
import Icon2 from 'react-native-vector-icons/Ionicons';
import eventStyles from './styles.js';
import {TIMESLOTS} from '../../data/times.js';


class EventObj extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      timeStart: TIMESLOTS[props.timeSlot]["start"],
      timeEnd:   TIMESLOTS[props.timeSlot]["end"],
      title: props.title,
      speaker: props.speaker,
      location: props.location,
      description: props.description,
      added: props.added,
      favorited: this.props.favorited,
      expanded: false,
      deletable: props.deletable == undefined ? true : props.deletable,
      inSchedule: props.scheduled == undefined ? false : props.scheduled,
      fixed: props.fixed == undefined ? false : props.fixed,
    };
    this.addEvent = this.addEvent.bind(this);
    this.removeEvent = this.removeEvent.bind(this);
    this.toggleHeart = this.toggleHeart.bind(this);
    this.toggleExpand = this.toggleExpand.bind(this);
  }

  toggleExpand() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  toggleHeart(){
    if(this.state.favorited) {
      this.setState({ favorited: false });
    }
    else {
      this.setState({ favorited: true });
    }

    this.props.onFavorite();
  }

  addEvent() {
    if (this.state.added){
      return;
    }

    this.props.onAdd(this.props.id,
      () => {this.setState({added: true})},
      () => {
        console.log("callback unsched");
        this.setState({added: false})});
  }


  removeEvent() {
    if(!this.state.added){
      return;
    }
    if(this.props.onRemove()){
      console.log("setting added to false");
      this.setState({
        added: false
      });
    }
  }

  render(){
    var header = (
      <View style={this.state.fixed? eventStyles.fixedTitleContainer : eventStyles.titleContainer}>

        { this.state.inSchedule ? null : (
          <TouchableOpacity style={eventStyles.heartIcon}
            onPress={()=>this.toggleHeart()}>
            <Icon name= {this.state.favorited ? "heart" : "heart-outlined"} size={25} color = 'red'/>
          </TouchableOpacity>)
        }

        <TouchableOpacity
            style = {{flex:1}}
            onPress={()=>this.toggleExpand()}>
              <View style = {{flexDirection: 'column', paddingLeft: 5}}>
                <View
                  style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                  <View style = {{flexDirection: 'row', flex: 1}}>
                    <Text style={ this.state.fixed?eventStyles.titleLight : eventStyles.title}>{this.state.title}</Text>
                  </View>
                  <Icon
                      name={this.state.expanded ? "minus" : "plus"}
                      size={20}
                      color = 'dodgerblue'/>
                </View>

                <View
                  style = {{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    paddingRight: 5,
                    paddingBottom: 2,
                  }}>
                  <Text style = {[eventStyles.subTitle, {fontWeight:'bold'}]}>{this.state.location}</Text>
                  <Text style = {[eventStyles.subTitle, {fontStyle:'italic'}]}>{this.state.timeStart} to {this.state.timeEnd}</Text>
                </View>
              </View>
        </TouchableOpacity>
      </View>
    );

    var content;

    // show delete if added and is able to be deleted
    if (this.state.added) {
      if (this.state.deletable) {
        content = (
          <View style={eventStyles.body}>
            {this.state.speaker == "" ? null : (<Text style = {eventStyles.speaker}>Led by {this.state.speaker}</Text>)}
            <Text>{this.state.description}</Text>
            <Button
              onPress={() => this.removeEvent()}
              title= {"Unschedule Event"}
              color={"red"}
            />
          </View>
        );
      }
      else {
        content = (
          <View style={eventStyles.body}>
            {this.state.speaker == "" ? null : (<Text style = {eventStyles.speaker}>Led by {this.state.speaker}</Text>)}
            <Text>{this.state.description}</Text>
          </View>
        );
      }
    } else {
      content = (
          <View style={eventStyles.body}>
            {this.state.speaker == "" ? null : (<Text style = {eventStyles.speaker}>Led by {this.state.speaker}</Text>)}
            <Text>{this.state.description}</Text>
            <Button
              onPress={() => this.addEvent()}
              title= {"Add Event"}
              color={"blue"}
            />
          </View>
        );
    }

    return(
      <View style={eventStyles.container}>
        {header}
        <Collapsible collapsed = {!this.state.expanded}>
          {content}
        </Collapsible>
      </View>
    );
  }
}

export default EventObj;
