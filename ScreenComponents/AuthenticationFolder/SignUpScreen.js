import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { auth } from '../../Components/FirebaseConfig'; 
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSignUp = async () => {
    if (!agreed) {
      Alert.alert('Error', 'You must agree to the Terms & Conditions');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Your account has been created!');
      navigation.replace('SignInScreen');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Hi! Please Fill in Your Information Below To Register</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} placeholder="Alex Moss" value={name} onChangeText={setName} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="example23@gmail.com"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="************"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Image
            source={showPassword ? require('../../assets/iconss/eye.png') : require('../../assets/iconss/hide.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => setAgreed(!agreed)}>
          <Image
            source={
              agreed
                ? require('../../assets/iconss/check.png')
                : require('../../assets/iconss/check1.png')
            }
            style={styles.checkbox}
          />
        </TouchableOpacity>
        <Text style={styles.termsText}>
          Agree with <Text style={styles.link}>Terms & Conditions</Text>
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, !agreed && styles.buttonDisabled]}
        onPress={handleSignUp}
        disabled={!agreed}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.replace('SignInScreen')}>
        <Text style={styles.footerText}>
          Already have an account? <Text style={styles.link}>Sign In</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 30, color: '#777' },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 20 },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 20 },
  passwordInput: { flex: 1, padding: 12 },
  icon: { width: 24, height: 24, marginRight: 10 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  checkbox: { width: 20, height: 20, marginRight: 10 },
  termsText: { fontSize: 14 },
  button: { backgroundColor: '#000', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  buttonDisabled: { backgroundColor: '#ccc' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  footerText: { textAlign: 'center', color: '#777' },
  link: { color: '#000', fontWeight: 'bold' },
});

export default SignUpScreen;
