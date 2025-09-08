import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, FlatList, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SplashScreen from "react-native-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../styles";
import PrayerCard from "../components/PrayerCard";
import HistoryList from "../components/HistoryList";
import DonationBox from "../components/DonationBox";

type Prayer = { name: string; missed: number; completed: number };
export type HistoryItem = { date: string; name: string; status: "Missed" | "Completed" };

export default function PrayerTracker() {
  const navigation = useNavigation<any>();
  const [prayers, setPrayers] = useState<Prayer[]>([
    { name: "Fajr", missed: 0, completed: 0 },
    { name: "Dhuhr", missed: 0, completed: 0 },
    { name: "Asr", missed: 0, completed: 0 },
    { name: "Maghrib", missed: 0, completed: 0 },
    { name: "Isha", missed: 0, completed: 0 },
  ]);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    SplashScreen.hide();
    (async () => {
      try {
        const savedPrayers = await AsyncStorage.getItem("prayers");
        const savedHistory = await AsyncStorage.getItem("history");
        if (savedPrayers) setPrayers(JSON.parse(savedPrayers));
        if (savedHistory) setHistory(JSON.parse(savedHistory));
      } catch (err) {
        console.log("Error loading data:", err);
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("prayers", JSON.stringify(prayers));
    AsyncStorage.setItem("history", JSON.stringify(history));
  }, [prayers, history]);

  const updateTracker = (name: string, status: "missed" | "completed") => {
    setPrayers((prev) =>
      prev.map((p) => {
        if (p.name !== name) return p;

        let updated = { ...p };
        if (status === "missed") updated.missed += 1;
        else if (status === "completed" && updated.completed < updated.missed) updated.completed += 1;

        const balance = updated.completed - updated.missed;

        if (balance !== 0) {
          setHistory((prevHistory) => [
            ...prevHistory,
            {
              date: new Date().toLocaleDateString(),
              name,
              status: status === "missed" ? "Missed" : "Completed",
            },
          ]);
        }

        return updated;
      })
    );
  };

  const clearItem = (name: string) => {
    setPrayers((prev) =>
      prev.map((p) => (p.name === name ? { ...p, missed: 0, completed: 0 } : p))
    );
    setHistory((prev) => prev.filter((h) => h.name !== name));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Bigger Bold Arrow Only */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 40, fontWeight: "bold", color: "#0984e3" }}>←</Text>
        </TouchableOpacity>

        <Text style={styles.header}>Prayer Tracker</Text>

        <FlatList
          data={prayers}
          renderItem={({ item }) => (
            <PrayerCard
              name={item.name}
              missed={item.missed}
              completed={item.completed}
              itemType="Prayer"
              onMissed={() => updateTracker(item.name, "missed")}
              onCompleted={() => updateTracker(item.name, "completed")}
              onClear={() => clearItem(item.name)}
            />
          )}
          keyExtractor={(item) => item.name}
          scrollEnabled={false}
        />

        <HistoryList history={history} />

        <DonationBox />
      </ScrollView>
    </SafeAreaView>
  );
}
