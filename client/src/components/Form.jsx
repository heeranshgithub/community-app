import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Colors from '../theme/Colors';

const AddFamilyMemberModal = ({ visible, onClose }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [familyHead, setFamilyHead] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [education, setEducation] = useState('');
  const [company, setCompany] = useState('');
  const [about, setAbout] = useState('');

  const handleSubmit = () => {
    if (
      name &&
      number &&
      address &&
      familyHead &&
      age &&
      gender &&
      education &&
      company &&
      about
    ) {
      Alert.alert('Success', 'Family member added successfully', [
        {
          text: 'OK',
          onPress: () => {
            clearForm();
            onClose();
          },
        },
      ]);
    } else {
      Alert.alert('Error', 'Please fill out all fields.');
    }
  };

  const clearForm = () => {
    setName('');
    setNumber('');
    setAddress('');
    setFamilyHead('');
    setAge('');
    setGender('');
    setEducation('');
    setCompany('');
    setAbout('');
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className='flex-1 bg-black/50'>
        <View className='flex-1 bg-[#1a2c4d] mt-10 rounded-t-3xl'>
          <KeyboardAwareScrollView
            className='flex-1 px-5 pt-6'
            contentContainerStyle={{ paddingBottom: 30 }}
            keyboardShouldPersistTaps='handled'
            enableOnAndroid={true}
          >
            <View className='flex-row justify-between items-center mb-6'>
              <Text className='text-white text-2xl font-bold'>
                Add Family Member
              </Text>
              <TouchableOpacity
                onPress={onClose}
                className='p-2 rounded-full bg-gray-700'
              >
                <Text className='text-white text-lg'>✕</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              className='bg-white rounded-lg px-4 py-3 text-base mb-4 shadow-sm'
              placeholder='Name'
              value={name}
              onChangeText={setName}
              placeholderTextColor='#96a2b5'
            />

            <TextInput
              className='bg-white rounded-lg px-4 py-3 text-base mb-4 shadow-sm'
              placeholder='Number'
              value={number}
              onChangeText={setNumber}
              keyboardType='numeric'
              placeholderTextColor='#96a2b5'
            />

            <TextInput
              className='bg-white rounded-lg px-4 py-3 text-base mb-4 shadow-sm'
              placeholder='Address'
              value={address}
              onChangeText={setAddress}
              placeholderTextColor='#96a2b5'
            />

            <TextInput
              className='bg-white rounded-lg px-4 py-3 text-base mb-4 shadow-sm'
              placeholder='Family Head'
              value={familyHead}
              onChangeText={setFamilyHead}
              placeholderTextColor='#96a2b5'
            />

            <TextInput
              className='bg-white rounded-lg px-4 py-3 text-base mb-4 shadow-sm'
              placeholder='Age'
              value={age}
              onChangeText={setAge}
              keyboardType='numeric'
              placeholderTextColor='#96a2b5'
            />

            <TextInput
              className='bg-white rounded-lg px-4 py-3 text-base mb-4 shadow-sm'
              placeholder='Gender'
              value={gender}
              onChangeText={setGender}
              placeholderTextColor='#96a2b5'
            />

            <TextInput
              className='bg-white rounded-lg px-4 py-3 text-base mb-4 shadow-sm'
              placeholder='Education'
              value={education}
              onChangeText={setEducation}
              placeholderTextColor='#96a2b5'
            />

            <TextInput
              className='bg-white rounded-lg px-4 py-3 text-base mb-4 shadow-sm'
              placeholder='Company'
              value={company}
              onChangeText={setCompany}
              placeholderTextColor='#96a2b5'
            />

            <TextInput
              className='bg-white rounded-lg px-4 py-3 text-base mb-4 shadow-sm h-24'
              placeholder='About'
              value={about}
              onChangeText={setAbout}
              multiline={true}
              textAlignVertical='top'
              placeholderTextColor='#96a2b5'
            />

            <View className='flex-row gap-4 mt-4'>
              <TouchableOpacity
                className='flex-1 bg-gray-500 py-3 rounded-lg'
                onPress={onClose}
              >
                <Text className='text-white text-center text-base font-bold'>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className='flex-1 bg-blue-500 py-3 rounded-lg'
                onPress={handleSubmit}
              >
                <Text className='text-white text-center text-base font-bold'>
                  Add Member
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AddFamilyMemberModal;
