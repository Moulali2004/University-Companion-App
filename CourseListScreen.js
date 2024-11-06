import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/courses';

function CourseListScreen({ navigation }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(API_URL);
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const renderCourse = ({ item }) => (
    <TouchableOpacity
      style={styles.courseItem}
      onPress={() => navigation.navigate('Assignments', { courseId: item.id })}
    >
      <Text style={styles.courseName}>{item.course_name}</Text>
      <Text>{item.professor ? `Professor: ${item.professor}` : 'No Professor Assigned'}</Text>
      <Text>Start Date: {item.start_date}</Text>
      <Text>End Date: {item.end_date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        renderItem={renderCourse}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button title="Add Course" onPress={() => {/* Navigate to a screen to add a course */}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  courseItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#e8e8e8',
    borderRadius: 8,
  },
  courseName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CourseListScreen;
