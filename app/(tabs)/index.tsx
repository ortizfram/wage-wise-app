import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import axios from "axios";
import RESP_URL from "../../config"; // Assuming this config file exists and exports the base URL
import { useRouter } from "expo-router";
import { getToken } from "../../storage";
import localforage from "localforage";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  email: string;
  _id: string;
}

const HomeScreen = () => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const testLocalForage = async () => {
      try {
        await localforage.setItem('testKey', 'testValue');
        const value = await localforage.getItem('testKey');
        console.log('LocalForage Test Value:', value);
        await localforage.removeItem('testKey');
      } catch (error) {
        console.error('LocalForage Test Error:', error);
      }
    };
    
    testLocalForage();

    const testAsyncStorage = async () => {
      try {
        await AsyncStorage.setItem('testKey', 'testValue');
        const value = await AsyncStorage.getItem('testKey');
        console.log('AsyncStorage Test Value:', value);
        await AsyncStorage.removeItem('testKey');
      } catch (error) {
        console.error('AsyncStorage Test Error:', error);
      }
    };
    
    testAsyncStorage();

    const fetchUserData = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(`${RESP_URL}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setUser(response.data); // Set the user state
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios Error:", error.message);
          if (error.response) {
            console.error("Response Error:", error.response.data);
          }
        } else {
          console.error("Unexpected Error:", error);
        }
      } finally {
        setIsLoading(false); // Ensure loading state is updated
      }
    };
  
    fetchUserData();
  }, []);
  

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Please log in</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Welcome, {user.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
