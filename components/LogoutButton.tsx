import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";

interface LogoutButtonProps {
  onLogout?: () => void; // Callback opcional para manejar el logout
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logged out successfully");
      if (onLogout) {
        onLogout();
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Pressable style={styles.button} onPress={handleLogout}>
      <Text style={styles.buttonText}>Log Out</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#1DB954", // Verde similar al estilo de Spotify
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LogoutButton;
