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
import { collection, addDoc } from '../../Components/FirebaseConfig';
import { db } from '../../Components/FirebaseConfig';

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
    setStartTime(date.toLocaleString());
    hideStartTimePicker();
  };

  const handleEndTimeConfirm = (date) => {
    setEndTime(date.toLocaleString());
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

    const task = {
      taskName: taskName.trim(),
      startTime,
      endTime,
      color: selectedColor,
      subTasks,
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
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6600',
  },
  icon: {
    fontSize: 24,
  },
  cancel: {
    color: '#FF6666',
  },
  save: {
    color: '#66FF66',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  timePicker: {
    flex: 1,
    justifyContent: 'center',
  },
  colorContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: '#fff',
  },
  selectedColor: {
    borderColor: '#000',
    borderWidth: 2,
  },
  subtaskInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  subtaskInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#FF6600',
    borderRadius: 8,
    padding: 10,
  },
  addButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  subtaskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 10,
  },
  removeButton: {
    color: '#FF6666',
    fontSize: 18,
  },
});
