import React from 'react';
import {Text, View, TouchableOpacity, ScrollView, Image, Linking} from 'react-native';
import {StackNavigator} from 'react-navigation';
import styles from './styles';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';

var logo = require('../../assets/logo1transparentlow.png');
var logo2 = require('../../assets/ecassusquarered.png');

class TransportationInfo extends React.Component {
  static navigationOptions = {
    title: 'Transportation',
  }
  render() {
    return (
      <View style = {{top: 10}}>
        <TouchableOpacity style = {styles.infoContainer} activeOpacity = {1.0}>
          <Image source={logo} style = {styles.image}/>
          <Text style = {{fontSize: 15, fontWeight: 'bold', padding: 5}}>Friday (3/2/18)</Text>
          <Text style = {{padding: 5}}>
            9:00pm -11:30pm: Shuttle service between Sage Hall bus stop and Ithaca Marriott & Hotel Ithaca
          </Text>
          <Text style = {{fontSize: 15, fontWeight: 'bold', padding: 5}}>Saturday (3/3/18)</Text>
          <Text style = {{padding: 5}}>
            7:00am - 9:30am: Shuttle service between Uris Hall bus pull-off and Ithaca Marriott & Hotel Ithaca
            {"\n\n"}
            2:30pm - 6:00pm: Shuttle service between Uris Hall bus pull-off and Ithaca Marriott & Hotel Ithaca
            {"\n\n"}
            9:00pm - 11:30pm: Shuttle service between Uris Hall bus pull-off and Ithaca Marriott & Hotel Ithaca
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class EventInfo extends React.Component {
  static navigationOptions = {
    title: 'Event Info',
  }
  render() {
    return (
      <View style = {{top: 10}}>
        <TouchableOpacity style = {styles.infoContainer} activeOpacity = {1.0}>
          <Image source={logo} style = {styles.image}/>
          <Text style = {{justifyContent: 'center', textAlign:'center', alignItems: 'center', fontSize: 15, fontWeight: 'bold'}}> 
            Continuum: Power through Perspective 
          </Text>
          <Text style = {{padding: 5}}>
            {"\n"}
            ECAASU 2018 Dates: March 2nd-4th {"\n"}
            For four decades, the ECAASU Conference has functioned as a dynamic site for Asian American student activism
            and self-education.
            {"\n\n"}             
            Since the Conference's inception, students from Cornell University have partnered with ECAASU every ten years 
            — 1988, 1998, and 2008 — to bring this vision to fruition.
            {"\n\n"}
            Realizing the powerful capacity of embodied continuity within student and community organizing, we are incredibly 
            proud to welcome you to the 2018 Conference at Cornell to take part in shaping the newest chapter of the Asian 
            American movement. As we seek to enact profound social change within and beyond our lifetimes, we continue historical 
            traditions and transform our collective political consciousness with a perspective geared towards past, present, and future.
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class EmergencyInfo extends React.Component {
  static navigationOptions = {
    title: 'Emergency',
  }
  render() {
    return (
      <View style = {{top: 10}}>
        <TouchableOpacity style = {styles.infoContainer} activeOpacity = {1.0}>
          <Image source={logo} style = {styles.image}/>
          <Text style = {{padding: 5}}>
            CUPD and CUEMS (General Cornell Emergency Services Number): 607-255-1111 {"\n\n"}
            Please contact Sarah Park (404-934-3908) and Elva Lau (917-355-3083) in the case of any incidents or emergencies.
            </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// class CampusMap extends React.Component {
//   static navigationOptions = {
//     title: 'Map',
//   }
//   render() {
//     return (
//       <View>

//       </View>
//     );
//   }
// }

class AllInfoHub extends React.Component {
  static navigationOptions = {
    title: 'Info',
    header: null,
  }
  render() {
    const { navigate } = this.props.navigation
    return (
      <ScrollView style={{flex:1}}>

        <Image source={logo2} style={styles.logoStyle}/>

        <View style={styles.buttonListContainer}>
          <TouchableOpacity
            style = {styles.roundContainer}
            activeOpacity = {0.5}
            onPress = {() => navigate('Transportation')}
          >
              <Text style = {{textAlign: 'center', fontSize: 20}}> Transportation </Text>
          </TouchableOpacity>  

          <TouchableOpacity
            style = {styles.roundContainer}
            activeOpacity = {0.5}
            onPress = {() => navigate('Event')}
          >
              <Text style = {{textAlign: 'center', fontSize: 20}}> General Info </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style = {styles.roundContainer}
            activeOpacity = {0.5}
            onPress = {() => navigate('Emergency')}
          >
              <Text style = {{textAlign: 'center', fontSize: 20}}> Emergency Info </Text>
          </TouchableOpacity>

          <View style={{alignSelf:'center'}}>
            <TouchableOpacity
              style={{height:30, justifyContent:'center'}}
              onPress={() => Linking.openURL('http://ecaasu2018.org')}>
              <View style={{flexDirection:'row'}}>
                <MCIcons
                  name={'link-variant'}
                  size={20}
                />
                <Text> | </Text>
                <Text style={{color: 'blue'}}>
                  Check out our website!
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{height:30, justifyContent:'center'}}
              onPress={() => Linking.openURL('https://www.facebook.com/ECAASUConference/')}>
              <View style={{flexDirection:'row'}}>
                <MCIcons
                  name={'facebook-box'}
                  size={20}
                />
                <Text> | </Text>
                <Text style={{color: 'blue'}}>
                  Follow us on our FB page!
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const InfoScreen = StackNavigator({
  Hub: {screen: AllInfoHub },
  Transportation: {screen: TransportationInfo},
  Event: {screen: EventInfo},
  Emergency: {screen: EmergencyInfo},
  // Map: {screen: CampusMap},
}, {
  initialRouteName: 'Hub',
});

export default InfoScreen;