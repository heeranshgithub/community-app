import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { useGetTreeQuery } from '../../store/api/treeApiSlice';
import { useSelector } from 'react-redux';
import { getCurrentTreeId } from '../../store/slices/treeSlice';
import { sampleUserData as userData } from '../../utils';
import Form from '../../components/Form';
import Colors from '../../theme/Colors';
import AddFamilyMemberModal from '../../components/AddFamilyMemberModal';

const FamilyTree = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const treeId = useSelector(getCurrentTreeId);

  const {
    data: userDataW,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetTreeQuery(treeId);

  // Helper to chunk children and siblings into rows of 3
  const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const siblingsChunks = chunkArray(userData?.siblings || [], 3);
  const childrenChunks = chunkArray(userData?.children || [], 3);

  return (
    <View className='relative flex-1 justify-center items-center bg-gray-200'>
      <TouchableOpacity className='absolute top-8 left-6 h-[40px] w-[100px] bg-blue-400 justify-center items-center rounded-md'>
        <Text className='font-bold text-black text-xl'>My Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className='absolute top-8 right-6 h-[40px] w-[200px] bg-blue-700 justify-center items-center rounded-md'
        onPress={() => setIsModalVisible(true)}
      >
        <Text className='font-bold text-white text-xl'>Add Family Member</Text>
      </TouchableOpacity>
      {/* <AddFamilyMemberModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      /> */}
      <Form visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
      {userData?.name ? (
        <View>
          {/* Parents */}
          <View className='mb-9'>
            <Text className='text-xl font-bold text-center text-gray-800 mb-2'>
              Father and Mother
            </Text>
            <View className='flex-row justify-center gap-x-4'>
              {userData?.father && (
                <View className='p-3 rounded-lg bg-blue-500 shadow-lg'>
                  <Text className='text-white text-lg'>{userData?.father}</Text>
                </View>
              )}

              {userData?.mother && (
                <View className='p-3 rounded-lg bg-pink-400 shadow-lg'>
                  <Text className='text-white text-lg'>{userData?.mother}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Siblings */}
          <View className='mb-9'>
            <Text className='text-xl font-bold text-center text-gray-800 mb-2'>
              Siblings
            </Text>
            {userData.siblings &&
              (siblingsChunks || []).map((chunk, rowIndex) => (
                <View
                  key={rowIndex}
                  className='flex-row justify-center gap-x-4 mb-4'
                >
                  {(chunk || []).map((child, index) => (
                    <View
                      key={index}
                      className={`p-3 rounded-lg shadow-lg ${
                        child.gender === 'Male' ? 'bg-blue-500' : 'bg-pink-400'
                      }`}
                    >
                      <Text className='text-white text-lg'>
                        {child?.childName}
                      </Text>
                    </View>
                  ))}
                </View>
              ))}
          </View>

          {/* User and Spouse */}
          <View className='mb-9'>
            <Text className='text-xl font-bold text-center text-gray-800 mb-2'>
              You and Spouse
            </Text>
            <View className='flex-row justify-center gap-x-4'>
              {/* No conditional here, because if there's userData, there's going to be a name */}
              <View
                className={`p-3 rounded-lg shadow-lg ${
                  userData?.gender === 'Male' ? 'bg-blue-500' : 'bg-pink-400'
                }`}
              >
                <Text className='text-white text-lg'>{userData?.name}</Text>
              </View>
              {userData?.spouse && (
                <View
                  className={`p-3 rounded-lg shadow-lg ${
                    userData?.gender === 'Male' ? 'bg-pink-400' : 'bg-blue-500'
                  }`}
                >
                  <Text className='text-white text-lg'>{userData?.spouse}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Children */}
          <View className='mb-9'>
            <Text className='text-xl font-bold text-center text-gray-800 mb-2'>
              Children
            </Text>
            {userData?.children &&
              (childrenChunks || []).map((chunk, rowIndex) => (
                <View
                  key={rowIndex}
                  className='flex-row justify-center gap-x-4 mb-4'
                >
                  {(chunk || []).map((child, index) => (
                    <View
                      key={index}
                      className={`p-3 rounded-lg shadow-lg ${
                        child.gender === 'Male' ? 'bg-blue-500' : 'bg-pink-400'
                      }`}
                    >
                      <Text className='text-white text-lg'>
                        {child?.childName}
                      </Text>
                    </View>
                  ))}
                </View>
              ))}
          </View>
        </View>
      ) : (
        <Text className='text-xl text-gray-600'>No Data Found!</Text>
      )}
    </View>
  );
};

export default FamilyTree;
