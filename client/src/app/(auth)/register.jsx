import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Colors from '../../theme/Colors';
import { useDispatch } from 'react-redux';
import { useRegisterUserMutation } from '../../store/api/userApiSlice';
import { getUserToken, setUser } from '../../store/slices/userSlice';
import DropDownPicker from 'react-native-dropdown-picker';
import { setTreeId } from '../../store/slices/treeSlice';

const Register = () => {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const [registerUser] = useRegisterUserMutation();

  const handleRegister = async () => {
    if (!name || !number || !gender || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    try {
      const userData = { name, number, gender, password };
      const res = await registerUser(userData).unwrap();

      dispatch(
        setUser({
          token: res?.user?.token,
          name: res?.user?.name,
          number: res?.user?.number,
          gender: res?.user?.gender,
          id: res?.user?.id,
        })
      );
      dispatch(setTreeId(res?.user?.id));

      Alert.alert('Success', 'User registered successfully!');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Registration failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder='Name'
        value={name}
        onChangeText={setName}
        placeholderTextColor={Colors.inputPlaceholder} // Setting the placeholder color
      />

      <TextInput
        style={styles.input}
        placeholder='Enter Phone Number'
        keyboardType='phone-pad'
        value={number}
        onChangeText={setNumber}
        placeholderTextColor={Colors.inputPlaceholder} // Setting the placeholder color
      />

      <DropDownPicker
        open={open}
        value={gender}
        items={[
          { label: 'Male', value: 'Male' },
          { label: 'Female', value: 'Female' },
        ]}
        setOpen={setOpen}
        setValue={setGender}
        style={styles.input}
        placeholder='Select Gender'
        placeholderStyle={styles.placeholderStyle} // Ensuring the placeholder color is the same
        dropDownStyle={{ backgroundColor: '#fff' }}
      />

      <TextInput
        style={styles.input}
        placeholder='Set Password'
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={Colors.inputPlaceholder} // Setting the placeholder color
      />

      <TextInput
        style={styles.input}
        placeholder='Confirm Password'
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholderTextColor={Colors.inputPlaceholder} // Setting the placeholder color
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
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
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 16, // Ensuring the text size is consistent across inputs
  },
  placeholderStyle: {
    fontSize: 16, // Ensuring placeholder text size matches
    color: '#A9A9A9', // Same placeholder color for consistency
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

export default Register;
