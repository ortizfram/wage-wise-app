import axios from "axios";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import RESP_URL from "../../config";

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        `${RESP_URL}/api/users/register`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        console.log("Signed up successfully");
        router.push("/auth/login");
      } else {
        console.log("error");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Axios specific error handling
        if (error.response) {
          if (error.response.status === 409) {
            alert("User already exists");
          } else if (error.response.status === 400) {
            alert("All fields are required");
          } else {
            alert("Error signing up");
          }
          console.log(error.response.data.message);
        } else {
          alert("Error signing up");
          console.log(error.message);
        }
      } else {
        // Generic error handling
        alert("Error signing up");
        console.log((error as Error).message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appname}>WAGE WISE</Text>
      <Text style={styles.header}>Signup</Text>
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
          console.log("Signup button pressed");
          handleSignup();
        }}
        style={styles.button}
      >
        <Text style={styles.textButton}>Signup</Text>
      </Pressable>
      <Pressable style={styles.link}>
        <Link href="/auth/login">
          <Text style={{ color: "blue" }}>Already have an account</Text>
        </Link>
      </Pressable>
    </View>
  );
};

export default Signup;

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
