import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native';

import MyTabs from './BottomNav';
import NewTaskScreen from '../ScreenComponents/TasksFolder/AddingTasksScreen';

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false, // Hide headers for stack screens
          }}
        >
          <Stack.Screen name="Home" component={MyTabs} />
          <Stack.Screen name="AddTask" component={NewTaskScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9F9F9', // Transparent background for top area
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Adjust for status bar height
  },
});
