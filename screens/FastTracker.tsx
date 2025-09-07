import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, FlatList, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SplashScreen from "react-native-splash-screen";
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

  useEffect(() => { SplashScreen.hide(); }, []);

  const updateTracker = (name: string, status: "missed" | "completed") => {
    setFasts((prev) =>
      prev.map((f) => {
        if (f.type !== name) return f;

        let updated = { ...f };
        if (status === "missed") updated.missed += 1;
        else if (status === "completed" && updated.completed < updated.missed) updated.completed += 1;

        const balance = updated.completed - updated.missed;

        // Only add to history if balance is not zero
        if (balance !== 0) {
          setHistory((prevHistory) => [
            ...prevHistory,
            {
              date: new Date().toLocaleDateString(),
              name: name + " Fast",
              status: status === "missed" ? "Missed" : "Completed",
            },
          ]);
        }

        return updated;
      })
    );
  };

  const clearItem = (name: string) => {
    setFasts((prev) =>
      prev.map((f) => (f.type === name ? { ...f, missed: 0, completed: 0 } : f))
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

        <Text style={styles.header}>Fast Tracker</Text>

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
