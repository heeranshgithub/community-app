import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  StyleSheet,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Colors from '../theme/Colors';

const Form = () => {
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
      Alert.alert('Form Submitted', `Details updated.`);
    } else {
      Alert.alert('Error', 'Please fill out all fields.');
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps='handled'
      enableOnAndroid={true}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>Edit Details</Text>
        <TextInput
          style={styles.input}
          placeholder='Name'
          value={name}
          onChangeText={setName}
          placeholderTextColor='#96a2b5'
        />
        <TextInput
          style={styles.input}
          placeholder='Number'
          value={number}
          onChangeText={setNumber}
          keyboardType='numeric'
          placeholderTextColor='#96a2b5'
        />
        <TextInput
          style={styles.input}
          placeholder='Address'
          value={address}
          onChangeText={setAddress}
          placeholderTextColor='#96a2b5'
        />
        <TextInput
          style={styles.input}
          placeholder='Family Head'
          value={familyHead}
          onChangeText={setFamilyHead}
          placeholderTextColor='#96a2b5'
        />
        <TextInput
          style={styles.input}
          placeholder='Age'
          value={age}
          onChangeText={setAge}
          placeholderTextColor='#96a2b5'
        />
        <TextInput
          style={styles.input}
          placeholder='Gender'
          value={gender}
          onChangeText={setGender}
          placeholderTextColor='#96a2b5'
        />
        <TextInput
          style={styles.input}
          placeholder='Education'
          value={education}
          onChangeText={setEducation}
          placeholderTextColor='#96a2b5'
        />
        <TextInput
          style={styles.input}
          placeholder='Company'
          value={company}
          onChangeText={setCompany}
          placeholderTextColor='#96a2b5'
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder='About'
          value={about}
          onChangeText={setAbout}
          multiline={true}
          placeholderTextColor='#96a2b5'
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDarkBlue,
    paddingTop: 44,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 30,
  },
  formContainer: {
    width: '100%',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: Colors.submitButtonBlue,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Form;
