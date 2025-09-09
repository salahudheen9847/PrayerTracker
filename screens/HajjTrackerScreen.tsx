// HajjTrackerScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5'; // ✅ back arrow
import DonationBox from '../components/DonationBox';

export default function HajjTrackerScreen({ navigation }: any) {
  const [note, setNote] = useState<string>('');
  const [notes, setNotes] = useState<string[]>([]);
  const [target, setTarget] = useState<string>('10000');
  const [saved, setSaved] = useState<string>('0');
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem('notes');
      if (savedNotes) setNotes(JSON.parse(savedNotes));

      const savedAmount = await AsyncStorage.getItem('hajj_saved');
      if (savedAmount) setSaved(savedAmount);

      const targetAmount = await AsyncStorage.getItem('hajj_target');
      if (targetAmount) setTarget(targetAmount);
    } catch (error) {
      console.log('Error loading data:', error);
    }
  };

  const addNote = async () => {
    if (note.trim() === '') return;
    const newNotes = [...notes, note];
    setNotes(newNotes);
    setNote('');
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
  };

  const clearNotes = async () => {
    setNotes([]);
    await AsyncStorage.removeItem('notes');
  };

  const addSavings = async () => {
    if (input.trim() === '' || isNaN(Number(input)) || Number(input) <= 0) {
      Alert.alert('Invalid Input', 'Enter a valid positive number.');
      return;
    }
    const newSaved = (Number(saved) + Number(input)).toFixed(2);
    setSaved(newSaved);
    setInput('');
    await AsyncStorage.setItem('hajj_saved', newSaved);
  };

  const updateTarget = async () => {
    if (target.trim() === '' || isNaN(Number(target)) || Number(target) <= 0) {
      Alert.alert('Invalid Input', 'Enter a valid positive number for target.');
      return;
    }
    await AsyncStorage.setItem('hajj_target', target);
    Alert.alert('Target Updated', `New target is ${target}`);
  };

  const clearSavings = async () => {
    setSaved('0');
    await AsyncStorage.setItem('hajj_saved', '0');
  };

  const progress = Math.min(Number(saved) / Number(target), 1);

  return (
    <ScrollView style={styles.container}>
      {/* 🔹 Gradient Top Bar */}
      <LinearGradient colors={['#0984e3', '#74b9ff']} style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.topBarText}>Hajj Tracker</Text>
      </LinearGradient>

      {/* ---------- Hajj Savings ---------- */}
      <Text style={styles.sectionTitle}>Hajj Savings</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter target amount"
        value={target}
        onChangeText={setTarget}
        keyboardType="numeric"
      />
      <Button title="Update Target" onPress={updateTarget} />

      <View style={{ marginVertical: 15 }}>
        <Progress.Bar
          progress={progress}
          width={null}
          height={20}
          color="#4CAF50"
          borderRadius={10}
          borderWidth={1}
          borderColor="#333"
        />
        <Text style={styles.progressText}>{(progress * 100).toFixed(2)}%</Text>
      </View>

      <View style={styles.box}>
        <Text>Current Saved:</Text>
        <Text>{saved}</Text>
      </View>
      <View style={styles.box}>
        <Text>Remaining:</Text>
        <Text>{Math.max(Number(target) - Number(saved), 0).toFixed(2)}</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter amount to save"
        value={input}
        onChangeText={setInput}
        keyboardType="numeric"
      />
      <Button title="Add Savings" onPress={addSavings} />
      <Button title="Clear Savings" onPress={clearSavings} color="#d63031" />

      {/* ---------- Notes ---------- */}
      <Text style={styles.sectionTitle}>Notes</Text>
      <TextInput
        placeholder="Write a note"
        value={note}
        onChangeText={setNote}
        style={styles.input}
      />
      <Button title="Add Note" onPress={addNote} />
      <Button title="Clear Notes" onPress={clearNotes} color="#d63031" />

      {notes.map((item, index) => (
        <View key={index} style={styles.noteItem}>
          <Text>{item}</Text>
        </View>
      ))}

      {/* ---------- Donation Box ---------- */}
      <View style={{ marginVertical: 20 }}>
        <DonationBox />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#E0F7FA' }, // ✅ light consistent background
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 10,
  },
  backButton: { marginRight: 10 },
  topBarText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 8, backgroundColor: '#fff' },
  noteItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  box: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  progressText: { textAlign: 'center', marginTop: 5, fontWeight: 'bold' },
});
