// AssetReceivableScreen.tsx
import React, { useState, useEffect, useCallback } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome5"; // ✅ Back arrow icon
import DonationBox from "../components/DonationBox";

type FinanceItem = { name?: string; amount?: number };

export default function AssetReceivableScreen() {
  const navigation = useNavigation<any>();
  const [items, setItems] = useState<FinanceItem[]>([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Load data from AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      const savedItems = await AsyncStorage.getItem("assetItems");
      if (savedItems) setItems(JSON.parse(savedItems));
    };
    loadData();
  }, []);

  // Save items
  const saveItems = useCallback(async (newItems: FinanceItem[]) => {
    await AsyncStorage.setItem("assetItems", JSON.stringify(newItems));
  }, []);

  // Add or update item
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

  // Edit item
  const editItem = (index: number) => {
    const item = items[index];
    setName(item.name || "");
    setAmount(item.amount !== undefined ? item.amount.toString() : "");
    setEditingIndex(index);
  };

  // Delete item
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

  // Render each item
  const renderItem = useCallback(
    ({ item, index }: { item: FinanceItem; index: number }) => (
      <View style={styles.itemCard}>
        <View>
          <Text style={styles.itemName}>{item.name || "-"}</Text>
          <Text style={styles.itemAmount}>{item.amount !== undefined ? `₹ ${item.amount}` : "-"}</Text>
        </View>
        <View style={styles.itemButtons}>
          <TouchableOpacity onPress={() => editItem(index)} style={styles.editButton}>
            <Text style={styles.btnText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteItem(index)} style={styles.deleteButton}>
            <Text style={styles.btnText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    ),
    [items, editingIndex]
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔹 Top Bar Back Arrow */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={28} color="#00b894" />
      </TouchableOpacity>

      <Text style={styles.header}>Asset & Receivable</Text>

      {/* 🔹 Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          style={styles.input}
        />
        <TouchableOpacity onPress={addItem} style={styles.addButton}>
          <Text style={styles.addBtnText}>{editingIndex !== null ? "Update" : "Add"}</Text>
        </TouchableOpacity>
      </View>

      {/* 🔹 List of Items */}
      <FlatList
        data={items}
        keyExtractor={(_, index) => `item-${index}`}
        renderItem={renderItem}
        ListFooterComponent={<DonationBox />}
        ListFooterComponentStyle={{ marginTop: 20 }}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </SafeAreaView>
  );
}

// 🔹 Professional Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E0F7FA", paddingHorizontal: 16 }, // ✅ Light cyan background
  backButton: { marginBottom: 16, padding: 6, alignSelf: "flex-start" },
  header: { fontSize: 28, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#2d3436" },
  inputContainer: { flexDirection: "row", marginBottom: 20, alignItems: "center" },
  input: { 
    flex: 1, 
    borderWidth: 1, 
    borderColor: "#ccc", 
    padding: 12, 
    marginRight: 8, 
    borderRadius: 12, 
    backgroundColor: "#fff", 
    elevation: 3 
  },
  addButton: { 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    backgroundColor: "#00b894", 
    borderRadius: 12, 
    elevation: 3 
  },
  addBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  itemCard: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    padding: 16, 
    backgroundColor: "#fff", 
    marginBottom: 14, 
    borderRadius: 14, 
    elevation: 4 
  },
  itemName: { fontWeight: "600", fontSize: 16, color: "#2d3436" },
  itemAmount: { fontSize: 15, color: "#636e72", marginTop: 2 },
  itemButtons: { flexDirection: "row" },
  editButton: { paddingHorizontal: 14, paddingVertical: 8, backgroundColor: "#fdcb6e", borderRadius: 10, marginRight: 8 },
  deleteButton: { paddingHorizontal: 14, paddingVertical: 8, backgroundColor: "#d63031", borderRadius: 10 },
  btnText: { color: "#fff", fontWeight: "600" },
});
