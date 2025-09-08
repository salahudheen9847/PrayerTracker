import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export type HistoryItem = {
  date: string;
  name: string;
  status: "Missed" | "Completed";
};

type Props = {
  history: HistoryItem[];
};

const HistoryList: React.FC<Props> = ({ history }) => {
  const last10 = history.slice(-10).reverse();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>History (Last 10)</Text>
      {last10.length === 0 ? (
        <Text style={styles.noHistory}>No history yet</Text>
      ) : (
        <ScrollView>
          {last10.map((h, i) => (
            <View
              key={i}
              style={[
                styles.item,
                h.status === "Missed"
                  ? styles.missed
                  : styles.completed,
              ]}
            >
              <Text style={styles.date}>{h.date}</Text>
              <Text style={styles.text}>
                {h.name} - {h.status}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#2c3e50",
  },
  noHistory: {
    fontSize: 14,
    color: "#7f8c8d",
    fontStyle: "italic",
  },
  item: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: "#ecf0f1",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  missed: {
    borderLeftWidth: 4,
    borderLeftColor: "#e74c3c",
  },
  completed: {
    borderLeftWidth: 4,
    borderLeftColor: "#27ae60",
  },
  date: {
    fontSize: 12,
    color: "#7f8c8d",
  },
  text: {
    fontSize: 14,
    color: "#2c3e50",
    fontWeight: "500",
  },
});

export default HistoryList;
