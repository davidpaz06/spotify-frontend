import { FC, useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

interface HomeProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

async function fetchData(user: any) {}

const Home: FC<HomeProps> = ({ setIsLoggedIn }) => {
  const { user, logout } = useAuth();
  const [username, setUsername] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const playPreview = async (previewUrl: string) => {
    try {
      // Detener cualquier sonido que esté reproduciéndose
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      // Cargar y reproducir el nuevo sonido
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: previewUrl },
        { shouldPlay: true }
      );
      setSound(newSound);
    } catch (error) {
      console.error("Error playing preview:", error);
    }
  };

  useEffect(() => {
    return () => {
      // Limpiar el sonido cuando el componente se desmonte
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        if (storedUsername) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.error("Error loading username from AsyncStorage:", error);
      }
    };

    fetchUsername();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Welcome, {username ? username : "Guest"}!
      </Text>
      <View style={styles.content}>
        <Text>This is where the main content will go.</Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => {
          logout()
            .then(() => {
              console.log("Logged out successfully");
              console.log(user);
              setIsLoggedIn(false);
            })
            .catch((error) => {
              console.error("Error logging out:", error);
            });
        }}
      >
        <Text style={styles.buttonText}>Log Out</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={async () => {
          try {
            const response = await axios.get<any>(
              "http://192.168.1.132:3000/artist/Yorghaki",
              {
                headers: {
                  authorization: `Bearer ${user.accessToken}`,
                  spotifyauthorization: `Bearer ${user.spotifyAccessToken}`,
                  "Content-Type": "application/json",
                },
              }
            );
            console.log(response.data.content);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }}
      >
        <Text style={styles.buttonText}>Yorghaki</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={async () => {
          try {
            const response = await axios.get<any>(
              "http://192.168.1.132:3000/track/Not%20Like%20Us",
              {
                headers: {
                  authorization: `Bearer ${user.accessToken}`,
                  spotifyauthorization: `Bearer ${user.spotifyAccessToken}`,
                  "Content-Type": "application/json",
                },
              }
            );
            console.log(response.data);
            const track = response.data[0];
            console.log(track);
            await playPreview(track.preview);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }}
      >
        <Text style={styles.buttonText}>Get song</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  content: {
    padding: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Home;
