import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  useRegisterUserMutation,
  useLoginUserMutation,
} from '../../store/api/userApiSlice';
import { setUser } from '../../store/slices/userSlice';
import DropDownPicker from 'react-native-dropdown-picker';
import { setTreeId } from '../../store/slices/treeSlice';

const Register = () => {
  const [isUser, setIsUser] = useState(true);
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const toggleIsUser = () => {
    setIsUser(!isUser);
  };

  const [registerUser] = useRegisterUserMutation();
  const [loginUser] = useLoginUserMutation();

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
      Alert.alert('Error', 'Registration failed. Please try again.');
    }
  };

  const handleLogin = async () => {
    if (!number || !password) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }
    try {
      const userData = { number, password };
      const res = await loginUser(userData).unwrap();
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
      Alert.alert('Success', 'User logged in successfully!');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Login failed. Please try again.');
    }
  };

  return (
    <View className='flex-1 p-5 justify-center bg-blue-900'>
      <Text className='text-2xl font-bold text-white text-center mb-5'>
        {isUser ? 'Login' : 'Register'}
      </Text>

      {!isUser && (
        <TextInput
          className='h-12 border border-gray-300 rounded px-3 bg-white text-base mb-4'
          placeholder='Name'
          value={name}
          onChangeText={setName}
          placeholderTextColor='#A9A9A9'
        />
      )}

      <TextInput
        className='h-12 border border-gray-300 rounded px-3 bg-white text-base mb-4'
        placeholder='Enter Phone Number'
        keyboardType='phone-pad'
        value={number}
        onChangeText={setNumber}
        placeholderTextColor='#A9A9A9'
      />

      {!isUser && (
        <DropDownPicker
          open={open}
          value={gender}
          items={[
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
          ]}
          setOpen={setOpen}
          setValue={setGender}
          style={{
            backgroundColor: '#fff',
            borderRadius: 5,
            borderColor: '#ccc',
          }}
          placeholder='Select Gender'
          placeholderStyle={{ fontSize: 16, color: '#A9A9A9' }}
          dropDownContainerStyle={{ backgroundColor: '#fff' }}
        />
      )}

      <TextInput
        className='h-12 border border-gray-300 rounded px-3 bg-white text-base mt-4 mb-4'
        placeholder={isUser ? 'Enter Password' : 'Set Password'}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor='#A9A9A9'
      />

      {!isUser && (
        <TextInput
          className='h-12 border border-gray-300 rounded px-3 bg-white text-base mb-4'
          placeholder='Confirm Password'
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholderTextColor='#A9A9A9'
        />
      )}

      <TouchableOpacity
        className='h-12 bg-blue-500 justify-center items-center rounded mb-4'
        onPress={isUser ? handleLogin : handleRegister}
      >
        <Text className='text-white text-lg font-bold'>
          {isUser ? 'Login' : 'Register'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => toggleIsUser()}>
        <View className='flex flex-row justify-center gap-4'>
          <Text className='text-base text-white text-center'>
            {isUser ? 'New User?' : 'Already have an account?'}
          </Text>
          <Text className='text-base text-blue-300 text-center'>
            {isUser ? 'Register' : 'Login'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
