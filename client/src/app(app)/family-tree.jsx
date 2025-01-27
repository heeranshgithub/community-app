// Replace the outer View with this updated structure
<View className='flex-1 bg-gray-200'>
  {/* Header section for buttons */}
  <View className='w-full flex-row justify-between px-6 py-2'>
    <TouchableOpacity className='h-[40px] w-[100px] bg-blue-400 justify-center items-center rounded-md'>
      <Text className='font-bold text-black text-xl'>My Profile</Text>
    </TouchableOpacity>
    
    <TouchableOpacity
      className='h-[40px] w-[200px] bg-blue-700 justify-center items-center rounded-md'
      onPress={() => setIsModalVisible(true)}
    >
      <Text className='font-bold text-white text-xl'>Add Family Member</Text>
    </TouchableOpacity>
  </View>

  {/* Main content - wrap existing content in a centered container */}
  <View className='flex-1 justify-center items-center'>
    {/* Rest of your existing content */}
  </View>
</View>
