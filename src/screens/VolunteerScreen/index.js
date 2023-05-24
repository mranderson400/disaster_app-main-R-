import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../utils';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {API_KEY} from '../../server/constant';
import axios from 'axios';
import {AuthContext} from '../../server/context';
import DatePickerWrapper from '../../components/datePicker';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
const VolunteerScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
const initial={
  firstname: '',
  lastname: '',
  address: '',
  city: '',
  state: '',
  responder: '',
  size: '',
}
  const [data, setData] = useState(initial);
  
  const onVolunteerCreate = async () => {
    const url = `https://projectsteel-b6fba-default-rtdb.firebaseio.com/volunteer.json`;
    setIsLoading(true);
    try {
      const response = await axios.post(url, {
        city: data.city,
        firstname: data.firstname,
        lastname: data.lastname,
        responder: data.responder,
        size: data.size,
        state: data.state,
        returnSecureToken: true,
      });
      if (response.data) {
        console.log("🚀 ~ file: index.js:100 ~ onSignUp ~ response.data:", response.data)
        setData(initial)
      Alert.alert("Volunteer added Successfully");

      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      Alert.alert("Volunteer cloudn't be added");
    }
  };
  const [birthday, setBirthday] = React.useState(new Date());
  const [birthDate, setBirthDate] = React.useState(new Date());

  const _calculateAge = birthday => {
    // birthday is a date
    var d = new Date(birthday);
    var mm = d.getMonth() + 1;
    var dd = d.getDate();
    var yy = d.getFullYear();
    if (mm < 10) mm = '0' + mm;
    if (dd < 10) dd = '0' + dd;
    return dd + '-' + mm + '-' + yy;
  };
  var radio_props = [
    {label: 'Yes', value: true},
    {label: 'No', value: false},
  ];

  var sizes = [
    {label: 'Extra Small', value: 'Extra Small'},
    {label: 'Small', value: 'Small'},
    {label: 'Medium', value: 'Medium'},
    {label: 'Large', value: 'Large'},
    {label: 'Extra Large', value: 'Extra Large'},
  ];

  return (
    <SafeAreaView style={styles.root}>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
          <Text>Loading</Text>
        </View>
      ) : (
        <KeyboardAwareScrollView
          contentContainerStyle={styles.contentContainer}>
          <Image
            source={require('../../assets/fire.jpg')}
            style={{
              height: 200,
              width: 200,
              alignSelf: 'center',
              marginTop: '2%',
            }}
            resizeMode="contain"
          />
          <View style={styles.formContainer}>
            <View style={styles.action}>
              <TextInput
                placeholder="First Name"
                style={styles.textInput}
                autoCapitalize="none"
                value={data?.firstname}
                onChangeText={val => setData({...data,firstname:val})}
                placeholderTextColor={COLORS.text}
              />
            </View>
            <View style={styles.action}>
              <TextInput
                placeholder="Last Name"
                style={styles.textInput}
                autoCapitalize="none"
                value={data?.lastname}
                onChangeText={val => setData({...data,lastname:val})}
                placeholderTextColor={COLORS.text}
              />
            </View>

            {/* <View style={styles.bdayView}>
              <TouchableOpacity
                style={styles.bdayView}
                onPress={() => setIsVisible(true)}>
                <Text style={styles.text}>
                  {typeof birthday === 'object'
                    ? _calculateAge(birthday)
                    : birthday}
                </Text>
                <MaterialCommunityIcons
                  style={styles.calendarIcon}
                  name="calendar-blank"
                  color="red"
                  size={29}
                />
              </TouchableOpacity>
              <DatePickerWrapper
                style={styles.calendar}
                date={birthDate}
                mode="date"
                placeholder={'Date'}
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                androidVariant="iosClone"
                onDateChange={date => {
                  setBirthday(date);
                  setBirthDate(new Date(date));
                  console.log(
                    '🚀 ~ file: index.js:185 ~ VolunteerScreen ~ new Date(date):',
                    new Date(date),
                  );
                }}
                iconComponent={
                  <MaterialCommunityIcons
                    style={styles.calendarIcon}
                    name="calendar-blank"
                    color="red"
                    size={29}
                  />
                }
                isVisible={isVisible}
                close={() => setIsVisible(false)}
              />
              {/* <Text style={styles.text}>{birthDate}</Text> 
            </View> */}

            <View style={styles.action}>
              <TextInput
                placeholder="Address"
                style={styles.textInput}
                autoCapitalize="none"
                value={data?.address}
                onChangeText={val => setData({...data,address:val})}
                placeholderTextColor={COLORS.text}
              />
            </View>
            <View style={styles.action}>
              {/* <Feather name="mail" color="#05375a" size={20} /> */}
              <TextInput
                placeholder="City"
                style={styles.textInput}
                autoCapitalize="none"
                value={data?.city}
                onChangeText={val => setData({...data,city:val})}
                placeholderTextColor={COLORS.text}
              />
            </View>
            <View style={styles.action}>
              <TextInput
                placeholder="State"
                style={styles.textInput}
                autoCapitalize="none"
                value={data.state}
                onChangeText={val => setData({...data,state:val})}
                placeholderTextColor={COLORS.text}
              />
            </View>
            <View>
              <Text
                style={{
                  marginVertical: 10,
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                Responser?
              </Text>

              <RadioForm formHorizontal={true} animation={true}>
                {/* To create radio buttons, loop through your array of options */}
                {radio_props.map((obj, i) => (
                  <RadioButton labelHorizontal={true} key={i}>
                    {/*  You can set RadioButtonLabel before RadioButtonInput */}
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={obj.value === data.responder}
                      onPress={value => {
                        console.log('🚀 ~ file: index.js:279 ~ value:', value);
                        setData({...data, responder: value});
                      }}
                      borderWidth={1}
                      buttonInnerColor={'#2196f3'}
                      buttonOuterColor={
                        obj.value === data.responder ? '#2196f3' : '#000'
                      }
                      buttonSize={20}
                      buttonOuterSize={20}
                      buttonStyle={{}}
                      buttonWrapStyle={{marginLeft: 10}}
                    />
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      labelHorizontal={true}
                      onPress={value => {
                        console.log('🚀 ~ file: index.js:279 ~ value:', value);
                        setData({...data, responder: value});
                      }}
                      labelStyle={{fontSize: 14, color: '#000'}}
                      labelWrapStyle={{}}
                    />
                  </RadioButton>
                ))}
              </RadioForm>
            </View>

            <View>
              <Text
                style={{
                  marginVertical: 10,
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                Size?
              </Text>

              <RadioForm formHorizontal={false} animation={true}>
                {/* To create radio buttons, loop through your array of options */}
                {sizes.map((obj, i) => (
                  <RadioButton labelHorizontal={true} key={i}>
                    {/*  You can set RadioButtonLabel before RadioButtonInput */}
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={obj.value === data.size}
                      onPress={value => {
                        console.log('🚀 ~ file: index.js:279 ~ value:', value);
                        setData({...data, size: value});
                      }}
                      borderWidth={1}
                      buttonInnerColor={'#2196f3'}
                      buttonOuterColor={
                        obj.value === data.size ? '#2196f3' : '#000'
                      }
                      buttonSize={20}
                      buttonOuterSize={20}
                      buttonStyle={{}}
                      buttonWrapStyle={{marginLeft: 10}}
                    />
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      labelHorizontal={true}
                      onPress={value => {
                        console.log('🚀 ~ file: index.js:279 ~ value:', value);
                        setData({...data, size: value});
                      }}
                      labelStyle={{fontSize: 14, color: '#000'}}
                      labelWrapStyle={{}}
                    />
                  </RadioButton>
                ))}
              </RadioForm>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={onVolunteerCreate}>
            <View style={{}}>
              <Text style={styles.textSign}>Create Volunteer</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  formContainer: {
    paddingTop: '5%',
    marginBottom: '7%',
  },
  forgotPasswordButton: {
    marginTop: 0,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  passwordTextField: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'lightgray',
    paddingLeft: '10%',
  },
  bdayView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: '3%',
  },
  //   text: {
  //     ...FontSizes.Label,
  //   },
  calendarIcon: {
    marginRight: '5%',
    marginLeft: '2%',
  },
  button: {
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.secondary,
    borderWidth: 1,
    width: '100%',
    padding: 15,
    backgroundColor: COLORS.secondary,
  },
  contentContainer: {
    padding: 15,
    backgroundColor: 'white',
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonSugnUp: {
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#074691',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  textSignUp: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#074691',
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
});
export default VolunteerScreen;
