import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// import Screens and Navigators
import TabNav from './TabNav';
import LoginScreen from '../screens/LoginScreen';
import LoginStack from './LoginStack';

const Root = createStackNavigator();
const Router = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    // <NavigationContainer>
      <Root.Navigator screenOptions={{headerShown: false}}>
        {/* <Root.Screen component={TabNav} name="HomeTab" /> */}
        <Root.Screen component={LoginStack} name='Login'/> 
      </Root.Navigator>
    // </NavigationContainer>
  );
};

export default Router;
