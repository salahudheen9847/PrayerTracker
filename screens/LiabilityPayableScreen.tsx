// LiabilityPayableScreen.tsx
import React, { useState, useEffect, useCallback } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome5"; // ✅ Back arrow icon
import DonationBox from "../components/DonationBox";

type FinanceItem = { name?: string; amount?: number };

export default function LiabilityPayableScreen() {
  const navigation = useNavigation<any>();
  const [items, setItems] = useState<FinanceItem[]>([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const savedItems = await AsyncStorage.getItem("liabilityItems");
      if (savedItems) setItems(JSON.parse(savedItems));
    };
    loadData();
  }, []);

  const saveItems = useCallback(async (newItems: FinanceItem[]) => {
    await AsyncStorage.setItem("liabilityItems", JSON.stringify(newItems));
  }, []);

  const addItem = () => {
    const parsedAmount = amount ? parseFloat(amount) : undefined;
    const newItem: FinanceItem = { name: name || undefined, amount: parsedAmount };

    let updatedItems: FinanceItem[];
    if (editingIndex !== null) {
      updatedItems = [...items];
      updatedItems[editingIndex] = newItem;
      setEditingIndex(null);
    } else {
      updatedItems = [...items, newItem];
    }

    setItems(updatedItems);
    saveItems(updatedItems);

    setName("");
    setAmount("");
  };

  const editItem = (index: number) => {
    const item = items[index];
    setName(item.name || "");
    setAmount(item.amount !== undefined ? item.amount.toString() : "");
    setEditingIndex(index);
  };

  const deleteItem = (index: number) => {
    Alert.alert("Delete Item", "Are you sure you want to delete this item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const updatedItems = items.filter((_, i) => i !== index);
          setItems(updatedItems);
          saveItems(updatedItems);
          if (editingIndex === index) setEditingIndex(null);
        },
      },
    ]);
  };

  const renderItem = useCallback(
    ({ item, index }: { item: FinanceItem; index: number }) => (
      <View style={styles.item}>
        <View>
          <Text style={{ fontWeight: "bold" }}>{item.name || "-"}</Text>
          <Text>{item.amount !== undefined ? `₹ ${item.amount}` : "-"}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => editItem(index)} style={styles.editButton}>
            <Text style={{ color: "#fff" }}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteItem(index)} style={styles.deleteButton}>
            <Text style={{ color: "#fff" }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    ),
    [items, editingIndex]
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        {/* 🔹 Back Arrow Icon */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={28} color="#0984e3" />
        </TouchableOpacity>

        <Text style={styles.header}>Liability & Payable</Text>

        <View style={styles.inputContainer}>
          <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
          <TextInput
            placeholder="Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            style={styles.input}
          />
          <TouchableOpacity onPress={addItem} style={styles.addButton}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              {editingIndex !== null ? "Update" : "Add"}
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={(_, index) => `item-${index}`}
          renderItem={renderItem}
          scrollEnabled={false}
          ListFooterComponent={<DonationBox />}
          ListFooterComponentStyle={{ marginTop: 20 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, backgroundColor: "#E0F7FA" }, // ✅ Light cyan background
  backButton: { marginBottom: 16, padding: 8, alignSelf: "flex-start" },
  header: { fontSize: 28, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  inputContainer: { flexDirection: "row", marginBottom: 20, alignItems: "center" },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", padding: 10, marginRight: 8, borderRadius: 8, backgroundColor: "#fff" },
  addButton: { paddingHorizontal: 16, paddingVertical: 10, backgroundColor: "#0984e3", borderRadius: 8 },
  item: { flexDirection: "row", justifyContent: "space-between", padding: 14, backgroundColor: "#fff", marginBottom: 10, borderRadius: 8, alignItems: "center" },
  editButton: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: "#fdcb6e", borderRadius: 6, marginRight: 8 },
  deleteButton: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: "#d63031", borderRadius: 6 },
});
