import React from "react";
import { View, Text, StyleSheet, Linking, TouchableOpacity } from "react-native";

const DonationBox = () => {
  const phoneNumber = "+919745525150";

  const handleCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Support Us</Text>
      <Text style={styles.description}>
        Your contribution helps maintain Islamic apps and supports social work for the needy.
      </Text>

      <TouchableOpacity onPress={handleCall} style={styles.button}>
        <Text style={styles.buttonText}>📞 {phoneNumber}</Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        You can also send donations via Google Pay / PhonePe using the above number.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  description: {
    fontSize: 12,
    marginBottom: 6,
    color: "#555",
  },
  button: {
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#333",
    marginBottom: 6,
  },
  buttonText: {
    color: "#333",
    fontWeight: "500",
    textAlign: "center",
    fontSize: 12,
  },
  note: {
    fontSize: 10,
    color: "#555",
    fontStyle: "italic",
  },
});

export default DonationBox;
