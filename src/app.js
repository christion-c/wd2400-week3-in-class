// App.js
 
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, SafeAreaView, Alert } from 'react-native';
 
// 🛑 TODO: IMPORT FIREBASE FUNCTIONS (e.g., collection, onSnapshot, addDoc)
import { collection, onSnapshot, addDoc } from 'firebase/firestore'; 
 
// 🛑 TODO: IMPORT THE FIRESTORE INSTANCE
import { db } from './firebaseConfig'; 
 
// --- DUMMY DATA FOR INITIAL RENDER (Students must replace this!) ---
const initialDishes = [
  { id: '1', dish: 'Potluck Skeleton', bringer: 'Instructor', timestamp: Date.now() },
];
 
// --- Dish Item Renderer ---
const DishItem = ({ dish, bringer }) => (
  <View style={styles.item}>
    <Text style={styles.dishText}>🍲 {dish}</Text>
    <Text style={styles.bringerText}>Brought by: {bringer}</Text>
  </View>
);
 
export default function App() {
  const [dishes, setDishes] = useState(initialDishes);
  const [newDishName, setNewDishName] = useState('');
  const [newBringerName, setNewBringerName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
 
  // ===============================================
  // 🛑 TODO: IMPLEMENT FIREBASE LISTENER (CHALLENGE B)
  // ===============================================
  useEffect(() => {
    // 1. Get a reference to the 'potluck_dishes' collection
    const dishesCollectionRef = collection(db, "potluck_dishes");
 
    // 2. Use onSnapshot to set up a real-time listener
    const unsubscribe = onSnapshot(dishesCollectionRef, (snapshot) => {
      const liveDishes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDishes(liveDishes);
      setIsLoading(false);
    }, (error) => {
      console.error("Firestore error:", error);
      Alert.alert("Error", "Failed to load dishes.");
      setIsLoading(false);
    });
 
    // 3. Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);
 
  // ===============================================
  // 🛑 TODO: IMPLEMENT ADD DOCUMENT FUNCTION (CHALLENGE C)
  // ===============================================
  const handleAddDish = async () => {
    if (!newDishName.trim() || !newBringerName.trim()) {
      Alert.alert("Missing Info", "Please enter both the Dish Name and Your Name.");
      return;
    }
 
    try {
      // 1. Get a reference to the collection
      const dishesCollectionRef = collection(db, "potluck_dishes");
 
      // 2. Use addDoc to insert the new data
      await addDoc(dishesCollectionRef, {
        dish: newDishName.trim(),
        bringer: newBringerName.trim(),
        timestamp: new Date().toISOString(),
      });
 
      // 3. Success feedback and clear inputs
      setNewDishName('');
      setNewBringerName('');
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert("Error", "Could not add dish to the potluck.");
    }
  };
 
 
  if (isLoading) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Loading Potluck List...</Text>
        </View>
    );
  }
 
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>The Real-Time Potluck</Text>
 
      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Dish Name (e.g., Lasagna)"
          value={newDishName}
          onChangeText={setNewDishName}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Your Name (e.g., Chef Bob)"
          value={newBringerName}
          onChangeText={setNewBringerName}
        />
        <Button
          title="Bring It! 🧑‍🍳"
          onPress={handleAddDish}
          color="#4CAF50"
        />
      </View>
      
      {/* Dish List */}
      <Text style={styles.listHeader}>Dishes Coming ({dishes.length}):</Text>
      <FlatList
        data={dishes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DishItem dish={item.dish} bringer={item.bringer} />
        )}
      />
    </SafeAreaView>
  );
}
 
// --- Basic Styling ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    padding: 15,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  listHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
    color: '#555',
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 4,
    marginHorizontal: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 5,
    borderLeftColor: '#FFC107',
  },
  dishText: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 3,
  },
  bringerText: {
    fontSize: 14,
    color: '#666',
    flex: 2,
    textAlign: 'right',
  }
});