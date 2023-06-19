import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text } from 'react-native'

import colors from '../config/colors';

import HomeScreenAll from './HomeScreenAll';
import HomeScreenSub from './HomeScreenSub';

const Tab = createMaterialTopTabNavigator();

const HomeScreen = ({navigation}) => {
    return(
        <Tab.Navigator
          screenOptions={{
            elevation: 0,
            tabBarActiveTintColor: '#1E90FF',
            tabBarInactiveTintColor: 'lightgrey',
            tabBarStyle: { backgroundColor: colors.primary },
          }}
        >
          <Tab.Screen  name="全部" component={HomeScreenAll} />
          <Tab.Screen name="追蹤" component={HomeScreenSub} />
        </Tab.Navigator>
    )
};

export default HomeScreen;
