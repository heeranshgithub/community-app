import * as SecureStore from 'expo-secure-store';

// Constants for storage keys
const STORAGE_KEYS = {
  USER_TOKEN: 'userToken',
  USER_ID: 'userId',
};

export const secureStorage = {
  saveUserToken: async (token) => {
    try {
      await SecureStore.setItemAsync(STORAGE_KEYS.USER_TOKEN, token);
    } catch (error) {
      console.error('Error saving user token:', error);
    }
  },
  saveUserId: async (userId) => {
    try {
      await SecureStore.setItemAsync(STORAGE_KEYS.USER_ID, userId.toString());
    } catch (error) {
      console.error('Error saving user ID:', error);
    }
  },
  getUserToken: async () => {
    try {
      return await SecureStore.getItemAsync(STORAGE_KEYS.USER_TOKEN);
    } catch (error) {
      console.error('Error getting user token:', error);
      return null;
    }
  },
  async getUserId() {
    try {
      const userId = await SecureStore.getItemAsync(STORAGE_KEYS.USER_ID);
      return userId ? userId : null;
    } catch (error) {
      console.error('Error getting user ID:', error);
      return null;
    }
  },
  async clearUserData() {
    try {
      await SecureStore.deleteItemAsync(STORAGE_KEYS.USER_TOKEN);
      await SecureStore.deleteItemAsync(STORAGE_KEYS.USER_ID);
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  },
};
