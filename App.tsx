import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

type Prayer = { name: string; missed: number; completed: number };
type Fast = { type: string; missed: number; completed: number };
type HistoryItem = { date: string; name: string; status: "Missed" | "Completed" };

export default function App() {
  const prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  const initialPrayers: Prayer[] = prayerNames.map((p) => ({ name: p, missed: 0, completed: 0 }));
  const initialFasts: Fast[] = [
    { type: "Ramadan", missed: 0, completed: 0 },
    { type: "Nafl", missed: 0, completed: 0 },
  ];

  const [prayers, setPrayers] = useState<Prayer[]>(initialPrayers);
  const [fasts, setFasts] = useState<Fast[]>(initialFasts);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // 🔹 Load saved data
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedPrayers = await AsyncStorage.getItem("prayers-data");
        const savedFasts = await AsyncStorage.getItem("fasts-data");
        const savedHistory = await AsyncStorage.getItem("history-data");
        if (savedPrayers) setPrayers(JSON.parse(savedPrayers));
        if (savedFasts) setFasts(JSON.parse(savedFasts));
        if (savedHistory) setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.log("Error loading data", e);
      }
    };
    loadData();
  }, []);

  // 🔹 Save data whenever changed
  useEffect(() => {
    AsyncStorage.setItem("prayers-data", JSON.stringify(prayers));
    AsyncStorage.setItem("fasts-data", JSON.stringify(fasts));
    AsyncStorage.setItem("history-data", JSON.stringify(history));
  }, [prayers, fasts, history]);

  // 🔹 Update tracker
  const updateTracker = (itemType: "Prayer" | "Fast", name: string, status: "missed" | "completed") => {
    if (itemType === "Prayer") {
      setPrayers((prev) =>
        prev.map((p) => {
          if (p.name !== name) return p;
          if (status === "missed") return { ...p, missed: p.missed + 1 };
          if (p.completed < p.missed) return { ...p, completed: p.completed + 1 };
          return p;
        })
      );

      setHistory((prev) => [
        ...prev,
        { date: new Date().toLocaleDateString(), name, status: status === "missed" ? "Missed" : "Completed" },
      ]);
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
  };

  // 🔹 Clear tracker
  const clearItem = (itemType: "Prayer" | "Fast", name: string) => {
    if (itemType === "Prayer") {
      setPrayers((prev) => prev.map((p) => (p.name === name ? { ...p, missed: 0, completed: 0 } : p)));
    } else {
      setFasts((prev) => prev.map((f) => (f.type === name ? { ...f, missed: 0, completed: 0 } : f)));
    }
  };

  // 🔹 Prayer colors
  const prayerColors: { [key: string]: string } = {
    Fajr: "#a8dadc",
    Dhuhr: "#ffe066",
    Asr: "#ffadad",
    Maghrib: "#cdb4db",
    Isha: "#90be6d",
  };

  // 🔹 Render card
  const renderCard = (item: Prayer | Fast, itemType: "Prayer" | "Fast") => {
    const missed = itemType === "Prayer" ? (item as Prayer).missed : (item as Fast).missed;
    const completed = itemType === "Prayer" ? (item as Prayer).completed : (item as Fast).completed;
    const balance = missed - completed;
    const bgColor = itemType === "Prayer"
      ? prayerColors[(item as Prayer).name] || "#ffffff"
      : (item as Fast).type === "Ramadan" ? "#ffe4b3" : "#d1f2eb";
    const name = itemType === "Prayer" ? (item as Prayer).name : (item as Fast).type;
    const title = itemType === "Prayer" ? name : name + " Fast";

    return (
      <View style={[styles.card, { backgroundColor: bgColor }]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.stat}>Missed: {missed}</Text>
        <Text style={styles.stat}>Completed: {completed}</Text>
        <Text style={[styles.stat, balance > 0 ? styles.bad : styles.good]}>Balance: {balance}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity style={[styles.btn, { backgroundColor: "#f7b267" }]} onPress={() => updateTracker(itemType, name, "missed")}>
            <Text style={styles.btnText}>+ Missed</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, { backgroundColor: "#6ab04c" }]} onPress={() => updateTracker(itemType, name, "completed")}>
            <Text style={styles.btnText}>+ Completed</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, { backgroundColor: "#eb4d4b" }]} onPress={() => clearItem(itemType, name)}>
            <Text style={styles.btnText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // 🔹 Donation section
  const DonationSection = () => (
    <View style={styles.donationBox}>
      <Text style={styles.donationInfo}>Donate via Google Pay / PhonePe: +91 97455 25150</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Islamic Tracker</Text>

        <Text style={styles.subHeader}>Prayer Tracker</Text>
        <FlatList data={prayers} renderItem={({ item }) => renderCard(item, "Prayer")} keyExtractor={(item) => item.name} scrollEnabled={false} />

        <Text style={styles.subHeader}>Fasting Tracker</Text>
        <FlatList data={fasts} renderItem={({ item }) => renderCard(item, "Fast")} keyExtractor={(item) => item.type} scrollEnabled={false} />

        <View style={styles.historyContainer}>
          <Text style={styles.subHeader}>History (Last 10)</Text>
          {history.slice(-10).reverse().map((h, i) => (
            <Text key={i} style={styles.stat}>- {h.date} → {h.name} {h.status}</Text>
          ))}
        </View>

        <DonationSection />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f0f4f8" },
  header: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 16, color: "#2c3e50" },
  subHeader: { fontSize: 20, fontWeight: "600", marginTop: 16, marginBottom: 8, color: "#34495e" },
  card: { padding: 16, marginBottom: 12, borderRadius: 12, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 3 }, shadowRadius: 6, elevation: 5 },
  title: { fontSize: 22, fontWeight: "600", marginBottom: 8, color: "#2d3436" },
  stat: { fontSize: 16, marginVertical: 2, color: "#2d3436" },
  bad: { color: "#eb4d4b", fontWeight: "bold" },
  good: { color: "#6ab04c", fontWeight: "bold" },
  buttons: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  btn: { flex: 1, padding: 12, marginHorizontal: 4, borderRadius: 8, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "600" },
  historyContainer: { marginTop: 16, marginBottom: 20 },
  donationBox: { marginTop: 16, padding: 12, borderRadius: 8, backgroundColor: "#d6a2e8", alignItems: "center" },
  donationInfo: { fontSize: 16, color: "#2c003e", fontWeight: "600" },
});
