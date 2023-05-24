import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

// import Screens
import WelcomeScreen from '../screens/WelcomeScreen';

const Stack =createStackNavigator();
const HomeStack = () => {
    return (
        <SafeAreaView style={{flex:1}}>
        <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen component={WelcomeScreen} name='HomeScreen' options={{title:'Home'}}/>
                {/* <Stack.Screen component={DetailScreen} name='DetailsScreen'  options={{title:`Product's Detail`}}/>
                <Stack.Screen component={SearchScreen} name='SearchScreen'  options={{title:`Search`}}/>
                <Stack.Screen component={ProductScreen} name='ProductsScreen' option={{title:`Selected Product`}}/> */}
            </Stack.Navigator>
            </SafeAreaView>
    )
}

export default HomeStack
