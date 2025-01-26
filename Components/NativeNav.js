import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native';

import MyTabs from './BottomNav';
import NewTaskScreen from '../ScreenComponents/TasksFolder/AddingTasksScreen';
import SignInScreen from '../ScreenComponents/AuthenticationFolder/SignInScreen';
import SignUpScreen from '../ScreenComponents/AuthenticationFolder/SignUpScreen';
import VerifyCodeScreen from '../ScreenComponents/AuthenticationFolder/VerifyCodeScreen';
import UserScreen from '../ScreenComponents/SettingsFolder/UserScreen';
import CustomHeader from './Header';

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
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="VerifyCodeScreen" component={VerifyCodeScreen} />
          <Stack.Screen name="Home" component={MyTabs} />
          <Stack.Screen name="AddTask" component={NewTaskScreen} />
          <Stack.Screen name="CusHeader" component={CustomHeader} />
          <Stack.Screen name="UserScreen" component={UserScreen} />
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
