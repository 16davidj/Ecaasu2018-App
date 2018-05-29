import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: '#f4f7f9',
        margin: 10,
        overflow: 'hidden'
    },
    titleContainer : {
        flexDirection: 'row',
        backgroundColor: '#ced9e0'
    },
    fixedTitleContainer: {
      backgroundColor: '#878f9b',
      flexDirection: 'row',
    },
    title : {
        color:'#2a2f43',
        fontWeight:'bold',
        fontSize: 20,

        flex:1,
        flexWrap: 'wrap',
    },
    titleLight : {
      color:'#f4f7f9',
      fontWeight:'bold',
      fontSize: 20,
      flex:1,
      flexWrap: 'wrap',
    },
    speaker: {
        fontWeight: 'bold',
    },
    body : {
        flex: 1,
        padding     : 10,
        paddingTop  : 5,
        backgroundColor: '#f4f7f9',
    },
    heartIcon : {
      paddingLeft: 5,
      paddingTop: 5
    },
    subTitle: {
      fontSize: 12,
    },
});
