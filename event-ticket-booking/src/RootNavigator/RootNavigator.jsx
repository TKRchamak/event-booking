import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from '../Screens/Login/Login';
import LandingPage from '../Screens/LandingPage/LandingPage';
import Registration from '../Screens/Registration/Registration';

const RootNavigator = () => {
    const Stack = createNativeStackNavigator();

    const screenOptionStyle = {
        headerShown: false
    }

    return (
        <>
            <Stack.Navigator screenOptions={screenOptionStyle}>
                <Stack.Screen name="landing" component={LandingPage} />
                <Stack.Screen name="login" component={Login} />
                <Stack.Screen name="registration" component={Registration} />
            </Stack.Navigator>
        </>
    );
};

export default RootNavigator;