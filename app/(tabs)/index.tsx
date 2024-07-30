import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import axios from "axios";
import RESP_URL from "../../config"; // Assuming this config file exists and exports the base URL

interface User {
  email: string;
  _id: string;
}

export default function HomeScreen() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${RESP_URL}/api/users/profile`, {
          withCredentials: true, // Ensure cookies are sent
        });
        setUser(response.data);
      } catch (error) {
        console.log("Error fetching user data", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      {user ? <Text>Welcome, {user.email}</Text> : <Text>Loading...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
