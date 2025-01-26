import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useGetTreeQuery } from '../../store/api/treeApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentTreeId } from '../../store/slices/treeSlice';
// import { sampleUserData as userDataW } from '../../utils';
import Form from '../../components/FormModal';
import { clearUser, getUserId } from '../../store/slices/userSlice';
import DetailsModal from '../../components/DetailsModal';

const FamilyTree = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  let treeId = useSelector(getCurrentTreeId);
  const loggedInUserId = useSelector(getUserId);
  if (!treeId) treeId = loggedInUserId;

  const {
    data: userData,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetTreeQuery(treeId);

  console.log(userData);

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

      {/* <Form
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        creatorTreeId={treeId}
      /> */}
      <DetailsModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        personId='6794bedd78ce7c31e828b5e6'
      />

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
                  <Text className='text-white text-lg'>
                    {userData?.father.split('-')[1]}
                  </Text>
                </View>
              )}

              {userData?.mother && (
                <View className='p-3 rounded-lg bg-pink-400 shadow-lg'>
                  <Text className='text-white text-lg'>
                    {userData?.mother.split('-')[1]}
                  </Text>
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
                  {(chunk || []).map((sibling, index) => (
                    <View
                      key={index}
                      className={`p-3 rounded-lg shadow-lg ${
                        sibling?.split('-')[2] === 'Male'
                          ? 'bg-blue-500'
                          : 'bg-pink-400'
                      }`}
                    >
                      <Text className='text-white text-lg'>
                        {sibling?.split('-')[1]}
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
                  <Text className='text-white text-lg'>
                    {userData?.spouse.split('-')[1]}
                  </Text>
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
                        child?.split('-')[2] === 'Male'
                          ? 'bg-blue-500'
                          : 'bg-pink-400'
                      }`}
                    >
                      <Text className='text-white text-lg'>
                        {child?.split('-')[1]}
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
      <TouchableOpacity
        className='absolute bottom-4 h-[40px] w-[200px] bg-blue-700 justify-center items-center rounded-md'
        onPress={() => dispatch(clearUser())}
      >
        <Text className='font-bold text-white text-xl'>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FamilyTree;
