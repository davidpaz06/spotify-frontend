import { StyleSheet, Text, Pressable, ScrollView } from "react-native";
import { useAuth } from "../context/AuthContext";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import data from "../assets/data.json";
import usePlayer from "../hooks/usePlayer";

import Background from "../components/Background";
import StatusBar from "../components/StatusBar";
import Header from "../components/Header";
import ItemList from "../components/ItemList";
import TrackView from "../components/TrackView";
import LogoutButton from "../components/LogoutButton";
import Title from "../components/Title";

interface HomeProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const Home: FC<HomeProps> = ({ setIsLoggedIn }) => {
  const { logout, user } = useAuth();
  const { isPlaying, play, pause, stop } = usePlayer();
  const [spotifyData, setSpotifyData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/top/albums",
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        setSpotifyData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Background>
      <ScrollView>
        <Header title="Home" backgroundColor="#1A1A1A" />

        <Title text="Albums" />
        <ItemList data={data} viewType="one" limit={6} />
        <Title text="Playlists" />
        <ItemList data={data} viewType="two" />
        <Title text="Recent" />
        <ItemList data={data} viewType="three" limit={2} />

        <LogoutButton onLogout={() => setIsLoggedIn(false)} />

        {/* <TrackView /> */}
      </ScrollView>
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
