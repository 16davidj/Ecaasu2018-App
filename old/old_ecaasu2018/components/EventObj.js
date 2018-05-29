import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';


class EventObj extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      subtitle: "",
      expanded: true,
      animation: new Animated.Value()

    };
  }

  _maxHeight(event){
      this.setState({
          maxHeight   : event.nativeEvent.layout.height
      });
  }

  _minHeight(event){
      this.setState({
          minHeight   : event.nativeEvent.layout.height
      });
  }

  toggle(){
    var initialValue;
    if(this.state.expanded) {
      initialValue = this.state.maxHeight + this.state.minHeight;
      finalValue = this.state.minHeight;
    } else {
      initialValue = this.state.minHeight;
      finalValue = this.state.maxHeight + this.state.minHeight;
    }
    this.setState({
      expanded: !this.state.expanded
    });

    this.state.animation.setValue(initialValue);
    Animated.spring(
      this.state.animation,
      {
        toValue: finalValue
      }
    ).start();
  }

  render(){
    return(
      <Animated.View style={[styles.container, {height: this.state.animation}]}>
        <View style={styles.titleContainer} onLayout={this._minHeight.bind(this)}>
          <Text style = {{padding: 5}}> TODO </Text>
          <Text style={styles.title}>{this.state.title}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={this.toggle.bind(this)}>
            <Icon name="plus" size={25} color = 'dodgerblue'/>
          </TouchableOpacity>
        </View>
        <View style={styles.body} onLayout={this._maxHeight.bind(this)}>
                    {this.props.children}
        </View>
      </Animated.View>
      );
  }
}
var styles = StyleSheet.create({
    container: {
        backgroundColor: '#f4f7f9',
        margin: 20,
        overflow: 'hidden'
    },
    titleContainer : {
        flexDirection: 'row'
    },

    title : {
        flex: 1,
        padding: 5,
        color:'#2a2f43',
        fontWeight:'bold',
        fontSize: 30,
    },
    body : {
        padding     : 10,
        paddingTop  : 0
    }
});

export default EventObj;
