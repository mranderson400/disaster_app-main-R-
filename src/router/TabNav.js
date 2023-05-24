import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Svg, Path} from 'react-native-svg';
// import Screens

import styles from './style';

// Navigation Libraries
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import Icons
import Entypo from 'react-native-vector-icons/Entypo';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import Material from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStack from './HomeStack';
import AboutScreen from '../screens/About';
import VolunteerScreen from '../screens/VolunteerScreen';
import { AuthContext } from '../server/context';

const Tab = createBottomTabNavigator();
const TabNav = () => {
  const {signOut} = useContext(AuthContext);

  return (
    <Tab.Navigator
    initialRouteName='Welcome'
      screenOptions={{
        tabBarShowLabel: false,
        tabBarInactiveTintColor: '#89bccc',
        tabBarActiveTintColor: '#346473',
        headerShown: false,
        tabBarStyle: {backgroundColor: '#fff'},
      }}>
      <Tab.Screen
        component={VolunteerScreen}
        name="Home 2"
        options={{
          tabBarIcon: ({color}) => (
            <Font5 name="hand-holding-heart" color={color} size={25} style={styles.icons} />
          ),
        }}
      />
      <Tab.Screen
        component={AboutScreen}
        name="Categories"
        options={{
          tabBarIcon: ({color}) => (
            <Font5 name="clipboard-list" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        component={HomeStack}
        name="Welcome"
        options={{
          tabBarIcon: ({color, focused}) => (
            <View style={styles.cartIcons}>
              <Svg width="80" height="80" style={styles.circle}>
                <Path d="M0,40 a1,1 0 0,0 80,0" fill="#f8fffa" />
              </Svg>
              <View
                style={[
                  styles.cartIcon,
                  {backgroundColor: focused ? '#346473' : '#89bccc'},
                ]}>
                <Icons
                  name="home"
                  color={color}
                  size={30}
                  style={styles.icon}
                />
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        component={AboutScreen}
        name="About"
        options={{
          tabBarIcon: ({color}) => (
            <Material name="feedback" color={color} size={25} />
          ),
        }}
      />

      <Tab.Screen
        component={() => {
          return <View></View>;
        }}
        name="Volunteer"
        options={{
          tabBarIcon: ({color}) => (
            <TouchableOpacity onPress={() => signOut()}>
              <Font5 name="power-off" color={color} size={25} />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNav;
