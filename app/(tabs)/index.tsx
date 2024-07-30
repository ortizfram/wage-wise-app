import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import axios from "axios";
import RESP_URL from "../../config"; // Assuming this config file exists and exports the base URL
import { useRouter } from "expo-router";

interface User {
  email: string;
  _id: string;
}

const HomeScreen = () => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${RESP_URL}/api/users/profile`, {
          withCredentials: true, // Ensure cookies are sent
        });
        setUser(response.data);
      } catch (error) {
        console.log("Error fetching user data", error);
        setUser(null); // User is not authenticated
        if (error) {
          router.push("/auth/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
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
