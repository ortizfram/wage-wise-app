import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "./settings"; // Adjust the import path as necessary
import { MaterialIcons } from "@expo/vector-icons";
import DashboardScreen from "./dashboard";

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  //[orgId]/(tabs)/_layout
  return (
    <Tab.Navigator>
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
