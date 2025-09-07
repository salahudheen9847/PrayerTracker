import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles";

type Props = {
  name: string;
  missed: number;
  completed: number;
  itemType: "Fast";
  onMissed: () => void;
  onCompleted: () => void;
  onClear: () => void;
};

const FastCard: React.FC<Props> = ({
  name,
  missed,
  completed,
  itemType,
  onMissed,
  onCompleted,
  onClear,
}) => {
  const balance = missed - completed;
  const title = name + " Fast";

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
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#d63031" }]}
          onPress={onMissed}
        >
          <Text style={styles.btnText}>+ Missed</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#00b894" }]}
          onPress={onCompleted}
        >
          <Text style={styles.btnText}>+ Completed</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#0984e3" }]}
          onPress={onClear}
        >
          <Text style={styles.btnText}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FastCard;
