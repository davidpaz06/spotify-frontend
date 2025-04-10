import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_ROUTES } from "../apiConfig";

interface AuthContextType {
  user: any;
  handleRegister: (form: { [key: string]: string }) => Promise<void>;
  handleLogin: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);

  const handleRegister = async (form: { [key: string]: string }) => {
    const { username, password } = form;
    try {
      const response = await axios.post(API_ROUTES.REGISTER, {
        username,
        password,
      });
      console.log("Register response:", response.data);
      setUser(response.data);
    } catch (error) {
      console.error("Auth context - Error during signup:", error);
      throw error;
    }
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await axios.post(API_ROUTES.LOGIN, {
        username,
        password,
      });
      console.log("Login response:", response.data);
      setUser(response.data);
      await AsyncStorage.setItem("user", JSON.stringify(response.data));
      await AsyncStorage.setItem("username", username);
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider
      value={{ user, handleRegister, handleLogin, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};
