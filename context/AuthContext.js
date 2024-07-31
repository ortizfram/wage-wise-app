import React, { createContext, useState } from "react";
import axios from "axios";
import { useRouter } from "expo-router";
import { RESP_URL } from "@/config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const register = async (email, password) => {
    console.log("Handling signup");
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${RESP_URL}/api/users/register`,
        { email, password },
        { withCredentials: true }
      );

      if (res.status === 201) {
        let userInfo = res.data;
        console.log(userInfo);
        router.push("/auth/login");
      } else {
        console.log("Unexpected status code:", res.status);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={register}>{children}</AuthContext.Provider>
  );
};
