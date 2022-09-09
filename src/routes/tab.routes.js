import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import Home from '../pages/Home';
import SignOut from '../pages/SignOut';
import NewReport from '../pages/NewReport';

const Tab = createBottomTabNavigator();

const TabRoutes = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#292929",
          paddingTop: 8,
        },
      }}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                }}>
                <Icon
                  name={"power"}
                  size={25}
                  color={focused ? '#566DE3' : '#666360'}
                />
              </View>
            )
        }}
        name="SignOut"
        component={SignOut}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                }}>
                <Icon
                  name={"home"}
                  size={25}
                  color={focused ? '#566DE3' : '#666360'}
                />
              </View>
            )
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                }}>
                <Icon
                  name={"plus-square"}
                  size={25}
                  color={focused ? '#566DE3' : '#666360'}
                />
              </View>
            )
        }}
        name="NewReport"
        component={NewReport}
      />
    </Tab.Navigator>
  );
};

export default TabRoutes;
