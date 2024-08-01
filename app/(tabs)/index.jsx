import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import axios from "axios";
import RESP_URL from "../../config"; // Assuming this config file exists and exports the base URL
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinnerr from "react-native-loading-spinner-overlay";
import { AuthContext } from "@/context/AuthContext";

const HomeScreen = () => {
  const router = useRouter();

  const { isLoading, userInfo } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Spinnerr visible={isLoading} />
      <Text>Welcome {userInfo ? userInfo.email : ""}</Text>
      {userInfo?.token ? (
        ""
      ) : (
        <Link href="/auth/login" style={styles.link}>
          <Text>Please log in</Text>
        </Link>
      )}
      {/* <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderData}
        /> */}
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
