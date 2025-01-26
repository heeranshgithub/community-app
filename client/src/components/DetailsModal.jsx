import React from 'react';
import { Text, TouchableOpacity, View, Modal } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useGetTreeQuery } from '../store/api/treeApiSlice';

const DetailsModal = ({ visible, onClose, personId }) => {
  const {
    data: memberDetails,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetTreeQuery(personId);
  console.log('memberDetails', memberDetails);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(2);
    return `${day}-${month}-${year}`;
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
          >
            <View className='flex-row justify-between items-center mb-6'>
              <Text className='text-white text-2xl font-bold'>
                Family Member Details
              </Text>

              <TouchableOpacity
                onPress={onClose}
                className='p-2 rounded-full bg-gray-700'
              >
                <Text className='text-white text-lg'>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Relation */}
            <View className='mb-4'>
              <Text className='text-white text-sm mb-2'>Relation</Text>
              <View className='bg-white rounded-lg px-4 py-3 shadow-sm'>
                {/* <Text className='text-base'>{memberDetails.relation}</Text> */}
              </View>
            </View>

            {/* Name */}
            <View className='mb-4'>
              <Text className='text-white text-sm mb-2'>Name</Text>
              <View className='bg-white rounded-lg px-4 py-3 shadow-sm'>
                {/* <Text className='text-base'>{memberDetails.name}</Text> */}
              </View>
            </View>

            {/* Number */}
            <View className='mb-4'>
              <Text className='text-white text-sm mb-2'>Number</Text>
              <View className='bg-white rounded-lg px-4 py-3 shadow-sm'>
                {/* <Text className='text-base'>{memberDetails.number}</Text> */}
              </View>
            </View>

            {/* Date of Birth */}
            <View className='mb-4'>
              <Text className='text-white text-sm mb-2'>Date of Birth</Text>
              <View className='bg-white rounded-lg px-4 py-3 shadow-sm'>
                <Text className='text-base'>
                  {/* {formatDate(memberDetails.dob)} */}
                </Text>
              </View>
            </View>

            {/* Gender */}
            <View className='mb-4'>
              <Text className='text-white text-sm mb-2'>Gender</Text>
              <View className='bg-white rounded-lg px-4 py-3 shadow-sm'>
                {/* <Text className='text-base'>{memberDetails.gender}</Text> */}
              </View>
            </View>

            {/* Address */}
            <View className='mb-4'>
              <Text className='text-white text-sm mb-2'>Address</Text>
              <View className='bg-white rounded-lg px-4 py-3 shadow-sm'>
                {/* <Text className='text-base'>{memberDetails.address}</Text> */}
              </View>
            </View>

            {/* Education */}
            <View className='mb-4'>
              <Text className='text-white text-sm mb-2'>Education</Text>
              <View className='bg-white rounded-lg px-4 py-3 shadow-sm'>
                {/* <Text className='text-base'>{memberDetails.education}</Text> */}
              </View>
            </View>

            {/* Company */}
            <View className='mb-4'>
              <Text className='text-white text-sm mb-2'>Company</Text>
              <View className='bg-white rounded-lg px-4 py-3 shadow-sm'>
                {/* <Text className='text-base'>{memberDetails.company}</Text> */}
              </View>
            </View>

            {/* About */}
            <View className='mb-4'>
              <Text className='text-white text-sm mb-2'>About</Text>
              <View className='bg-white rounded-lg px-4 py-3 shadow-sm h-24'>
                {/* <Text className='text-base'>{memberDetails.about}</Text> */}
              </View>
            </View>

            {/* Close Button */}
            <View className='mt-4'>
              <TouchableOpacity
                className='bg-blue-500 py-3 rounded-lg'
                onPress={onClose}
              >
                <Text className='text-white text-center text-base font-bold'>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default DetailsModal;
