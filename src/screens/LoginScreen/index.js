import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../utils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import axios from 'axios';
import {AuthContext} from '../../server/context';
import {API_KEY} from '../../server/constant';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChnage: false,
    secureTextEntry: true,
  });

  const [isLoading, setIsLoading] = useState(false);

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
    // console.log(userId)
  };

  const handlePasswordChange = val => {
    setData({
      ...data,
      password: val,
    });
    // console.log(pass)
  };
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const {signIn} = React.useContext(AuthContext);
  const onLogin = async () => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    setIsLoading(true);
    try {
      const response = await axios.post(url, {
        email: data.email,
        password: data.password,
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
  const onRegister = () => {
    navigation.navigate('RegisterScreen');
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
          <View style={styles.footer}>
            <Text
              style={{fontSize: 40, textAlign: 'center', color: COLORS.text}}>
              Sign in
            </Text>
            <Text
              isSecondary
              isCenter
              style={{marginTop: '2%', marginBottom: '7%'}}>
              Login or create an account to revieve rewards and save your
              details for a faster checkout experience details
            </Text>
            {/* <Text style={styles.text_footer}>Email</Text> */}
            <View style={styles.action}>
              <FontAwesome name="user-o" color="#05375a" size={20} />
              <TextInput
                placeholder="Your Email"
                style={styles.textInput}
                autoCapitalize="none"
                value={data.email}
                onChangeText={val => textInputChange(val)}
                placeholderTextColor={COLORS.text}
              />
              {data.check_textInputChnage ? (
                <Feather name="check-circle" color="green" size={20} />
              ) : null}
            </View>

            {/* <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text> */}

            <View style={styles.action}>
              <FontAwesome name="lock" color="#05375a" size={20} />
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
            <TouchableOpacity style={styles.button} onPress={onLogin}>
              <View style={styles.signIn}>
                <Text style={styles.textSign}>Sign In</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSugnUp} onPress={onRegister}>
              <View style={styles.signIn}>
                <Text style={styles.textSignUp}>Registration</Text>
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;
