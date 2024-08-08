import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

const rolesDashboard = () => {
  const orgName = "name";
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Roles Dashboard</Text>
        <Text style={styles.org}>Organization: {orgName}</Text>
      </View>
      <View style={styles.card}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Add a Role</Text>
        </Pressable>
      </View>
      <View style={styles.card}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>See and Update Roles</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default rolesDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Dark background color
    padding: 16,
  },
  org:{
    color:"blue",
    fontSize:20
  },
  header: {
    marginBottom: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    color: "#ffffff", // Light text color for contrast
  },
  card: {
    backgroundColor: "#1e1e1e", // Dark card background
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 24,
    color: "#ffffff", // Light text color for card titles
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#333333", // Slightly lighter background for button
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff", // Light text color for button text
    fontSize: 16,
  },
});
