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

// ✅ Import DonationBox
import DonationBox from '../components/DonationBox';

export default function UmrahTrackerScreen({ navigation }: any) {
  // ---------- Notes ----------
  const [note, setNote] = useState<string>('');
  const [notes, setNotes] = useState<string[]>([]);

  // ---------- Umrah Savings ----------
  const [target, setTarget] = useState<string>('5000');
  const [saved, setSaved] = useState<string>('0');
  const [input, setInput] = useState<string>('');

  // ---------- Load Data ----------
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem('umrah_notes');
      if (savedNotes) setNotes(JSON.parse(savedNotes));

      const savedAmount = await AsyncStorage.getItem('umrah_saved');
      if (savedAmount) setSaved(savedAmount);

      const targetAmount = await AsyncStorage.getItem('umrah_target');
      if (targetAmount) setTarget(targetAmount);
    } catch (error) {
      console.log('Error loading data:', error);
    }
  };

  // ---------- Notes Functions ----------
  const addNote = async () => {
    if (note.trim() === '') return;
    const newNotes = [...notes, note];
    setNotes(newNotes);
    setNote('');
    await AsyncStorage.setItem('umrah_notes', JSON.stringify(newNotes));
  };

  const clearNotes = async () => {
    setNotes([]);
    await AsyncStorage.removeItem('umrah_notes');
  };

  // ---------- Savings Functions ----------
  const addSavings = async () => {
    if (input.trim() === '' || isNaN(Number(input)) || Number(input) <= 0) {
      Alert.alert('Invalid Input', 'Enter a valid positive number.');
      return;
    }
    const newSaved = (Number(saved) + Number(input)).toFixed(2);
    setSaved(newSaved);
    setInput('');
    await AsyncStorage.setItem('umrah_saved', newSaved);
  };

  const updateTarget = async () => {
    if (target.trim() === '' || isNaN(Number(target)) || Number(target) <= 0) {
      Alert.alert('Invalid Input', 'Enter a valid positive number for target.');
      return;
    }
    await AsyncStorage.setItem('umrah_target', target);
    Alert.alert('Target Updated', `New target is ${target}`);
  };

  const clearSavings = async () => {
    setSaved('0');
    await AsyncStorage.setItem('umrah_saved', '0');
  };

  // ---------- Progress ----------
  const progress = Math.min(Number(saved) / Number(target), 1);

  return (
    <ScrollView style={styles.container}>
      {/* ---------- Back Button ---------- */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      {/* ---------- Umrah Savings ---------- */}
      <Text style={styles.sectionTitle}>Umrah Savings</Text>

      {/* Target Amount Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter target amount"
        value={target}
        onChangeText={setTarget}
        keyboardType="numeric"
      />
      <Button title="Update Target" onPress={updateTarget} />

      {/* Progress Bar */}
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

      {/* Current Saved & Remaining */}
      <View style={styles.box}>
        <Text>Current Saved:</Text>
        <Text>{saved}</Text>
      </View>
      <View style={styles.box}>
        <Text>Remaining:</Text>
        <Text>{Math.max(Number(target) - Number(saved), 0).toFixed(2)}</Text>
      </View>

      {/* Add Savings */}
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

      {/* Render Notes */}
      {notes.map((item, index) => (
        <View key={index} style={styles.noteItem}>
          <Text>{item}</Text>
        </View>
      ))}

      {/* ---------- Donation Box at the Bottom ---------- */}
      <View style={{ marginVertical: 20 }}>
        <DonationBox />
      </View>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

// ---------- Styles ----------
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fdfdfd' },
  backButton: { marginBottom: 10 },
  backText: { fontSize: 18, color: '#0984e3' },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 8 },
  noteItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  box: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  progressText: { textAlign: 'center', marginTop: 5, fontWeight: 'bold' },
});
