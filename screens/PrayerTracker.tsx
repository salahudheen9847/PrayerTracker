import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, FlatList, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SplashScreen from "react-native-splash-screen";
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

  useEffect(() => { SplashScreen.hide(); }, []);

  const updateTracker = (name: string, status: "missed" | "completed") => {
    setPrayers((prev) =>
      prev.map((p) => {
        if (p.name !== name) return p;

        let updated = { ...p };
        if (status === "missed") updated.missed += 1;
        else if (status === "completed" && updated.completed < updated.missed) updated.completed += 1;

        const balance = updated.completed - updated.missed;

        // Only add to history if balance is not zero
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            marginBottom: 16,
            padding: 14,
            backgroundColor: "#0984e3",
            borderRadius: 50,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>← Back</Text>
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
