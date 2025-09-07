import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles";

export type HistoryItem = {
  date: string;
  name: string;
  status: "Missed" | "Completed";
};

type Props = {
  history: HistoryItem[];
};

const HistoryList: React.FC<Props> = ({ history }) => {
  return (
    <View style={{ marginTop: 16 }}>
      <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>History (Last 10)</Text>
      {history.length === 0 ? (
        <Text>No history yet</Text>
      ) : (
        history
          .slice(-10)
          .reverse()
          .map((h, i) => (
            <Text key={i} style={styles.historyText}>
              • {h.date} → {h.name} {h.status}
            </Text>
          ))
      )}
    </View>
  );
};

export default HistoryList;
