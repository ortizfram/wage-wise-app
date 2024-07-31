import axios from "axios";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RESP_URL from "../../config"; // Assuming this config file exists and exports the base URL

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      console.log("Sending login request");
      const response = await axios.post(
        `${RESP_URL}/api/users/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Response received, setting token");
        await AsyncStorage.setItem("token", response.data.token);
        console.log("Token set in AsyncStorage");
        router.push("/"); // Navigate to home page
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401) {
            alert("Invalid credentials");
          } else {
            alert("Error logging in");
          }
          console.log("Error response data:", error.response.data.message);
        } else {
          alert("Error logging in");
          console.log("Error message:", error.message);
        }
      } else {
        alert("Error logging in");
        console.log("Error:", (error as Error).message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appname}>WAGE WISE</Text>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        inputMode="email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable
        onPress={() => {
          console.log("login button pressed");
          handleLogin();
        }}
        style={styles.button}
      >
        <Text style={styles.textButton}>Login</Text>
      </Pressable>
      <Pressable style={styles.link}>
        <Link href="/auth/signup">
          <Text style={{ color: "blue" }}>I don't have an account yet</Text>
        </Link>
      </Pressable>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  link: {
    marginTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 24,
  },
  appname: {
    fontSize: 30,
    marginBottom: 15,
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  button: {
    padding: 20,
    backgroundColor: "blue",
  },
  textButton: {
    color: "#e3e3e3",
  },
});
