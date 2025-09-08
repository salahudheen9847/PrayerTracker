import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  name: string;
  missed: number;
  completed: number;
  itemType: "Prayer" | "Fast";
  onMissed: () => void;
  onCompleted: () => void;
  onClear: () => void;
};

const PrayerCard = ({
  name,
  missed,
  completed,
  itemType,
  onMissed,
  onCompleted,
  onClear,
}: Props) => {
  const balance = missed - completed;
  const title = itemType === "Prayer" ? name : name + " Fast";

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.stat}>Missed: {missed}</Text>
      <Text style={styles.stat}>Completed: {completed}</Text>
      <Text
        style={[
          styles.stat,
          balance > 0 ? styles.bad : balance < 0 ? styles.good : styles.neutral,
        ]}
      >
        Balance: {balance}
      </Text>

      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.btn, { backgroundColor: "#e74c3c" }]} onPress={onMissed}>
          <Text style={styles.btnText}>+ Missed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { backgroundColor: "#27ae60" }]} onPress={onCompleted}>
          <Text style={styles.btnText}>+ Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { backgroundColor: "#2980b9" }]} onPress={onClear}>
          <Text style={styles.btnText}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#34495e", // professional dark background
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ecf0f1",
    marginBottom: 8,
  },
  stat: {
    fontSize: 14,
    color: "#bdc3c7",
    marginBottom: 4,
  },
  good: { color: "#2ecc71", fontWeight: "bold" },
  bad: { color: "#e74c3c", fontWeight: "bold" },
  neutral: { color: "#f1c40f", fontWeight: "bold" },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
  },
});

export default PrayerCard;
