import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/assignments';

function AssignmentScreen({ route, navigation }) {
  const { courseId } = route.params;
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(`${API_URL}/${courseId}`);
      setAssignments(response.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const markAsCompleted = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}`, { status: 'completed' });
      fetchAssignments(); // Refresh list after updating status
    } catch (error) {
      console.error('Error updating assignment status:', error);
    }
  };

  const renderAssignment = ({ item }) => (
    <View style={styles.assignmentItem}>
      <Text style={styles.assignmentTitle}>{item.title}</Text>
      <Text>Due Date: {item.due_date}</Text>
      <Text>Status: {item.status}</Text>
      <Button title="Mark as Completed" onPress={() => markAsCompleted(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={assignments}
        renderItem={renderAssignment}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button title="Add Assignment" onPress={() => {/* Navigate to add assignment screen */}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  assignmentItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#d1e7dd',
    borderRadius: 8,
  },
  assignmentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AssignmentScreen;
