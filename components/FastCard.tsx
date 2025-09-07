// components/FastCard.tsx
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

type FastCardProps = {
  type: string;
  missed: number;
  completed: number;
  itemType: "Fast";
  onMissed: () => void;
  onCompleted: () => void;
  onClear: () => void;
};

const FastCard: React.FC<FastCardProps> = ({
  type,
  missed,
  completed,
  itemType,
  onMissed,
  onCompleted,
  onClear,
}) => {
  const balance = completed - missed; // Balance calculation

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{type}</Text>
      <Text style={styles.stats}>Missed: {missed}</Text>
      <Text style={styles.stats}>Completed: {completed}</Text>
      <Text style={styles.balance}>Balance: {balance}</Text> {/* Display balance */}
      <View style={styles.buttonContainer}>
        <Button title="Missed" onPress={onMissed} color="#e74c3c" />
        <Button title="Completed" onPress={onCompleted} color="#2ecc71" />
        <Button title="Clear" onPress={onClear} color="#3498db" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#f9c74f",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#fff",
  },
  stats: {
    fontSize: 16,
    marginBottom: 4,
    color: "#fff",
  },
  balance: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 6,
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default FastCard;
