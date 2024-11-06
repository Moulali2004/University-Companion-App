import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/courses';

function EditCourseScreen({ route, navigation }) {
  const { courseId } = route.params;
  const [courseName, setCourseName] = useState('');
  const [professor, setProfessor] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/${courseId}`);
      const course = response.data;
      setCourseName(course.course_name);
      setProfessor(course.professor || '');
      setStartDate(course.start_date);
      setEndDate(course.end_date);
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };

  const updateCourse = async () => {
    try {
      await axios.put(`${API_URL}/${courseId}`, {
        course_name: courseName,
        professor,
        start_date: startDate,
        end_date: endDate,
      });
      navigation.goBack();
    } catch (error) {
      console.error('Error updating course:', error);
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

      <Button title="Update Course" onPress={updateCourse} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 16 },
});

export default EditCourseScreen;
