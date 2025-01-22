import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firestore } from '../../Components/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore'; 

export default function TasksScreen() {
  const [tasks, setTasks] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksCollection = collection(firestore, 'tasks');
        const snapshot = await getDocs(tasksCollection);
        const tasksData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const renderTask = ({ item }) => (
    <View style={styles.taskContainer}>
      <Text style={styles.taskTime}>{item.time}</Text>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Image
        source={
          item.status === 'done'
            ? require('./../../assets/iconss/radiodone.png')
            : require('../../assets/iconss/radiobutton.png')
        }
        style={styles.icon}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Today's Tasks</Text>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={() => navigation.navigate('AddTask')} 
        >
          <Image
            source={require('../../assets/HeaderIcons/pencil.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        contentContainerStyle={styles.taskList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  taskList: {
    gap: 15,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 15,
  },
  taskTitle: {
    fontSize: 16,
    color: '#555',
    flex: 1,
  },
  icon: {
    width: 24,
    height: 24,
  },
  headerIcon: {
    padding: 10,
  },
});
