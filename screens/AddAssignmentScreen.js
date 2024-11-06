import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/assignments';

function AddAssignmentScreen({ route, navigation }) {
  const { courseId } = route.params;
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const addAssignment = async () => {
    try {
      await axios.post(API_URL, {
        course_id: courseId,
        title,
        due_date: dueDate,
        status: 'pending',
      });
      navigation.goBack();
    } catch (error) {
      console.error('Error adding assignment:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Assignment Title:</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      
      <Text>Due Date (YYYY-MM-DD):</Text>
      <TextInput style={styles.input} value={dueDate} onChangeText={setDueDate} />

      <Button title="Add Assignment" onPress={addAssignment} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 16 },
});

export default AddAssignmentScreen;
