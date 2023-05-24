import React, {useState,useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../utils';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {API_KEY} from '../../server/constant';
import axios from 'axios';
import { AuthContext } from '../../server/context';
const RegisterScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    check_textInputChnage: false,
    secureTextEntry: true,
  });
  const textInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        email: val,
        check_textInputChnage: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChnage: false,
      });
    }
  };
  const handlePasswordChange = val => {
    setData({
      ...data,
      password: val,
    });
  };
  const handleConfirmPassword = val => {
    setData({
      ...data,
      confirmPassword: val,
    });
  };
  const handleUsernameChange = val => {
    setData({
      ...data,
      username: val,
    });
  };
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const {signIn} = React.useContext(AuthContext);

  const onSignUp = async () => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    setIsLoading(true);
    try {
      const response = await axios.post(url, {
        email: data.email,
        password: data.password,
        displayName: data.username,
        returnSecureToken: true,
      });
      if (response.data) {
        signIn(response.data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      Alert.alert('Login failed');
    }
  };
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
            <Text
              style={{fontSize: 40, textAlign: 'center', color: COLORS.text}}>
              Sign Up
            </Text>
            <Text
              isSecondary
              isCenter
              style={{marginTop: '2%', marginBottom: '7%'}}>
              Login or create an account to revieve rewards and save your
              details for a faster checkout experience details
            </Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="#05375a" size={20} />
              <TextInput
                placeholder="Full Name"
                style={styles.textInput}
                autoCapitalize="none"
                value={data?.username}
                onChangeText={val => handleUsernameChange(val)}
                placeholderTextColor={COLORS.text}
              />
              {data.check_textInputChnage ? (
                <Feather name="check-circle" color="green" size={20} />
              ) : null}
            </View>
            <View style={styles.action}>
              <Feather name="mail" color="#05375a" size={20} />
              <TextInput
                placeholder="Your Email"
                style={styles.textInput}
                autoCapitalize="none"
                value={data?.email}
                onChangeText={val => textInputChange(val)}
                placeholderTextColor={COLORS.text}
              />
              {data.check_textInputChnage ? (
                <Feather name="check-circle" color="green" size={20} />
              ) : null}
            </View>
            <View style={styles.action}>
              <MaterialCommunityIcons
                name="lock-outline"
                color="#05375a"
                size={20}
              />
              <TextInput
                placeholder="Your Password"
                style={styles.textInput}
                autoCapitalize="none"
                secureTextEntry={data.secureTextEntry ? true : false}
                value={data.password}
                onChangeText={val => handlePasswordChange(val)}
                placeholderTextColor={COLORS.text}
              />

              <TouchableOpacity onPress={updateSecureTextEntry}>
                {data.secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.action}>
              <MaterialCommunityIcons
                name="lock-check-outline"
                color="#05375a"
                size={20}
              />
              <TextInput
                placeholder="Confirm Password"
                style={styles.textInput}
                autoCapitalize="none"
                secureTextEntry={data.secureTextEntry ? true : false}
                value={data.confirmPassword}
                onChangeText={val => handleConfirmPassword(val)}
                placeholderTextColor={COLORS.text}
              />

              <TouchableOpacity onPress={updateSecureTextEntry}>
                {data.secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={onSignUp}>
            <View style={{}}>
              <Text style={styles.textSign}>Create Account</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSugnUp}
            onPress={() => navigation.navigate('LoginScreen')}>
            <View style={styles.signIn}>
              <Text style={styles.textSignUp}>Login</Text>
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
export default RegisterScreen;
