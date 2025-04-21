import {
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const { user } = useAuth();
  const [username, setUsername] = useState<string>("Guest");
  const { isPlaying, play, pause, stop } = usePlayer();
  const [newReleases, setNewReleases] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchNewReleases = async () => {
    try {
      const response = await axios.get(
        "https://api.spotify.com/v1/browse/new-releases",
        {
          params: {
            limit: 6,
          },
          headers: {
            Authorization: `Bearer ${user.spotifyAccessToken}`,
          },
        }
      );

      const data = (
        response.data as { albums: { items: any[] } }
      ).albums.items.map((item) => ({
        id: item.id,
        release_date: item.release_date,
        type: item.type,
        artist: item.artists[0].name,
        album: item.name,
        imageUrl: item.images[0].url,
      }));

      setNewReleases(data);
      data.forEach((item) => {
        console.log(
          `
          New Releases data:
            id: ${item.id}
            Release Date: ${item.release_date}
            Type: ${item.type}
            Artist: ${item.artist}
            Album: ${item.album}
            Image: ${item.imageUrl}
            `
        );
      });
    } catch (error) {
      console.error("Error fetching New Releases:", error);
    } finally {
    }
  };

  const fetchData = async () => {
    try {
      await Promise.all([fetchNewReleases()]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    fetchData();
  };

  useEffect(() => {
    if (!user) {
      return;
    }

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
    fetchData();
  }, [user]);

  if (loading) {
    return (
      <Background>
        <ActivityIndicator size="large" color="#fff" style={styles.loader} />
      </Background>
    );
  }

  return (
    <Background>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            colors={["#fff"]}
            progressBackgroundColor="#1A1A1A"
          />
        }
      >
        <Header title="Home" backgroundColor="#1A1A1A" />
        <Text style={styles.greet}>Welcome, {username}</Text>
        <Title text="Albums" />
        <ItemList data={newReleases} viewType="one" limit={6} />
        <Title text="Playlists" />
        <ItemList data={newReleases} viewType="two" />
        <Title text="Recent" />
        <ItemList data={newReleases} viewType="three" limit={2} />
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#1A1A1A",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    marginTop: 50,
  },

  greet: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 20,
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
