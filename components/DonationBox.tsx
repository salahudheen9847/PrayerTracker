import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles";

const DonationBox = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>💝 Support the Project</Text>
      <Text style={styles.stat}>📞 Phone: +91 97455 25150</Text>
      <Text style={styles.stat}>You can send donations via Google Pay / PhonePe to this number.</Text>
    </View>
  );
};

export default DonationBox;
