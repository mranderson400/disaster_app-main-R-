import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import DatePicker from 'react-native-date-picker'
import Modal from 'react-native-modal';
// import { FontSizes } from '@src/styles/theme';

export default function DatePickerWrapper(props) {
  let { isVisible, close, cancelFunc, confirmFunc, confirmBtnText, cancelBtnText, date, mode, placeholder, androidVariant, onDateChange } = props
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={close}
      onBackButtonPress={close}
      style={styles.modal}
    >
      <View style={styles.view}>
        <View style={styles.top}>
          <TouchableOpacity onPress={() => close && close()}>
            <Text style={styles.text}>{cancelBtnText}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { onDateChange && onDateChange(date); close && close() }}>
            <Text style={styles.text}>{confirmBtnText}</Text>
          </TouchableOpacity>
        </View>
        <DatePicker
          style={styles.calendar}
          date={date}
          mode={mode}
          placeholder={placeholder}
          format="YYYY-MM-DD"
          maximumDate={new Date()}
          androidVariant={androidVariant}
          onDateChange={(date) => { onDateChange && onDateChange(date) }}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    padding: 0
  },
  view: {
    backgroundColor: 'white',
    padding: '5%'
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // text: {
  //   ...FontSizes.regular
  // }
})
