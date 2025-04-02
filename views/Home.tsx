import { FC, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

interface HomeProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  // setUserData: (userData: { [key: string]: string } | null) => void;
}

const Home: FC<HomeProps> = ({ setIsLoggedIn }) => {
  useEffect(() => {
    console.log(user);
  }, []);

  const { user, logout } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen!</Text>
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
              "http://192.168.0.195:3000/artist/Avenged%20Sevenfold",
              {
                headers: {
                  authorization: `Bearer ${user.accessToken}`,
                  spotifyauthorization: `Bearer ${user.spotifyAccessToken}`,
                  "Content-Type": "application/json",
                },
              }
            );
            console.log(response.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }}
      >
        <Text>Bruno Mars</Text>
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
