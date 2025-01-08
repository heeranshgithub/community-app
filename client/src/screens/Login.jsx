import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Colors from '../theme/Colors';

const testPass = 'qwerty';
const testNum = 1234567890;

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!phoneNumber || !password) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    if (password !== testPass) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    // Proceed with registration logic
    Alert.alert('Success', 'Registration Successful!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder='Enter Phone Number'
        keyboardType='phone-pad'
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <TextInput
        style={styles.input}
        placeholder='Enter Password'
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: Colors.bgDarkBlue,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    height: 50,
    backgroundColor: Colors.submitButtonBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Login;
