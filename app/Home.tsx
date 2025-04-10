import { StyleSheet, Text, Pressable } from "react-native";
import { useAuth } from "../context/AuthContext";
import { FC, useEffect, useState } from "react";
import data from "../assets/data.json";
import usePlayer from "../hooks/usePlayer";

import Background from "../components/Background";
import StatusBar from "../components/StatusBar";
import Header from "../components/Header";
import Filter from "../components/Filter";
import ItemList from "../components/ItemList";
import TrackView from "../components/TrackView";
import Title from "../components/Title";

interface HomeProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const Home: FC<HomeProps> = ({ setIsLoggedIn }) => {
  const { logout } = useAuth();
  const { isPlaying, play, pause, stop } = usePlayer();

  return (
    <Background>
      <StatusBar backgroundColor="#1A1A1A" />
      <Header title="Home" backgroundColor="#1A1A1A" />

      <Title text="Albums" />
      <ItemList data={data} viewType="one" />
      <Title text="Playlists" />
      <ItemList data={data} viewType="two" />
      <Title text="Recent" />
      <ItemList data={data} viewType="three" />

      <Pressable
        style={styles.button}
        onPress={() => {
          logout()
            .then(() => setIsLoggedIn(false))
            .catch((error) => console.error("Error logging out:", error));
        }}
      >
        <Text style={styles.buttonText}>Log Out</Text>
      </Pressable>

      {/* <TrackView /> */}
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#1A1A1A",
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
  button: {
    padding: 10,
    backgroundColor: "#1DB954",
    borderRadius: 5,
    alignSelf: "center",
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Home;
