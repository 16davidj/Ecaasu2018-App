import {StyleSheet} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';


const header_height = 60;


export default StyleSheet.create({
    buttonStyle: {
      alignItems: 'center',
      flex:1,
      flexDirection: 'row',
    },
    titleContainer : {
        flexDirection: 'row'
    },
    title : {
        padding: 5,
        color:'#2a2f43',
        fontWeight:'bold',
        fontSize: 15,
        left: 5,
    },
    location : {
        left: 10,
        fontSize: 12,
        bottom: 5,
    },
    body : {
        padding     : 5,
        paddingTop  : 0
    },
    iconPos : {
      position: "absolute",
      right: 5,
      top: 5,
    },
    time: {
      paddingBottom: 5,
      fontSize: 15,
    },
    empty : {
      backgroundColor: '#f4f7f9',
      marginLeft: 10,
      marginRight: 10,
      height: 65,
      alignItems: 'center',
    },
    iconContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    centered : {
      height: 50,
      width: 50,
    },
    timeline: {
      borderLeftColor: 'red',
      borderLeftWidth: 2,
      left: 25,
      marginRight: 10,
      marginBottom: 5,
    },
    listContainer: {
      paddingBottom: header_height,
    },
    header: {
      fontWeight: 'bold',
      fontSize: 20,
      padding: 5,
      alignSelf: 'center',
    },
    headerContainer: {
      backgroundColor: 'white',//'#f4f7f9',
      borderBottomWidth: 1,
      height: header_height,
      alignItems: 'center',
      justifyContent: 'center',
      ...ifIphoneX({
        paddingTop: 25,
        borderBottomWidth: 0,
      }, {
        borderBottomWidth: 1,
      })
    },
    dividerContainer: {
      padding: 10,
      borderBottomWidth: 2,
      borderTopWidth: 2,
      borderColor: 'red',
      backgroundColor: 'white',
    },
    dividerHeader: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    containerTheme: {
      paddingLeft: 5,
      paddingRight: 10
    }
});
