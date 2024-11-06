import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/courses';

function AddCourseScreen({ navigation }) {
  const [courseName, setCourseName] = useState('');
  const [professor, setProfessor] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const addCourse = async () => {
    try {
      await axios.post(API_URL, {
        course_name: courseName,
        professor,
        start_date: startDate,
        end_date: endDate,
      });
      navigation.goBack(); // Go back to CourseListScreen after adding
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Course Name:</Text>
      <TextInput style={styles.input} value={courseName} onChangeText={setCourseName} />
      
      <Text>Professor:</Text>
      <TextInput style={styles.input} value={professor} onChangeText={setProfessor} />
      
      <Text>Start Date (YYYY-MM-DD):</Text>
      <TextInput style={styles.input} value={startDate} onChangeText={setStartDate} />
      
      <Text>End Date (YYYY-MM-DD):</Text>
      <TextInput style={styles.input} value={endDate} onChangeText={setEndDate} />

      <Button title="Add Course" onPress={addCourse} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 16 },
});

export default AddCourseScreen;
