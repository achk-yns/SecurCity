// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer, {  login } from './auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';


const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add more reducers if you have them
  },
});

const initializeApp = async () => {
  try {
    const userData = await AsyncStorage.getItem('user');
    console.log("Storage",userData);
    if (userData) {
      const user = JSON.parse(userData);
      store.dispatch(login(user));
    }
  } catch (error) {
    console.error('Error loading user data from AsyncStorage:', error);
  }
};

initializeApp();

export default store;
