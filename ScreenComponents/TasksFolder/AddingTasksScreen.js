import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../Components/FirebaseConfig';
import { auth } from '../../Components/FirebaseConfig'; // Ensure auth is imported

export default function NewTaskScreen() {
  const [taskName, setTaskName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedColor, setSelectedColor] = useState('#FFA500');
  const [subTasks, setSubTasks] = useState([]);
  const [newSubTask, setNewSubTask] = useState('');

  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);

  const colors = ['#FFA500', '#00FF7F', '#FFD700', '#ADD8E6', '#90EE90', '#FFB6C1', '#FFFFFF', '#000000'];

  const showStartTimePicker = () => setStartTimePickerVisibility(true);
  const hideStartTimePicker = () => setStartTimePickerVisibility(false);

  const showEndTimePicker = () => setEndTimePickerVisibility(true);
  const hideEndTimePicker = () => setEndTimePickerVisibility(false);

  const handleStartTimeConfirm = (date) => {
    setStartTime(date.toISOString());
    hideStartTimePicker();
  };
  
  const handleEndTimeConfirm = (date) => {
    setEndTime(date.toISOString());
    hideEndTimePicker();
  };

  const addSubTask = () => {
    if (newSubTask.trim()) {
      setSubTasks([...subTasks, newSubTask.trim()]);
      setNewSubTask('');
    } else {
      Alert.alert('Error', 'Subtask cannot be empty.');
    }
  };

  const removeSubTask = (index) => {
    setSubTasks(subTasks.filter((_, i) => i !== index));
  };

  const handleSaveTask = async () => {
    if (!taskName.trim()) {
      Alert.alert('Error', 'Task name is required.');
      return;
    }
    if (!startTime) {
      Alert.alert('Error', 'Start time is required.');
      return;
    }
    if (!endTime) {
      Alert.alert('Error', 'End time is required.');
      return;
    }

    // Get the current user's ID
    const currentUser = auth.currentUser;
    if (!currentUser) {
      Alert.alert('Error', 'You must be logged in to save a task.');
      return;
    }
  
    const task = {
      taskName: taskName.trim(),
      startTime,
      endTime,
      color: selectedColor,
      subTasks,
      userId: currentUser.uid, // Include user ID for Firestore rules
      createdAt: new Date().toISOString(),
    };
  
    try {
      const tasksCollectionRef = collection(db, 'tasks');
      await addDoc(tasksCollectionRef, task);
      Alert.alert('Success', 'Task saved successfully!');
      
      setTaskName('');
      setStartTime('');
      setEndTime('');
      setSelectedColor('#FFA500');
      setSubTasks([]);
    } catch (error) {
      Alert.alert('Error', `Failed to save task: ${error.message}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>New Task</Text>
        <TouchableOpacity onPress={() => console.log('Cancel')}>
          <Text style={[styles.icon, styles.cancel]}>✕</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSaveTask}>
          <Text style={[styles.icon, styles.save]}>✓</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Task Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task name"
        value={taskName}
        onChangeText={setTaskName}
      />

      <Text style={styles.label}>Date & Time</Text>
      <View style={styles.timeContainer}>
        <TouchableOpacity style={[styles.input, styles.timePicker]} onPress={showStartTimePicker}>
          <Text>{startTime || 'Start Time'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.input, styles.timePicker]} onPress={showEndTimePicker}>
          <Text>{endTime || 'End Time'}</Text>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={isStartTimePickerVisible}
        mode="datetime"
        onConfirm={handleStartTimeConfirm}
        onCancel={hideStartTimePicker}
      />
      <DateTimePickerModal
        isVisible={isEndTimePickerVisible}
        mode="datetime"
        onConfirm={handleEndTimeConfirm}
        onCancel={hideEndTimePicker}
      />

      <Text style={styles.label}>Color</Text>
      <View style={styles.colorContainer}>
        {colors.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorCircle,
              { backgroundColor: color },
              selectedColor === color && styles.selectedColor,
            ]}
            onPress={() => setSelectedColor(color)}
          />
        ))}
      </View>

      <Text style={styles.label}>Subtasks</Text>
      <View style={styles.subtaskInputContainer}>
        <TextInput
          style={styles.subtaskInput}
          placeholder="Add sub-tasks"
          value={newSubTask}
          onChangeText={setNewSubTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addSubTask}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={subTasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.subtaskItem}>
            <Text>{item}</Text>
            <TouchableOpacity onPress={() => removeSubTask(index)}>
              <Text style={styles.removeButton}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#F9F9F9', // Light pastel yellow
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF8BA7', // Soft pink
    fontFamily: 'Avenir-Next',
  },
  icon: {
    fontSize: 24,
  },
  cancel: {
    color: '#F76C6C', // Soft red
  },
  save: {
    color: '#6BF178', // Soft green
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
    color: '#555',
    fontFamily: 'Avenir-Next',
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFD1DC', // Light pink
    borderRadius: 16,
    padding: 12,
    backgroundColor: '#FFF',
    fontFamily: 'Avenir-Next',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  colorContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 3,
    borderColor: '#fff',
  },
  selectedColor: {
    borderColor: '#000',
    borderWidth: 3,
  },
  subtaskInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  subtaskInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#FFD1DC',
    borderRadius: 16,
    padding: 10,
    backgroundColor: '#FFF',
    fontFamily: 'Avenir-Next',
  },
  addButton: {
    backgroundColor: '#FF8BA7',
    borderRadius: 16,
    padding: 12,
    marginLeft: 8,
  },
  addButtonText: {
    fontSize: 18,
    color: '#FFF',
    fontFamily: 'Avenir-Next',
  },
  subtaskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 4,
    backgroundColor: '#FFE4E1',
    borderRadius: 16,
  },
  removeButton: {
    color: '#F76C6C',
    fontSize: 18,
  },
});