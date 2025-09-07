import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, FlatList, Text } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { styles } from "./styles";
import PrayerCard from "./components/PrayerCard";
import FastCard from "./components/FastCard";
import HistoryList from "./components/HistoryList";
import DonationBox from "./components/DonationBox";

// Types
type Prayer = { name: string; missed: number; completed: number };
type Fast = { type: string; missed: number; completed: number };
export type HistoryItem = { date: string; name: string; status: "Missed" | "Completed" };

export default function App() {
  const [prayers, setPrayers] = useState<Prayer[]>([
    { name: "Fajr", missed: 0, completed: 0 },
    { name: "Dhuhr", missed: 0, completed: 0 },
    { name: "Asr", missed: 0, completed: 0 },
    { name: "Maghrib", missed: 0, completed: 0 },
    { name: "Isha", missed: 0, completed: 0 },
  ]);

  const [fasts, setFasts] = useState<Fast[]>([
    { type: "Ramadan", missed: 0, completed: 0 },
    { type: "Nafl", missed: 0, completed: 0 },
  ]);

  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  // Update tracker
  const updateTracker = (
    itemType: "Prayer" | "Fast",
    name: string,
    status: "missed" | "completed"
  ) => {
    if (itemType === "Prayer") {
      setPrayers((prev) =>
        prev.map((p) => {
          if (p.name !== name) return p;
          if (status === "missed") return { ...p, missed: p.missed + 1 };
          if (p.completed < p.missed) return { ...p, completed: p.completed + 1 };
          return p;
        })
      );
    } else {
      setFasts((prev) =>
        prev.map((f) => {
          if (f.type !== name) return f;
          if (status === "missed") return { ...f, missed: f.missed + 1 };
          if (f.completed < f.missed) return { ...f, completed: f.completed + 1 };
          return f;
        })
      );
    }

    // Add to history
    setHistory((prev) => [
      ...prev,
      {
        date: new Date().toLocaleDateString(),
        name: name + (itemType === "Fast" ? " Fast" : ""),
        status: status === "missed" ? "Missed" : "Completed",
      },
    ]);
  };

  // Clear tracker
  const clearItem = (itemType: "Prayer" | "Fast", name: string) => {
    if (itemType === "Prayer") {
      setPrayers((prev) =>
        prev.map((p) =>
          p.name === name ? { ...p, missed: 0, completed: 0 } : p
        )
      );
    } else {
      setFasts((prev) =>
        prev.map((f) =>
          f.type === name ? { ...f, missed: 0, completed: 0 } : f
        )
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Islamic Tracker</Text>

        <FlatList
          data={prayers}
          renderItem={({ item }) => (
            <PrayerCard
              name={item.name}
              missed={item.missed}
              completed={item.completed}
              itemType="Prayer"
              onMissed={() => updateTracker("Prayer", item.name, "missed")}
              onCompleted={() => updateTracker("Prayer", item.name, "completed")}
              onClear={() => clearItem("Prayer", item.name)}
            />
          )}
          keyExtractor={(item) => item.name}
          scrollEnabled={false}
        />

        <FlatList
          data={fasts}
          renderItem={({ item }) => (
            <FastCard
              type={item.type}
              missed={item.missed}
              completed={item.completed}
              itemType="Fast"
              onMissed={() => updateTracker("Fast", item.type, "missed")}
              onCompleted={() => updateTracker("Fast", item.type, "completed")}
              onClear={() => clearItem("Fast", item.type)}
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
