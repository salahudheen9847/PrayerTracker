import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";

import HomeScreen from "./screens/HomeScreen";
import PrayerTracker from "./screens/PrayerTracker";
import FastTracker from "./screens/FastTracker";
import AssetReceivableScreen from "./screens/AssetReceivableScreen";
import LiabilityPayableScreen from "./screens/LiabilityPayableScreen";
import ZakatScreen from "./screens/ZakatScreen";
import HajjTrackerScreen from "./screens/HajjTrackerScreen";
import UmrahTrackerScreen from "./screens/UmrahTrackerScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
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
          <Stack.Screen name="Zakat" component={ZakatScreen} />
          <Stack.Screen name="HajjTracker" component={HajjTrackerScreen} />
          <Stack.Screen name="UmrahTracker" component={UmrahTrackerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
