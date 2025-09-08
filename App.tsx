// App.tsx
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "react-native-splash-screen";

import HomeScreen from "./screens/HomeScreen";
import PrayerTracker from "./screens/PrayerTracker";
import FastTracker from "./screens/FastTracker";
import AssetReceivableScreen from "./screens/AssetReceivableScreen";
import LiabilityPayableScreen from "./screens/LiabilityPayableScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PrayerTracker" component={PrayerTracker} />
        <Stack.Screen name="FastTracker" component={FastTracker} />
        <Stack.Screen name="AssetReceivable" component={AssetReceivableScreen} />
        <Stack.Screen name="LiabilityPayable" component={LiabilityPayableScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
