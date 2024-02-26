import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DetailScreen } from '@/screens';
import BottomTabNavigator from './BottomTabNavigator';


export type RootStackParamList = {
    BottomTabNavigator: undefined;
    DetailScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();



const AppStackNavigator = () => {

    useEffect(() => {

    }, []);

    return (
        <Stack.Navigator
            /* initialRouteName="AppStackNavigator" */
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
            <Stack.Screen name="DetailScreen" component={DetailScreen} />
        </Stack.Navigator>
    );
};

export default AppStackNavigator;