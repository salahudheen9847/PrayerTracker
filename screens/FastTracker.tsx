import React, { useState, useEffect } from "react";
import { ScrollView, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import SplashScreen from "react-native-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";
import { styles } from "../styles";
import FastCard from "../components/FastCard";
import HistoryList from "../components/HistoryList";
import DonationBox from "../components/DonationBox";

type Fast = { type: string; missed: number; completed: number };
export type HistoryItem = { date: string; name: string; status: "Missed" | "Completed" };

export default function FastTracker() {
  const navigation = useNavigation<any>();
  const [fasts, setFasts] = useState<Fast[]>([
    { type: "Ramadan", missed: 0, completed: 0 },
    { type: "Nafl", missed: 0, completed: 0 },
  ]);

  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load saved data
  useEffect(() => {
    SplashScreen.hide();
    (async () => {
      try {
        const savedFasts = await AsyncStorage.getItem("fasts");
        const savedHistory = await AsyncStorage.getItem("fastHistory");
        if (savedFasts) setFasts(JSON.parse(savedFasts));
        if (savedHistory) setHistory(JSON.parse(savedHistory));
      } catch (err) {
        console.log("Error loading data:", err);
      }
    })();
  }, []);

  // Save whenever fasts or history change
  useEffect(() => {
    AsyncStorage.setItem("fasts", JSON.stringify(fasts));
    AsyncStorage.setItem("fastHistory", JSON.stringify(history));
  }, [fasts, history]);

  const updateTracker = (name: string, status: "missed" | "completed") => {
    setFasts((prev) =>
      prev.map((f) => {
        if (f.type !== name) return f;

        let updated = { ...f };
        if (status === "missed") updated.missed += 1;
        else if (status === "completed" && updated.completed < updated.missed)
          updated.completed += 1;

        setHistory((prevHistory) => [
          ...prevHistory,
          {
            date: new Date().toLocaleDateString(),
            name: name + " Fast",
            status: status === "missed" ? "Missed" : "Completed",
          },
        ]);

        return updated;
      })
    );
  };

  const clearItem = (name: string) => {
    setFasts((prev) =>
      prev.map((f) => (f.type === name ? { ...f, missed: 0, completed: 0 } : f))
    );
    setHistory((prev) => prev.filter((h) => !h.name.startsWith(name)));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔹 Top Bar */}
      <LinearGradient colors={["#00b894", "#019267"]} style={localStyles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={localStyles.backButton}>
          <Text style={localStyles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={localStyles.topBarText}>Fast Tracker</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 30 }}>
        <FlatList
          data={fasts}
          renderItem={({ item }) => (
            <FastCard
              type={item.type}
              missed={item.missed}
              completed={item.completed}
              itemType="Fast"
              onMissed={() => updateTracker(item.type, "missed")}
              onCompleted={() => updateTracker(item.type, "completed")}
              onClear={() => clearItem(item.type)}
            />
          )}
          keyExtractor={(item) => item.type}
          scrollEnabled={false}
        />

        <HistoryList history={history} />

        <DonationBox />
      </ScrollView>
    </SafeAreaView>
  );
}

// 🔹 Local styles for professional look
const localStyles = StyleSheet.create({
  topBar: {
    width: "100%",
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    marginBottom: 12,
    flexDirection: "row",
  },
  topBarText: {
    fontSize: 29,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    left: 20,
    justifyContent: "center",
    height: "100%",
  },
  backArrow: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#fff",
  },
});
