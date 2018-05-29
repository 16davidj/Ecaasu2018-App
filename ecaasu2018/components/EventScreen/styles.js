import {StyleSheet} from 'react-native';

const header_height = 60;

export default StyleSheet.create({
    header: {
      fontWeight: 'bold',
      fontSize: 20,
      alignSelf: 'center',
      padding: 5,
    },
    headerContainer: {
      backgroundColor: 'white',//'#f4f7f9',
      borderBottomWidth: 1,
      height: header_height,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonListContainer: {
      flex:1, 
      flexDirection:'column', 
      justifyContent:'space-between', 
      marginBottom: 50,
    },
    container: {
        backgroundColor: '#f4f7f9',
        margin: 10,
        overflow: 'hidden'
    },
    titleContainer : {
        flexDirection: 'row'
    },
    title : {
        padding: 5,
        color:'#2a2f43',
        fontWeight:'bold',
        fontSize: 20,
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
    timePos : {
      position: "absolute",
      right: 35,
      padding: 5,
      fontSize: 11,
    },
    listContainer: {
      paddingBottom: header_height,
    },
  roundContainer: {
    paddingTop:20,
    paddingBottom:20,
    borderWidth: 3,
    marginLeft:45,
    marginRight:45,
    marginTop: 5,
    marginBottom:5,
    borderRadius: 15,
    backgroundColor: 'white',
    borderColor: 'red',
    justifyContent:'center'
  },
});