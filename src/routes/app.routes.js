import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TabRoutes from './tab.routes';

const App = createStackNavigator();

const AppRoutes = () => (
  <App.Navigator
    initialRouteName="MainBottom"
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#292929' },
    }}
  >
    <App.Screen
      options={{headerShown: false}}
      name="MainBottom"
      component={TabRoutes} 
    />
  </App.Navigator>
);

export default AppRoutes;
