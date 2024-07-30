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

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/users/login", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        console.log("Logged in successfully");
        router.push("/"); // Navigate to home page
      } else {
        console.log("Error logging in");
      }
    } catch (error) {
      alert("Wrong Email or Password");
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
      <Pressable onPress={handleLogin} style={styles.button}>
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
  link:{
    marginTop:20
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
  button:{
    padding:20,
    backgroundColor:'blue',
  },
  textButton:{
    color:"#e3e3e3"
  }
});
