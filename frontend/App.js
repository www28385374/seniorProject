import React, {useState, useEffect}  from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';

import { Icon } from 'react-native-elements';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, AndroidVisibility }from '@notifee/react-native';

import LoginScreen from './app/screens/LoginScreen';
// import DiscoverScreen from './app/screens/DiscoverScreen';
import SignUpScreen from './app/screens/SignUpScreen';
import EventContentScreen from './app/screens/EventContentScreen';
import MainTabScreen from './app/screens/MainTabScreen';
import SavedEventScreen from './app/screens/SavedEventScreen';
import dummyScreen from './app/screens/dummyScreen';
import DiscoverScreen from './app/screens/DiscoverScreen';
import HomeScreen from './app/screens/HomeScreen'
import NotificationScreen from './app/screens/NotificationScreen';
// in Development
import AboutUsScreen from './app/screens/AboutUsScreen';
import IndexScreen from './app/screens/IndexScreen';
import MuseumScreen from './app/screens/MuseumScreen';
import SearchScreen from './app/screens/SearchScreen';
import ProfileScreen from './app/screens/ProfileScreen';


import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

import colors from './app/config/colors';

async function onAppBootstrap() {
  // Register the device with FCM
  await messaging().registerDeviceForRemoteMessages();

  // Get the token
  const token = await messaging().getToken();

  // Save the token
  await postToApi('/users/1234/tokens', { token });
}

// async function onMessageReceived(message) {
//   console.log('title = ' + message.notification.title)
//   console.log('body = ' + message.notification.body)
//   await notifee.displayNotification({
//     title: message.notification.title,
//     body: message.notification.body,
//     android: {
//       channelId: '1',
//       smallIcon: 'ic_launcher',
//     },
//   });
// }



async function onMessageReceived(message) {
  // Create a channel
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channels',
    importance: AndroidImportance.HIGH,
    visibility: AndroidVisibility.PUBLIC,
    // asForegroundService: true,
  });

  // Display a notification
  await notifee.displayNotification({
    title: message.notification.title,
    body: message.notification.body,
    android: {
      channelId,
      smallIcon: 'ic_launcher',
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
      // asForegroundService: true,
    },
  });
}

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);

const Stack = createStackNavigator();

const getHeaderTitle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? '首頁';

  switch (routeName) {
    case '首頁':
      return 'Home';
    case 'Discover':
      return 'Discover';
    case 'Notification':
      return 'Notification';
    case 'Profile':
      return 'My Profile';
  }
};

const App = ({navigation}) => {
  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('token ' + token)

    // messaging() 
    // .unsubscribeFromTopic('weather')
    // .then(() => console.log('unSubscribed to topic!'));
  }

  getToken();
    return (
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator
            // initialRouteName="DiscoverScreen"
            initialRouteName="IndexScreen"
            // initialRouteName="Login"
          >
            {/* LoginScreen */}
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
            {/* Main Tab */}
            <Stack.Screen name="HomeScreen" component={HomeScreen}  options={{...TransitionPresets.SlideFromRightIOS, headerShown: true, 
              title: '查看活動',
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerTintColor: 'white',
            }}/>

            {/* SignUpScreen */}
            <Stack.Screen name="SignUp" component={SignUpScreen}  options={{...TransitionPresets.ModalSlideFromBottomIOS, headerShown: false}}/>

            {/* EventContentScreen */}
            <Stack.Screen name="EventContentScreen" component={EventContentScreen}  options={{...TransitionPresets.SlideFromRightIOS, headerShown: true, 
              title: '',
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerTintColor: 'white',
            }}/>

            {/* savedEventScreen */}
            <Stack.Screen name="SavedEventScreen" component={SavedEventScreen}  options={{...TransitionPresets.SlideFromRightIOS, headerShown: true, 
              title: '我的收藏',
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerTintColor: 'white',
            }}/>

            {/* savedEventScreen */}
            <Stack.Screen name="dummyScreen" component={dummyScreen}  options={{...TransitionPresets.SlideFromRightIOS, headerShown: true, 
              title: 'Mail',
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerTintColor: 'white',
            }}/>

            <Stack.Screen name="DiscoverScreen" component={DiscoverScreen}  options={{...TransitionPresets.SlideFromRightIOS, headerShown: true, 
              title: '查看訂閲',
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerTintColor: 'white',
            }}/>

            <Stack.Screen name="NotificationScreen" component={NotificationScreen}  options={{...TransitionPresets.SlideFromRightIOS, headerShown: true, 
              title: 'Mail',
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerTintColor: 'white',
            }}/>



            {/* Below ---> In Development */}
            {/* AboutUsScreen */}
            <Stack.Screen name="AboutUsScreen" component={AboutUsScreen}  options={{...TransitionPresets.SlideFromRightIOS, headerShown: true, 
              title: '關於我們',
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerTintColor: 'white',
            }}/>

            {/* IndexScreen */}
            <Stack.Screen name="IndexScreen" component={IndexScreen}
            options={({ navigation }) => ({
              ...TransitionPresets.SlideFromRightIOS,
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerShown: true, 
              title: '老派人生學習趣',
              headerTintColor: 'white',
              headerRight: () => (
                <TouchableOpacity>
                   <View style={{marginRight: 20}}>
                     <Icon name="mail" color={colors.white} size={30} type="materialicons" onPress={()=> navigation.navigate('NotificationScreen')} />
                   </View>
                 </TouchableOpacity>
              ),
            })}
            // options={{...TransitionPresets.SlideFromRightIOS, headerShown: true, 
            //   title: ' 老派人生學習趣',
            //   headerStyle: {
            //     backgroundColor: colors.primary,
            //   },
            //   headerRight: () => (
            //     <TouchableOpacity>
            //       <View style={{marginRight: 15}}>
            //         <Icon name="mail" color={colors.white} size={26} type="materialicons" onPress={()=> navigation.navigate('NotificationScreen')} />
            //       </View>
            //     </TouchableOpacity>
            //   ),
            //   headerTintColor: 'white',
            // }}
            />

            {/* MuseumScreen */}
            <Stack.Screen name="MuseumScreen" component={MuseumScreen}  options={{...TransitionPresets.SlideFromRightIOS, headerShown: true, 
              title: '地點一覽表',
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerTintColor: 'white',
            }}/>

            {/* AboutUsScreen */}
            <Stack.Screen name="SearchScreen" component={SearchScreen}  options={{...TransitionPresets.SlideFromRightIOS, headerShown: true, 
              title: '進階搜尋',
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerTintColor: 'white',
            }}/>

            {/* ProfileScreen */}
            <Stack.Screen name="ProfileScreen" component={ProfileScreen}  options={{...TransitionPresets.SlideFromRightIOS, headerShown: true, 
              title: '編輯個資',
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerTintColor: 'white',
            }}/>


          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    );
};

export default App;
