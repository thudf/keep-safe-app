import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from './src/hooks';

import Routes from './src/routes';

export default function App() {

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#292929" translucent />
      <AppProvider>
        <View style={{ flex: 1, backgroundColor: '#292929' }}>
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
}
