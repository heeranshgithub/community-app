import { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { usePostTreeMutation } from '../store/api/treeApiSlice';
import { formatDate } from '../utils';

const FormModal = ({ visible, onClose, creatorTreeId }) => {
  const [relation, setRelation] = useState('');
  const [relationItems, setRelationItems] = useState([
    { label: 'Spouse', value: 'Spouse' },
    { label: 'Father', value: 'Father' },
    { label: 'Mother', value: 'Mother' },
    { label: 'Sibling', value: 'Sibling' },
    { label: 'Child', value: 'Child' },
  ]);
  const [relationOpen, setRelationOpen] = useState(false);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const todayDate = new Date();

  const [gender, setGender] = useState('');
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderItems, setGenderItems] = useState([
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ]);

  const [address, setAddress] = useState('');
  const [education, setEducation] = useState('');
  const [company, setCompany] = useState('');
  const [about, setAbout] = useState('');

  const [postTree, { isLoading }] = usePostTreeMutation();

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);

    if (selectedDate) {
      setDob(selectedDate);
    }
  };

  const handleSubmit = async () => {
    if (dob.getDate() === todayDate.getDate()) {
      Alert.alert('Error', 'Please select valid DOB. DOB cannot be today.');
      return;
    }
    if (
      !name ||
      !number ||
      !address ||
      !gender ||
      !education ||
      !company ||
      !about
    ) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    // Handle form submission here, with dob.toISOString()
    try {
      const treeData = {
        creatorId: creatorTreeId,
        relation,
        name,
        number,
        dob: dob.toISOString(),
        gender,
        address,
        education,
        company,
        about,
      };

      await postTree({ creatorTreeId, treeData }).unwrap();

      Alert.alert('Success', 'Family member added successfully', [
        {
          text: 'OK',
          onPress: () => {
            clearForm();
            onClose();
          },
        },
      ]);
    } catch (error) {
      let errorMessage = 'Failed to add family member';
      if (error.data.message.split(' ')[0] === 'E11000') {
        errorMessage = 'User with this number already exists!';
      }
      Alert.alert('Error', errorMessage);
    }
  };

  const clearForm = () => {
    setRelation('');
    setName('');
    setNumber('');
    setAddress('');
    setDob(new Date());
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
                <Text className='text-white text-lg px-2'>✕</Text>
              </TouchableOpacity>
            </View>

            <Text className='text-white text-sm mb-2'>Relation</Text>
            <DropDownPicker
              open={relationOpen}
              value={relation}
              items={relationItems}
              setOpen={setRelationOpen}
              setValue={setRelation}
              setItems={setRelationItems}
              placeholder='Select Relation'
              placeholderStyle={{
                color: '#A9A9A9',
              }}
              style={{
                backgroundColor: 'white',
                borderRadius: 8,
                marginBottom: 4,
                borderColor: '#D1D5DB',
              }}
              dropDownContainerStyle={{
                backgroundColor: 'white',
                borderColor: '#D1D5DB',
              }}
              textStyle={{
                fontSize: 14,
              }}
            />

            <Text className='text-white text-sm mb-2 mt-4'>Name</Text>
            <TextInput
              className='bg-white rounded-lg px-4 h-12 text-base mb-4 shadow-sm'
              placeholder='Name'
              value={name}
              onChangeText={setName}
              placeholderTextColor='#96a2b5'
            />

            <Text className='text-white text-sm mb-2'>Number</Text>
            <TextInput
              className='bg-white rounded-lg px-4 h-12 text-base mb-4 shadow-sm'
              placeholder='Number'
              value={number}
              onChangeText={setNumber}
              keyboardType='numeric'
              placeholderTextColor='#96a2b5'
            />

            <Text className='text-white text-sm mb-2'>Date of Birth</Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              className='bg-white rounded-lg px-4 py-2 mb-4 shadow-sm'
            >
              <Text
                className={
                  dob ? 'text-black text-base' : 'text-[#96a2b5] text-base'
                }
              >
                {dob.getDate() !== todayDate.getDate()
                  ? formatDate(dob.toISOString())
                  : 'Date of Birth'}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={dob}
                mode='date'
                display='default'
                onChange={onDateChange}
                maximumDate={new Date()}
              />
            )}

            <Text className='text-white text-sm mb-2'>Gender</Text>
            <DropDownPicker
              open={genderOpen}
              value={gender}
              items={genderItems}
              setOpen={setGenderOpen}
              setValue={setGender}
              setItems={setGenderItems}
              placeholder='Select Gender'
              placeholderStyle={{
                color: '#A9A9A9',
              }}
              style={{
                backgroundColor: 'white',
                borderRadius: 8,
                marginBottom: 4,
                borderColor: '#D1D5DB',
              }}
              dropDownContainerStyle={{
                backgroundColor: 'white',
                borderColor: '#D1D5DB',
              }}
              textStyle={{
                fontSize: 16,
              }}
            />

            <Text className='text-white text-sm mb-2 mt-4'>Address</Text>
            <TextInput
              className='bg-white rounded-lg px-4 py-2 text-base mb-4 shadow-sm h-24'
              placeholder='Address'
              value={address}
              onChangeText={setAddress}
              multiline={true}
              textAlignVertical='top'
              placeholderTextColor='#96a2b5'
            />

            <Text className='text-white text-sm mb-2'>Education</Text>
            <TextInput
              className='bg-white rounded-lg px-4 h-12 text-base mb-4 shadow-sm'
              placeholder='Education'
              value={education}
              onChangeText={setEducation}
              placeholderTextColor='#96a2b5'
            />

            <Text className='text-white text-sm mb-2'>Company</Text>
            <TextInput
              className='bg-white rounded-lg px-4 h-12 text-base mb-4 shadow-sm'
              placeholder='Company'
              value={company}
              onChangeText={setCompany}
              placeholderTextColor='#96a2b5'
            />

            <Text className='text-white text-sm mb-2'>About</Text>
            <TextInput
              className='bg-white rounded-lg px-4 py-2 text-base mb-4 shadow-sm h-24'
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
                onPress={clearForm}
              >
                <Text className='text-white text-center text-base font-bold'>
                  Clear
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

export default FormModal;
