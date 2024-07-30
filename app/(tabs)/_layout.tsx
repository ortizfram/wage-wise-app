import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "../(tabs)/settings"; // Adjust the import path as necessary
import HomeScreen from "../(tabs)/index"; // Adjust the import path as necessary
import { MaterialIcons } from "@expo/vector-icons";
import DashboardScreen from "./dashboard";

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name={"home"} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="dashboard"
        component={DashboardScreen}
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="dashboard" // Use the appropriate icon name for your dashboard
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name={"settings"} size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
