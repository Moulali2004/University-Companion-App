import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/assignments';

function EditAssignmentScreen({ route, navigation }) {
  const { assignmentId } = route.params;
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    fetchAssignmentDetails();
  }, []);

  const fetchAssignmentDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/${assignmentId}`);
      const assignment = response.data;
      setTitle(assignment.title);
      setDueDate(assignment.due_date);
      setStatus(assignment.status);
    } catch (error) {
      console.error('Error fetching assignment details:', error);
    }
  };

  const updateAssignment = async () => {
    try {
      await axios.put(`${API_URL}/${assignmentId}`, {
        title,
        due_date: dueDate,
        status,
      });
      navigation.goBack();
    } catch (error) {
      console.error('Error updating assignment:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Assignment Title:</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      
      <Text>Due Date (YYYY-MM-DD):</Text>
      <TextInput style={styles.input} value={dueDate} onChangeText={setDueDate} />
      
      <Text>Status:</Text>
      <TextInput style={styles.input} value={status} onChangeText={setStatus} />

      <Button title="Update Assignment" onPress={updateAssignment} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 16 },
});

export default EditAssignmentScreen;
