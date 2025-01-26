import React, { useState, useEffect, useRef } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, } from 'react-native';

const getDaysInMonth = (month, year) => {
  const days = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    days.push({
      date: date.getDate(),
      day: date.toLocaleString('en', { weekday: 'short' }),
    });
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const getCurrentMonthAndYear = () => {
  const date = new Date();
  return {
    month: date.getMonth(),
    year: date.getFullYear(),
    day: date.getDate(),
  };
};

export default function CustomHeader({navigation}) {
  const { month, year, day: currentDay } = getCurrentMonthAndYear();
  const [days, setDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(currentDay);
  const [currentMonth, setCurrentMonth] = useState(month);
  const [currentYear, setCurrentYear] = useState(year);
  const flatListRef = useRef(null);
  const lastPressRefs = useRef({}); 

  useEffect(() => {
    setDays(getDaysInMonth(currentMonth, currentYear));
  }, [currentMonth, currentYear]);

  const handleScrollToToday = () => {
    if (currentMonth === month && currentYear === year) {
      const todayIndex = days.findIndex((d) => d.date === currentDay);
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ index: todayIndex, animated: true });
      }
      setSelectedDate(currentDay);
    } else {
      setCurrentMonth(month);
      setCurrentYear(year);
      setTimeout(() => {
        const todayIndex = getDaysInMonth(month, year).findIndex(
          (d) => d.date === currentDay
        );
        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({ index: todayIndex, animated: true });
        }
        setSelectedDate(currentDay);
      }, 100);
    }
  };

  const renderDay = ({ item }) => {
    // Ensure a unique ref exists for each day
    if (!lastPressRefs.current[item.date]) {
      lastPressRefs.current[item.date] = 0;
    }

    const handlePress = () => {
      const now = Date.now();
      if (now - lastPressRefs.current[item.date] < 300) {
        // Double-tap detected
        handleScrollToToday();
      } else {
        // Single tap
        setSelectedDate(item.date);
      }
      lastPressRefs.current[item.date] = now;
    };

    return (
      <TouchableOpacity
        style={[
          styles.dayContainer,
          item.date === selectedDate && styles.selectedDay,
        ]}
        onPress={handlePress}
      >
        <Text
          style={[
            styles.dayText,
            item.date === selectedDate && styles.selectedDayText,
          ]}
        >
          {item.date}
        </Text>
        <Text
          style={[
            styles.weekdayText,
            item.date === selectedDate && styles.selectedDayText,
          ]}
        >
          {item.day}
        </Text>
        {item.date === currentDay &&
          currentMonth === month &&
          currentYear === year && <View style={styles.currentDayIndicator} />}
      </TouchableOpacity>
    );
  };

  const route = useRoute();
  
  const handlePencilPress = () => {
    switch (route.name) {
      case 'Home':
        navigation.navigate('EditTimeTableScreen');
        break;
      case 'Tasks':
        navigation.navigate('AddTask'); 
        break;
      default:
        console.log('No navigation action for this screen.');
        break;
    }
  };

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.headerDate}>
          <Text style={styles.dateText}>
            {new Date(currentYear, currentMonth).toLocaleString('en', {
              month: 'short',
            })}
          </Text>
          <Text style={styles.yearText}>{currentYear}</Text>
        </View>

        <View style={styles.headerIcons}>
          <TouchableOpacity
            style={styles.headerIcon}
            //onPress={() => navigation.navigate('SearchScreen')} // Navigate to Search Screen
          >
            <Image
              source={require('../assets/HeaderIcons/search.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={handlePencilPress} // Navigate to Search Screen
          >
            <Image
              source={require('../assets/HeaderIcons/pencil.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerIcon}
            //onPress={() => navigation.navigate('CalendarScreen')} // Navigate to Calendar Screen
          >
            <Image
              source={require('../assets/HeaderIcons/calendar (1).png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerIcon}
            //onPress={() => navigation.navigate('NotificationsScreen')} // Navigate to Notifications Screen
          >
            <Image
              source={require('../assets/HeaderIcons/notification.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => navigation.navigate('UserScreen')} // Navigate to User Profile Screen
          >
            <Image
              source={require('../assets/HeaderIcons/user (1).png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={days}
        renderItem={renderDay}
        keyExtractor={(item, index) => `${item.date}-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.calendarContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: '#F9F9F9',
  },
  headerDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 35,
    color: '#333',
    marginHorizontal: 5,
  },
  yearText: {
    fontSize: 20,
    color: '#333',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '55%',
  },
  headerIcon: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
  },
  icon: {
    width: 30,
    height: 30,
  },
  calendarContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#F9F9F9',
    height: 60,
  },
  dayContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
  },
  selectedDay: {
    backgroundColor: '#FF6F00',
  },
  dayText: {
    fontSize: 20,
    color: '#333',
  },
  selectedDayText: {
    color: '#FFF',
  },
  weekdayText: {
    fontSize: 14,
    color: '#999',
  },
  currentDayIndicator: {
    width: '80%',
    height: 4,
    backgroundColor: '#FF6F00',
    borderRadius: 2,
    marginTop: 4,
  },
});
