import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function CustomHeader() {
  return (
    <View style={styles.header}>
      {/* Date Section */}
      <View style={styles.headerDate}>
        <Text style={styles.dateText}>jan</Text>
        <Text style={styles.yearText}>2025</Text>
      </View>

      {/* Icons Section */}
      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.headerIcon}>
          <Image source={require('../assets/HeaderIcons/search.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon}>
          <Image source={require('../assets/HeaderIcons/pencil.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon}>
          <Image source={require('../assets/HeaderIcons/calendar (1).png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon}>
          <Image source={require('../assets/HeaderIcons/notification.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon}>
          <Image source={require('../assets/HeaderIcons/user (1).png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', // Layout the date and icons in a row
    alignItems: 'center',
    justifyContent: 'space-between', // Space between date and icons
    paddingHorizontal: 20,
    //paddingVertical: 10,
    backgroundColor: '#F9F9F9', // Customize background color
    //borderBottomWidth: 1,
    //borderBottomColor: '#E0E0E0', // Border color
  },

  headerDate: {
    flexDirection: 'row', // Layout date elements vertically
    alignItems: 'flex-end'
  },

  dateText: {
    fontSize: 35,
    color: '#333',
    marginRight: 5
  },
  yearText: {
    fontSize: 20,
    color: '#333',
  },

  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '60%',
    //borderWidth: 1
  },

  headerIcon: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    //backgroundColor: 'grey'
  },

  icon: {
    width: 30, // Icon size
    height: 30,
  },
});
