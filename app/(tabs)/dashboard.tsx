import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import React from "react";

const Dashboard = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Manage roles (add,remove,update)</Text>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Roles</Text>
        </Pressable>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Check and send reports</Text>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Reports</Text>
        </Pressable>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Fix forgotten record</Text>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>employee records</Text>
        </Pressable>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Manage partner / accountant contacts
        </Text>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>contacts</Text>
        </Pressable>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Asign cash advance to a user</Text>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>cash advance</Text>
        </Pressable>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Alert history</Text>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>alerts</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Dark background color
    padding: 16,
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
