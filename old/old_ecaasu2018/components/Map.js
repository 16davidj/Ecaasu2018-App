import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, FlatList} from 'react-native';
import {ListItem, Button} from "react-native-elements";
import Icon from 'react-native-vector-icons/Entypo';
import { MapView } from 'expo';

export default class MapPage extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Map',
    drawerIcon: ({tintColor}) => (<Icon name="map" size={25} color = 'dodgerblue'/>)
  };
  render() {
    return(
      <View style = {{height: 675, backgroundColor: "skyblue"}}>
        <Button style = {{position: 'absolute', top: 1, left: -15}}
          onPress={() => this.props.navigation.navigate('DrawerOpen')}
          icon =  {{name : 'list', size: 60}}
          backgroundColor = 'skyblue'
        />
        <View style={{ top: 70, height: 675, backgroundColor: "skyblue" }}>
          <MapView
            style={{ flex: 1 }}
            showsUserLocation= {true}
            initialRegion={{
              latitude: 42.4439,
              longitude: -76.5034,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            >
              <MapView.Marker
                coordinate = {{longitude: -77.0000, latitude: 43.0000}}
                title={"title"}
                dscription = {"description"}
              />
            </MapView>
        </View>
      </View>
      );
  }
}

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

AppRegistry.registerComponent('MapPage', () => MapPage);
