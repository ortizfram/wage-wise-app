import axios from "axios";
import { Link, useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import RESP_URL from "../../config";
import { AuthContext } from "@/context/AuthContext";


const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const val = useContext(AuthContext)


  const handleSignup = async () => {
    console.log("Handling signup");
    try {
      const response = await axios.post(
        `${RESP_URL}/api/users/register`,
        { email:email, password:password },
        { withCredentials: true }
      );
  
      console.log("Signup response:", response);
  
      if (response.status === 201) {
        console.log("Signed up successfully");
        router.push("/auth/login");
      } else {
        console.log("Unexpected status code:", response.status);
      }
    } catch (error) {
      console.error("Signup error:", error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Response error:", error.response.data);
          if (error.response.status === 409) {
            alert("User already exists");
          } else if (error.response.status === 400) {
            alert("All fields are required");
          } else {
            alert("Error signing up");
          }
        } else {
          alert("Error signing up");
        }
      } else {
        alert("Error signing up");
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.appname}>WAGE WISE</Text>
      <Text style={styles.header}>Signup</Text>
      <Text>{val}</Text>

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
