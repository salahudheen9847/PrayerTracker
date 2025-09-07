import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  PrayerTracker: undefined;
  FastTracker: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Islamic Tracker</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#6c5ce7" }]}
        onPress={() => navigation.navigate("PrayerTracker")}
      >
        <Text style={styles.buttonText}>Prayer Tracker</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#00b894" }]}
        onPress={() => navigation.navigate("FastTracker")}
      >
        <Text style={styles.buttonText}>Fast Tracker</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f6fa",
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 60,
    color: "#2d3436",
  },
  button: {
    width: 260,          // bigger width
    paddingVertical: 22, // bigger height
    borderRadius: 60,    // more round
    alignItems: "center",
    marginVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
