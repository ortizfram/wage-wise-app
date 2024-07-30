import React from 'react';
import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import axios from 'axios';
import RESP_URL from "../../config";
import { useRouter } from 'expo-router';
import { removeToken } from '@/storage';

const Settings = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post(`${RESP_URL}/api/users/logout`, {}, {
        withCredentials: true, // Ensure cookies are sent
      });
      await removeToken();
      // Clear local authentication state if necessary
      console.log("Logged out successfully");
      router.push("/auth/login"); // Redirect to login page
    } catch (error) {
      console.error("Error logging out", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <Pressable onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 24,
  },
  logoutButton: {
    padding: 20,
  },
  logoutText: {
    color: 'red',
    fontSize: 18,
  },
});

export default Settings;
