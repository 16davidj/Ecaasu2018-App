import {StyleSheet} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

export default StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    flex:1,
    flexDirection:'column',
  },
  titleContainer: {
    backgroundColor: "#ced9e0",
    paddingLeft: 5
  },
  announcementTitle: {
    alignSelf:'center',
    color: 'black',
    fontSize: 20,
  },
  announcementItem: {
    flex: 1,
    borderStyle: 'solid',
    backgroundColor: 'white',
    borderBottomWidth: 1,
  },
  announcementsBox: {
    marginTop: 5,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 20,

    height: 'auto',
    minHeight: 100,
    minWidth: "85%",
    flex: 1,

    backgroundColor: '#ced9e0',

    borderStyle: 'solid',
    borderWidth: 1,
  },
  image: {
    ...ifIphoneX({
      top: 20,
      width: 250,
      height: 250,
      padding: 20,
    }, {
      width: 250,
      height: 250,
    })
  }
});
