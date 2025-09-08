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
  const balance = missed - completed;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{String(type)}</Text>
      <Text style={styles.stats}>Missed: {missed}</Text>
      <Text style={styles.stats}>Completed: {completed}</Text>
      <Text style={styles.balance}>
        Balance:{" "}
        {balance > 0
          ? `-${balance}`
          : balance === 0
          ? "0"
          : `+${Math.abs(balance)}`}
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Missed" onPress={onMissed} color="#e74c3c" />
        <Button title="Completed" onPress={onCompleted} color="#27ae60" />
        <Button title="Clear" onPress={onClear} color="#2980b9" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#34495e", // professional dark blue/gray
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#ecf0f1", // soft white
  },
  stats: {
    fontSize: 16,
    marginBottom: 4,
    color: "#bdc3c7", // light gray
  },
  balance: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 6,
    color: "#ecf0f1",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default FastCard;
