import { FC, useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { useAuth } from "../context/AuthContext";
import Background from "../components/Background";
import Header from "../components/Header";
import { API_ROUTES } from "../apiConfig";

interface ProfileProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const Profile: FC<ProfileProps> = ({ setIsLoggedIn }) => {
  const { user } = useAuth();
  const [username, setUsername] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);

  const pickAvatar = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission needed",
          "Permission to access media library is required!"
        );
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images", "videos"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (result.canceled) {
        return;
      }
      const selectedAsset = result.assets[0];
      if (selectedAsset?.uri) {
        setAvatar(selectedAsset.uri);
        await AsyncStorage.setItem("avatar", selectedAsset.uri);
      } else {
        console.error("No image URI found in selected asset");
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const getUsername = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    } catch (error) {
      console.error("Error loading username from AsyncStorage:", error);
    }
  };

  const getAvatar = async () => {
    try {
      const storedAvatar = await AsyncStorage.getItem("avatar");
      if (storedAvatar) {
        setAvatar(storedAvatar);
      }
    } catch (error) {
      console.error("Error loading avatar from AsyncStorage:", error);
    }
  };

  const handleLogout = async () => {
    setIsLoggedIn(false);
  };

  // Función que se ejecuta al confirmar la eliminación de usuario
  const confirmDelete = async () => {
    try {
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("username");
      await AsyncStorage.removeItem("avatar");

      const body = {
        username: username,
      };

      await axios.delete(API_ROUTES.DELETE_USER_DEV, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
        params: body,
      });

      setDeleteModalVisible(false);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error deleting user data:", error);
    }
  };

  // Muestra el modal de confirmación
  const handleDelete = () => {
    setDeleteModalVisible(true);
  };

  useEffect(() => {
    getUsername();
    getAvatar();
  }, []);

  return (
    <Background>
      <Header title="Profile" />
      <Image
        style={styles.profileImage}
        source={{ uri: avatar || "https://via.placeholder.com/200" }}
      />
      <TouchableOpacity style={styles.avatarButton} onPress={pickAvatar}>
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Change avatar
        </Text>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={{ fontSize: 24, color: "#fff", fontWeight: "bold" }}>
          Logged in as: {username}
        </Text>
      </View>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={{ fontSize: 18, color: "#fff" }}>Log Out</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
        <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>
          Delete user
        </Text>
      </TouchableOpacity>
      <Modal
        visible={deleteModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Deletion</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to delete your account? This action cannot
              be undone.
            </Text>
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                onPress={() => setDeleteModalVisible(false)}
              />
              <Button title="Delete" onPress={confirmDelete} color="crimson" />
            </View>
          </View>
        </View>
      </Modal>
    </Background>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#fff",
    alignSelf: "center",
  },
  avatarButton: {
    backgroundColor: "#1A1A1A",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 20,
    fontSize: 16,
    alignSelf: "center",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 20,
    paddingVertical: 20,
  },
  logoutButton: {
    backgroundColor: "#1A1A1A",
    borderRadius: 20,
    width: "40%",
    padding: 15,
    marginHorizontal: 20,
    alignSelf: "center",
    alignItems: "center",
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#fff",
  },
  deleteButton: {
    backgroundColor: "crimson",
    borderRadius: 20,
    width: "40%",
    padding: 15,
    marginHorizontal: 20,
    alignSelf: "center",
    alignItems: "center",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#1A1A1A",
    borderRadius: 10,
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
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default Profile;
