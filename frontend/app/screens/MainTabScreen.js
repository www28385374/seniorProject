import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Icon } from 'react-native-elements';

import HomeScreen from './HomeScreen';
import NotificationScreen from './NotificationScreen';
import DiscoverScreen from './DiscoverScreen';
import ProfileScreen from './ProfileScreen';

import colors from '../config/colors';

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = ({navigation}) => {
    return (
        <Tab.Navigator
            initialRouteName="Main"
            activeColor="#fff"
            labelStyle={{ fontSize: 12 }}
            barStyle={
                { backgroundColor: colors.primary , paddingBottom: 3, paddingTop: 3}
            }
        >
            <Tab.Screen
                name="Main"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Icon name="home-filled" color={color} size={26} type="materialicons"/>
                    ),
                }}
            />
            <Tab.Screen
                name="Discover"
                component={DiscoverScreen}
                options={{
                    tabBarLabel: 'Discover',
                    tabBarIcon: ({ color }) => (
                        <Icon name="dashboard" color={color} size={26} type="materialicons"/>
                    ),
                }}
            />
            <Tab.Screen
                name="Notification"
                component={NotificationScreen}
                options={{
                    tabBarLabel: 'Notification',
                    tabBarIcon: ({ color }) => (
                        <Icon name="notifications" color={color} size={26} type="materialicons"/>
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Icon name="person" color={color} size={26} type="materialicons"/>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default MainTabScreen;
