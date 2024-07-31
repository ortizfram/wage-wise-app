import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import axios from "axios";
import RESP_URL from "../../config"; // Assuming this config file exists and exports the base URL
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";


const HomeScreen = () => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(`${RESP_URL}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setUser(response.data); // Set the user state
        setIsLoading(false);
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

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((reponse) => setData(reponse.data))
      .catch((err) => console.error(err));
  }, []);

  const renderData = ({ item }) => {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    );
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Link href="/auth/login" style={styles.link}>
          <Text>Please log in</Text>
          <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderData}
      />
        </Link>
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
  link: {
    color: "blue",
  },
});

export default HomeScreen;
