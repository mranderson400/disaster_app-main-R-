/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext, useState, useEffect} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  View,
  Text,
} from 'react-native';
import Router from './src/router';
import TabNav from './src/router/TabNav';
import { AuthContext } from './src/server/context';
import {COLORS} from './src/utils';
const App = () => {
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          user: action.user,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          user: null,
          userToken: null,
          isLoading: false,
        };
    }
  };
  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );
  const Stack = createStackNavigator();
  const authContext = React.useMemo(
    () => ({
      signIn: async foundUser => {
      console.log("🚀 ~ file: App.js:90 ~ App ~ foundUser:", foundUser)

        const userToken = String(foundUser.idToken);
        const user = foundUser;

        try {
          await AsyncStorage.setItem('userToken', userToken);
          await AsyncStorage.setItem('user', JSON.stringify(user));
          // navigation.n
          // await AsyncStorage.setItem('userToken', userToken);
        } catch (e) {
          console.log('error', e);
        }
        // console.log('user token: ', userToken);
        dispatch({type: 'LOGIN', user: user, token: userToken});
      },
      signOut: async () => {
        // setUserToken(null);
        // setIsLoading(false);
        try {
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('user');
        } catch (e) {
          console.log('error', e);
        }
        dispatch({type: 'LOGOUT'});
      },
    }),
    [],
  );
  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log('error', e);
      }
      console.log('user token: ', userToken);
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 5000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={COLORS.secondary} barStyle="light-content" />
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {loginState.userToken !== null ? (
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen component={TabNav} name="HomeTab" />
            </Stack.Navigator>
          ) : (
            <Router />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </SafeAreaView>
  );
};

export default App;
