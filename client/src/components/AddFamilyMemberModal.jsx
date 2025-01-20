import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const AddFamilyMemberModal = ({ visible, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    relation: '',
    gender: '',
  });

  const relations = ['Father', 'Mother', 'Sibling', 'Spouse', 'Child'];
  const genders = ['Male', 'Female'];

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className='flex-1 justify-center items-center bg-black/50'>
        <View className='w-[90%] max-h-[80%] bg-white rounded-xl p-6'>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text className='text-2xl font-bold text-gray-800 mb-6 text-center'>
              Add Family Member
            </Text>

            <View className='mb-4'>
              <Text className='text-gray-700 mb-2'>Name</Text>
              <TextInput
                className='border border-gray-300 rounded-lg p-3 bg-gray-50'
                placeholder='Enter name'
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
              />
            </View>

            <View className='mb-4'>
              <Text className='text-gray-700 mb-2'>Relation</Text>
              <View className='flex-row flex-wrap gap-2'>
                {relations.map((relation) => (
                  <TouchableOpacity
                    key={relation}
                    className={`py-2 px-4 rounded-full ${
                      formData.relation === relation
                        ? 'bg-blue-500'
                        : 'bg-gray-200'
                    }`}
                    onPress={() => setFormData({ ...formData, relation })}
                  >
                    <Text
                      className={`${
                        formData.relation === relation
                          ? 'text-white'
                          : 'text-gray-700'
                      }`}
                    >
                      {relation}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View className='mb-6'>
              <Text className='text-gray-700 mb-2'>Gender</Text>
              <View className='flex-row gap-4'>
                {genders.map((gender) => (
                  <TouchableOpacity
                    key={gender}
                    className={`py-2 px-4 rounded-full ${
                      formData.gender === gender
                        ? gender === 'Male'
                          ? 'bg-blue-500'
                          : 'bg-pink-400'
                        : 'bg-gray-200'
                    }`}
                    onPress={() => setFormData({ ...formData, gender })}
                  >
                    <Text
                      className={`${
                        formData.gender === gender
                          ? 'text-white'
                          : 'text-gray-700'
                      }`}
                    >
                      {gender}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View className='flex-row gap-4'>
              <TouchableOpacity
                className='flex-1 bg-gray-200 py-3 rounded-lg'
                onPress={onClose}
              >
                <Text className='text-center text-gray-700 font-semibold'>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className='flex-1 bg-blue-500 py-3 rounded-lg'
                onPress={handleSubmit}
              >
                <Text className='text-center text-white font-semibold'>
                  Add Member
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AddFamilyMemberModal;
