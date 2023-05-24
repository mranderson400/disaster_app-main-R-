import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import TabNav from './TabNav';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
const Stack = createStackNavigator();


// useEffect(() => {
//     getStatus();

// }, []);

// const [isBoarding, setIsBoarding] = useState(true);
// const [loading, setLoading] = useState(true);
// const [isAddress, setIsAddress] = useState(true);

// const getStatus = async () => {
//     try {
//         const isBoarding = await AsyncStorage.getItem('isBoarding');
//         if (isBoarding !== null) {
//             setIsBoarding(false)
//         }
//         const isAddress = await AsyncStorage.getItem('Address');
//         if (isAddress !== null) {
//             setIsAddress(false)
//         }
//     } catch (err) {
//         console.log('Error #CheckOnBoarding in Login Stack: ', err)
//     } finally {
//         setLoading(false)
//     }

// }

const LoginStack = (props) => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={props.route} >
            
            <Stack.Screen component={LoginScreen} name='LoginScreen' />
            <Stack.Screen component={RegisterScreen} name='RegisterScreen' />
            <Stack.Screen component={TabNav} name='HomeTabs' />
        </Stack.Navigator >
    )
}

export default LoginStack
