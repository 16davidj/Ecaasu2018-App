import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  topBar: {
    height: 75,
    backgroundColor: 'skyblue',
    flexDirection: 'row',
  },
  text: {
    color: '#abc',
    fontSize: 30,
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
  infoContainer: {
    paddingTop:10,
    paddingBottom:20,
    borderWidth: 3,
    marginLeft:20,
    marginRight:20,
    borderRadius: 15,
    backgroundColor: 'white',
    borderColor: 'red',
  }, 
  image: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
  logoStyle:{
    alignSelf: 'center', 
    height: 150, 
    width: 300
  },
  buttonListContainer: {
    flex:1, 
    flexDirection:'column', 
    justifyContent:'space-between', 
    marginBottom: 50,
  }
});
