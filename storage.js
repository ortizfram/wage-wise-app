import AsyncStorage from '@react-native-async-storage/async-storage';
import localforage from 'localforage';

const isWeb = typeof window !== 'undefined';

const storage = isWeb ? localforage : AsyncStorage;

export const storeToken = async (token) => {
  try {
    await storage.setItem('token', token);
  } catch (error) {
    console.error('Failed to store token', error);
  }
};

export const getToken = async () => {
  try {
    return await storage.getItem('token');
  } catch (error) {
    console.error('Failed to get token', error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await storage.removeItem('token');
  } catch (error) {
    console.error('Failed to remove token', error);
  }
};
