import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const VerifyCodeScreen = () => {
  const [code, setCode] = useState(['', '', '', '']);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Code</Text>
      <Text style={styles.subtitle}>Please enter the code that was sent to your email</Text>

      <View style={styles.codeInputContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.codeInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => {
              let newCode = [...code];
              newCode[index] = text;
              setCode(newCode);
            }}
          />
        ))}
      </View>

      <TouchableOpacity>
        <Text style={styles.resendText}>Didn't receive the code? <Text style={styles.link}>Resend code</Text></Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 30, color: '#777' },
  codeInputContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
  codeInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, width: 50, height: 50, textAlign: 'center', fontSize: 20, marginHorizontal: 5 },
  button: { backgroundColor: '#000', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  resendText: { textAlign: 'center', color: '#000', marginBottom: 20 },
  link: { color: '#000', fontWeight: 'bold' },
});

export default VerifyCodeScreen;
