import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';

const AboutScreen = () => {
  const [allValues, setAllValues] = useState({
    Name: '',
    MobileNo: '',
    location: '',
  });

  const changeHandler = (value, field) => {
    setAllValues({ ...allValues, [field]: value });
  };

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    try {
      const result = await check(PERMISSIONS.IOS.LOCATION_ALWAYS);
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log('Unavailable');
          break;
        case RESULTS.DENIED:
          console.log('Denied');
          break;
        case RESULTS.GRANTED:
          console.log('Granted');
          break;
        default:
          console.log('Default');
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonPress = () => {
    // Perform the desired action when the button is pressed
    // For example, call the RequestLocation function
    RequestLocation();
  };

  const RequestLocation = () => {
    // Implement your logic for requesting location here
    // This function will be called when the button is pressed
    alert('Requesting location...');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          value={allValues.Name}
          onChangeText={(value) => changeHandler(value, 'Name')}
          placeholder="Name"
        />
      </View>
      <Button onPress={handleButtonPress} title="Proceed" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputView: {
    paddingLeft: 10,
    paddingTop: 5,
    marginLeft: 10,
    height: 30,
    marginTop: 50,
    borderWidth: 1,
    borderRadius: 26,
    width: 300,
  },
});

export default AboutScreen;
