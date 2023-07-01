import React from 'react';
import 'react-native-url-polyfill/auto';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeWindStyleSheet } from 'nativewind';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './store';

import HomeScreen from './app/screens/HomeScreen';
import RestaurantScreen from './app/screens/RestaurantScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

NativeWindStyleSheet.setOutput({
  default: "native",
});