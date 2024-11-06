import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CourseListScreen from './screens/CourseListScreen';
import AssignmentScreen from './screens/AssignmentScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CourseList">
        <Stack.Screen name="CourseList" component={CourseListScreen} options={{ title: 'Courses' }} />
        <Stack.Screen name="Assignments" component={AssignmentScreen} options={{ title: 'Assignments' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
