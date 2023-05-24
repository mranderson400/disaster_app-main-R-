import {StyleSheet, Dimensions} from 'react-native';
import {FontSizes} from '@src/styles/theme';
let {height, width} = Dimensions.get('window');
export default StyleSheet.create({
  mainView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },

  banner: {
    height: height / 5,
    borderRadius: 25,
  },
});
