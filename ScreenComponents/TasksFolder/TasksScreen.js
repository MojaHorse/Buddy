import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore, auth, db } from '../../Components/FirebaseConfig';

export default function TasksScreen() {
  const [tasks, setTasks] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          Alert.alert('Error', 'No user is logged in.');
          console.error('No user is logged in.');
          return;
        }
        const userId = currentUser.uid;
        const tasksCollection = collection(db, 'tasks');
        const q = query(tasksCollection, where('userId', '==', userId));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          setTasks([]);
          return;
        }

        const tasksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTasks(tasksData);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch tasks.');
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const renderTask = ({ item }) => {
    const { taskName, startTime, endTime, status, description, category } = item;

    return (
      <View style={styles.taskContainer}>
        <View style={styles.taskDetails}>
          <Text style={styles.taskTime}>{
            new Date(startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }</Text>
          <View>
            <Text style={styles.taskTitle}>{taskName}</Text>
            <Text style={styles.taskDescription}>{description}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <View style={[styles.circle, status === 'done' ? styles.filledCircle : styles.hollowCircle]} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Today's Tasks</Text>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={() => navigation.navigate('NewTask')}
        >
          <Image source={require('../../assets/HeaderIcons/pencil.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTask}
        contentContainerStyle={styles.taskList}
        ListEmptyComponent={<Text style={styles.emptyText}>You have no tasks for today.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  taskList: {
    gap: 15,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  taskDescription: {
    fontSize: 14,
    color: '#888',
  },
  taskTime: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
  },
  filledCircle: {
    backgroundColor: '#FF9800',
    borderColor: '#FF9800',
  },
  hollowCircle: {
    borderColor: '#FF9800',
    backgroundColor: 'transparent',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#aaa',
    marginTop: 20,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
