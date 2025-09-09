// ZakatScreen.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome5"; // ✅ Back arrow
import DonationBox from "../components/DonationBox";

const ZakatScreen = () => {
  const navigation = useNavigation();
  const [cash, setCash] = useState("");
  const [gold, setGold] = useState("");
  const [silver, setSilver] = useState("");
  const [business, setBusiness] = useState("");
  const [zakat, setZakat] = useState<number | null>(null);

  // Load saved data
  useEffect(() => {
    (async () => {
      try {
        const [savedCash, savedGold, savedSilver, savedBusiness, savedZakat] =
          await Promise.all([
            AsyncStorage.getItem("zakatCash"),
            AsyncStorage.getItem("zakatGold"),
            AsyncStorage.getItem("zakatSilver"),
            AsyncStorage.getItem("zakatBusiness"),
            AsyncStorage.getItem("zakatResult"),
          ]);
        if (savedCash) setCash(savedCash);
        if (savedGold) setGold(savedGold);
        if (savedSilver) setSilver(savedSilver);
        if (savedBusiness) setBusiness(savedBusiness);
        if (savedZakat) setZakat(parseFloat(savedZakat));
      } catch (err) {
        console.log("Error loading Zakat data:", err);
      }
    })();
  }, []);

  const handleChange = async (
    setter: React.Dispatch<React.SetStateAction<string>>,
    key: string,
    value: string
  ) => {
    setter(value);
    try {
      await AsyncStorage.setItem(key, value);
    } catch (err) {
      console.log("Error saving:", err);
    }
  };

  const calculateZakat = async () => {
    const cashValue = parseFloat(cash) || 0;
    const goldValue = parseFloat(gold) || 0;
    const silverValue = parseFloat(silver) || 0;
    const businessValue = parseFloat(business) || 0;

    if (cashValue + goldValue + silverValue + businessValue <= 0) {
      Alert.alert("Error", "Please enter at least one value");
      return;
    }

    const totalWealth = cashValue + goldValue + silverValue + businessValue;
    const zakatAmount = totalWealth * 0.025;
    setZakat(zakatAmount);

    try {
      await AsyncStorage.setItem("zakatResult", zakatAmount.toString());
    } catch (err) {
      console.log("Error saving zakatResult:", err);
    }
  };

  const clearAll = async () => {
    setCash("");
    setGold("");
    setSilver("");
    setBusiness("");
    setZakat(null);
    try {
      await AsyncStorage.multiRemove([
        "zakatCash",
        "zakatGold",
        "zakatSilver",
        "zakatBusiness",
        "zakatResult",
      ]);
    } catch (err) {
      console.log("Error clearing AsyncStorage:", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔹 Gradient Top Bar with Back Icon */}
      <LinearGradient colors={["#0984e3", "#74b9ff"]} style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.topBarText}>Zakat Calculator</Text>
      </LinearGradient>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.label}>💵 Cash Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter cash amount"
            keyboardType="numeric"
            value={cash}
            onChangeText={(text) => handleChange(setCash, "zakatCash", text)}
          />

          <Text style={styles.label}>🥇 Gold Value</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter gold value"
            keyboardType="numeric"
            value={gold}
            onChangeText={(text) => handleChange(setGold, "zakatGold", text)}
          />

          <Text style={styles.label}>🥈 Silver Value</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter silver value"
            keyboardType="numeric"
            value={silver}
            onChangeText={(text) => handleChange(setSilver, "zakatSilver", text)}
          />

          <Text style={styles.label}>🏢 Business Assets</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter business value"
            keyboardType="numeric"
            value={business}
            onChangeText={(text) => handleChange(setBusiness, "zakatBusiness", text)}
          />

          <TouchableOpacity onPress={calculateZakat}>
            <LinearGradient colors={["#0984e3", "#74b9ff"]} style={styles.button}>
              <Text style={styles.buttonText}>Calculate Zakat</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={clearAll} style={{ alignSelf: "flex-end", marginTop: 10 }}>
            <LinearGradient colors={["#d63031", "#ff7675"]} style={styles.clearButton}>
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Clear</Text>
            </LinearGradient>
          </TouchableOpacity>

          {zakat !== null && (
            <View style={styles.resultBox}>
              <Text style={styles.resultText}>Total Zakat to pay: ₹{zakat.toFixed(2)}</Text>
            </View>
          )}

          <DonationBox />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E0F7FA" }, // ✅ Light cyan background
  topBar: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
  },
  backButton: { marginRight: 10 },
  topBarText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  scrollContainer: { padding: 20 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 8, marginTop: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#fff",
    elevation: 2,
  },
  button: { padding: 15, borderRadius: 10, marginTop: 30, alignItems: "center", elevation: 3 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  clearButton: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 8 },
  resultBox: { marginTop: 30, padding: 20, borderRadius: 12, backgroundColor: "#d4edda", elevation: 3 },
  resultText: { fontSize: 20, color: "#155724", textAlign: "center", fontWeight: "bold" },
});

export default ZakatScreen;
