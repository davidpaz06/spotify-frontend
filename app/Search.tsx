import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { FC, useEffect, useState } from "react";
import usePlayer from "../hooks/usePlayer";
import axios from "axios";

import Background from "../components/Background";
import StatusBar from "../components/StatusBar";
import Header from "../components/Header";
import ItemList from "../components/ItemList";
import Filter from "../components/Filter";
import Title from "../components/Title";
import LogoutButton from "../components/LogoutButton";
import TrackView from "../components/TrackView";

interface SearchProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const Search: FC<SearchProps> = ({ setIsLoggedIn }) => {
  const { user } = useAuth();
  const { isPlaying, play, pause, stop } = usePlayer();
  const [filter, setFilter] = useState<string>("Track");
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState<any[]>([]);

  const getData = async (query: string) => {
    try {
      const response = await axios.get("https://api.spotify.com/v1/search", {
        params: {
          q: query,
          type: filter.toLowerCase(),
        },
        headers: {
          Authorization: `Bearer ${user.spotifyAccessToken}`,
        },
      });
      const data = (response.data as any)[filter.toLowerCase() + "s"].items.map(
        (item: any) => {
          if (filter === "Track") {
            return {
              id: item.id,
              type: item.type,
              track: item.name,
              artist: item.artists[0].name,
              album: item.album.name,
              imageUrl: item.album.images[0].url,
            };
          } else if (filter === "Album") {
            return {
              id: item.id,
              type: item.type,
              release_date: item.release_date,
              artist: item.artists[0].name,
              album: item.name,
              imageUrl: item.images[0].url,
            };
          } else if (filter === "Artist") {
            return {
              id: item.id,
              type: item.type,
              artist: item.name,
              genres: item.genres.join(", "),
              imageUrl: item.images[0]?.url,
            };
          }
          return null;
        }
      );

      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getData(query);
    };
    if (query) {
      fetchData();
    }
  }, [filter]);

  return (
    <Background>
      <Header title="Search" backgroundColor="#1A1A1A" />
      <Filter options={["Track", "Album", "Artist"]} onSelect={setFilter} />
      <TextInput
        style={styles.input}
        placeholder="Search something"
        onSubmitEditing={async (e) => {
          console.log("Search query:", e.nativeEvent.text, filter);
          const searchQuery = e.nativeEvent.text;
          if (!searchQuery) {
            setData([]);
            return;
          }
          setQuery(searchQuery);
          await getData(searchQuery);

          data.map((item) => {
            console.log(
              `
              Search data:
                id: ${item.id}
                Type: ${item.type}
                Name: ${item.track || item.album}
                Artist: ${item.artist}
                Album: ${item.album}
                Image: ${item.imageUrl}
                `
            );
          });
        }}
      />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable style={styles.itemContainer}>
            <Image
              style={styles.itemImage}
              source={{
                uri: item.imageUrl || "https://via.placeholder.com/150",
              }}
            />
            <View style={styles.textContainer}>
              <Text style={styles.text}>{item[filter.toLowerCase()]}</Text>
              {item.type !== "artist" && (
                <Text style={styles.textSecondary}>{item.artist}</Text>
              )}
            </View>

            {item.type === "track" && (
              <Pressable onPress={() => console.log("Options pressed")}>
                <View style={styles.button}>
                  <Text style={{ color: "#ccc", fontSize: 20 }}>+</Text>
                </View>
              </Pressable>
            )}
          </Pressable>
        )}
      ></FlatList>

      {/* <TrackView /> */}
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#1A1A1A",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    fontSize: 16,
  },

  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  itemImage: {
    width: 65,
    height: 65,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
  textSecondary: {
    color: "#aaa",
    fontSize: 14,
  },

  button: {
    backgroundColor: "#aaa",
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Search;
