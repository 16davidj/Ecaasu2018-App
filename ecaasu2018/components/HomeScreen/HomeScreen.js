import React from 'react';
import { AppRegistry, FlatList, Text, View, Image, ScrollView, StatusBar} from 'react-native';
import styles from './styles';

var logo = require('../../assets/sticker_1024.png');

class AnnouncementItem extends React.Component {
  render() {
    return (
      <View style={styles.announcementItem}>
        <View style={styles.titleContainer}>
          <Text style={{fontWeight:'bold', fontSize: 16}}>{this.props.title}</Text>
        </View>
        <View style={{paddingLeft:5}}>
          <Text style={{fontStyle:'italic', color:'gray'}}>{this.props.time}</Text>
          <Text>{this.props.body}</Text>
        </View>
      </View>
    );
  }
}

export default class HomeScreen extends React.Component {
  render() {
    const {navigation, screenProps} = this.props;

    return (
      <View style = {styles.container}>
        <StatusBar hidden={true} />
        <Image source={logo} style={styles.image}/>
        <View style = {{height: 20}}>
        <Text> </Text>
        </View>
        <View style={{flex:1}}>
          <Text style={styles.announcementTitle}> Announcements </Text>

          <View style = {styles.announcementsBox}>
            <FlatList
              data={screenProps.announcements}
              renderItem={({item}) => (
                <AnnouncementItem
                  title={item.title}
                  body={item.message}
                  time={item.timeStamp}
                  />
                )}
            />
          </View>
        </View>



      </View>
    );
  }
}
