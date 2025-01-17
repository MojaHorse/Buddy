import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';

import TimeTableScreem from '../ScreenComponents/TimeTableFolder/TimeTableScreem';
import TasksScreen from '../ScreenComponents/TasksFolder/TasksScreen';
import Settings from '../ScreenComponents/SettingsFolder/Settings';
import CustomHeader from './Header';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        header: () => <CustomHeader />,
        tabBarStyle: {
          position: 'absolute',
          bottom: 10,
          backgroundColor: '#000000',
          //borderTopWidth: 0,
          elevation: 0,
          height: 63,
          width: '90%',
          marginLeft: 19,
          borderRadius: 21,
        },
        tabBarActiveTintColor: '#FF6F00', 
        tabBarInactiveTintColor: '#F9F9F9', 
        //headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12, 
          position: 'absolute',
          bottom: 5, 
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={TimeTableScreem}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../assets/BottomNavIcons/homeActive.png') 
                  : require('../assets/BottomNavIcons/homeUnactiveWhite.png') 
              }
              style={styles.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../assets/BottomNavIcons/checklistActive.png')
                  : require('../assets/BottomNavIcons/checklistUnactiveWhite.png') 
              }
              style={styles.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../assets/BottomNavIcons/settingActive.png') 
                  : require('../assets/BottomNavIcons/settingUnactiveWhite.png') 
              }
              style={styles.icon}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 35,
    height: 35,
    marginTop: 7,
  },
});
