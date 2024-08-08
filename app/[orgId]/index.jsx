import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import { Link, useRouter } from "expo-router";
import Spinnerr from "react-native-loading-spinner-overlay";
import { AuthContext } from "@/context/AuthContext";

const HomeScreen = () => {
  //[orgId]/index
  const router = useRouter();

  const { isLoading, userInfo } = useContext(AuthContext);

  const data = [
    {
      id: "1",
      name: "Organization One",
      image: "https://via.placeholder.com/100",
    },
    {
      id: "2",
      name: "Organization Two",
      image: "https://via.placeholder.com/100",
    },
    {
      id: "3",
      name: "Organization Three",
      image: "https://via.placeholder.com/100",
    },
  ];

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.itemContainer}
      onPress={() => router.push(`/${item.id}/dashboard`)}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Spinnerr visible={isLoading} />
      <Text style={styles.welcome}>Welcome {userInfo ? userInfo.email : ""}</Text>
      <Text style={styles.selectText}>Select your Organization</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {userInfo?.token ? (
        ""
      ) : (
        <Link href="/auth/login" style={styles.link}>
          <Text>Please log in</Text>
        </Link>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  selectText: {
    color: "#ffff",
    marginVertical:15,
    fontSize: 32,
  },
  name:{
    color:"#ffff",
    fontWeight: "bold",
    fontSize:20
  },
  welcome: {
    marginTop:15,
    color: "#ffff",
    fontSize: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#1e1e1e", // Dark card background
    marginBottom: 16,
    borderRadius: 8,
  },
  org: {
    color: "blue",
    fontSize: 20,
  },
  link: {
    color: "blue",
  },
});

export default HomeScreen;
