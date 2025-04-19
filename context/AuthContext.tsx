import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_ROUTES } from "../apiConfig";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";

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
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (form: { [key: string]: string }) => {
    const { username, password } = form;
    try {
      const response = await axios.post(API_ROUTES.REGISTER, {
        username,
        password,
      });
      console.log("Register response:", response.data);
      setUser(response.data);
    } catch (error: any) {
      const message = error.response?.data?.message || "Unknown error";
      setErrorMessage(message);
      setErrorModalVisible(true);
      throw error;
    }
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await axios.post(API_ROUTES.LOGIN_DEV, {
        username,
        password,
      });

      console.log("Login response:", response.data);
      setUser(response.data);
      await AsyncStorage.setItem("user", JSON.stringify(response.data));
      await AsyncStorage.setItem("username", username);
    } catch (error: any) {
      const message = error.response?.data?.message || "Unknown error";
      setErrorMessage(message);
      setErrorModalVisible(true);
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
      <Modal
        visible={errorModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setErrorModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Error</Text>
            <Text style={styles.modalMessage}>{errorMessage}</Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => setErrorModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "75%",
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 35,
    textAlign: "center",
    color: "#fff",
  },
  modalButton: {
    backgroundColor: "transparent",
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
