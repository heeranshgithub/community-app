import { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { useGetTreeQuery } from '../../store/api/treeApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentTreeId } from '../../store/slices/treeSlice';
import FormModal from '../../components/FormModal';
import { clearUser, getUserId } from '../../store/slices/userSlice';
import DetailsModal from '../../components/DetailsModal';

const FamilyTree = () => {
  const [formModalVisible, setFormModalVisible] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [selectedMemberRelation, setSelectedMemberRelation] = useState(null);
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

  const fatherTreeId = userData?.father ? userData.father.split('-')[0] : '';
  const motherTreeId = userData?.mother ? userData.mother.split('-')[0] : '';
  const spouseTreeId = userData?.spouse ? userData.spouse.split('-')[0] : '';
  const hasFatherOrMother = fatherTreeId || motherTreeId;

  let userParentData;
  if (fatherTreeId) {
    const { data, error, isLoading, isSuccess, isError } =
      useGetTreeQuery(fatherTreeId);
    userParentData = data;
  } else if (motherTreeId) {
    const { data, error, isLoading, isSuccess, isError } =
      useGetTreeQuery(motherTreeId);
    userParentData = data;
  }

  const existingMembers = [];
  if (fatherTreeId) existingMembers.push('Father');
  if (motherTreeId) existingMembers.push('Mother');
  if (spouseTreeId) existingMembers.push('Spouse');

  const initialAvailableRelations = [
    { label: 'Father', value: 'Father' },
    { label: 'Mother', value: 'Mother' },
  ];

  const allAvailableRelations = [
    { label: 'Spouse', value: 'Spouse' },
    { label: 'Father', value: 'Father' },
    { label: 'Mother', value: 'Mother' },
    { label: 'Sibling', value: 'Sibling' },
    { label: 'Child', value: 'Child' },
  ].filter((relation) => !existingMembers.includes(relation.value));

  // Helper to chunk children and siblings into rows of 3
  const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const siblingsChunks = chunkArray(userParentData?.children || [], 3);
  const childrenChunks = chunkArray(userData?.children || [], 3);

  return (
    <View className='flex-1 bg-[#1a2c4d] px-4'>
      {/* Header section for buttons */}
      <View className={`w-full flex-row justify-between py-2`}>
        <TouchableOpacity
          className={`bg-blue-400 justify-center items-center rounded-md ${
            Platform.OS === 'ios' ? 'px-2 py-2' : 'px-4 py-2'
          }`}
          onPress={() => {
            setSelectedMemberId(treeId);
            setSelectedMemberRelation(null);
            setDetailsModalVisible(true);
          }}
        >
          <Text className='font-bold text-black text-xl'>My Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`bg-blue-400 justify-center items-center rounded-md ${
            Platform.OS === 'ios' ? 'px-2 py-2' : 'px-4 py-2'
          }`}
          onPress={() => setFormModalVisible(true)}
        >
          <Text className='font-bold text-white text-xl'>
            Add Family Member
          </Text>
        </TouchableOpacity>
      </View>

      <FormModal
        visible={formModalVisible}
        onClose={() => setFormModalVisible(false)}
        creatorTreeId={treeId}
        existingMembers={existingMembers}
        availableRelations={
          hasFatherOrMother ? allAvailableRelations : initialAvailableRelations
        }
      />

      <DetailsModal
        visible={detailsModalVisible}
        onClose={() => setDetailsModalVisible(false)}
        personId={selectedMemberId}
        relation={selectedMemberRelation}
      />

      {userData?.name ? (
        <View className='flex-1 justify-center items-center'>
          {/* Parents */}
          <View className='mb-9'>
            <Text className='text-xl font-bold text-center text-white mb-2'>
              Father and Mother
            </Text>
            <View className='flex-row justify-center gap-x-4'>
              {userData?.father && (
                <TouchableOpacity
                  className='p-3 rounded-lg bg-blue-500 shadow-lg'
                  onPress={() => {
                    setSelectedMemberId(userData?.father.split('-')[0]);
                    setSelectedMemberRelation('Father');
                    setDetailsModalVisible(true);
                  }}
                >
                  <Text className='text-white text-lg'>
                    {userData?.father.split('-')[1]}
                  </Text>
                </TouchableOpacity>
              )}

              {userData?.mother && (
                <TouchableOpacity
                  className='p-3 rounded-lg bg-pink-400 shadow-lg'
                  onPress={() => {
                    setSelectedMemberId(userData?.mother.split('-')[0]);
                    setSelectedMemberRelation('Mother');
                    setDetailsModalVisible(true);
                  }}
                >
                  <Text className='text-white text-lg'>
                    {userData?.mother.split('-')[1]}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Siblings */}
          <View className='mb-9'>
            <Text className='text-xl font-bold text-center text-white mb-2'>
              Siblings
            </Text>
            {userParentData?.children &&
              (siblingsChunks || []).map((chunk, rowIndex) => (
                <View
                  key={rowIndex}
                  className='flex-row justify-center gap-x-4 mb-4'
                >
                  {(chunk || []).map((sibling, index) => (
                    <TouchableOpacity
                      key={index}
                      className={`p-3 rounded-lg shadow-lg ${
                        sibling?.split('-')[2] === 'Male'
                          ? 'bg-blue-500'
                          : 'bg-pink-400'
                      }`}
                      onPress={() => {
                        setSelectedMemberId(sibling?.split('-')[0]);
                        setSelectedMemberRelation('Sibling');
                        setDetailsModalVisible(true);
                      }}
                    >
                      <Text className='text-white text-lg'>
                        {sibling?.split('-')[1]}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
          </View>

          {/* User and Spouse */}
          <View className='mb-9'>
            <Text className='text-xl font-bold text-center text-white mb-2'>
              You and Spouse
            </Text>
            <View className='flex-row justify-center gap-x-4'>
              {/* User */}
              <TouchableOpacity
                className={`p-3 rounded-lg shadow-lg ${
                  userData?.gender === 'Male' ? 'bg-blue-500' : 'bg-pink-400'
                }`}
                onPress={() => {
                  setSelectedMemberId(userData?.id);
                  setSelectedMemberRelation(null);
                  setDetailsModalVisible(true);
                }}
              >
                <Text className='text-white text-lg'>{userData?.name}</Text>
              </TouchableOpacity>
              {userData?.spouse && (
                <TouchableOpacity
                  className={`p-3 rounded-lg shadow-lg ${
                    userData?.gender === 'Male' ? 'bg-pink-400' : 'bg-blue-500'
                  }`}
                  onPress={() => {
                    setSelectedMemberId(userData?.spouse.split('-')[0]);
                    setSelectedMemberRelation('Spouse');
                    setDetailsModalVisible(true);
                  }}
                >
                  <Text className='text-white text-lg'>
                    {userData?.spouse.split('-')[1]}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Children */}
          <View className='mb-9'>
            <Text className='text-xl font-bold text-center text-white mb-2'>
              Children
            </Text>
            {userData?.children &&
              (childrenChunks || []).map((chunk, rowIndex) => (
                <View
                  key={rowIndex}
                  className='flex-row justify-center gap-x-4 mb-4'
                >
                  {(chunk || []).map((child, index) => (
                    <TouchableOpacity
                      key={index}
                      className={`p-3 rounded-lg shadow-lg ${
                        child?.split('-')[2] === 'Male'
                          ? 'bg-blue-500'
                          : 'bg-pink-400'
                      }`}
                      onPress={() => {
                        setSelectedMemberId(child?.split('-')[0]);
                        setSelectedMemberRelation('Child');
                        setDetailsModalVisible(true);
                      }}
                    >
                      <Text className='text-white text-lg'>
                        {child?.split('-')[1]}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
          </View>
        </View>
      ) : (
        <Text className='text-xl text-gray-600'>No Data Found!</Text>
      )}
      <TouchableOpacity
        className='mx-auto bg-blue-700 justify-center items-center rounded-md px-2 py-2 mb-4'
        onPress={() => dispatch(clearUser())}
      >
        <Text className='font-bold text-white text-xl'>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FamilyTree;
