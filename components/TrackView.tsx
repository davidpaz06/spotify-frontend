import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useFonts } from "expo-font";
import usePlayer from "../hooks/usePlayer";

interface TrackViewProps {}

const TrackView: React.FC<TrackViewProps> = ({}) => {
  const { isPlaying, play, pause } = usePlayer();

  const [fontsLoaded] = useFonts({
    FigtreeRegular: require("../assets/fonts/Figtree-Regular.ttf"),
    FigtreeMedium: require("../assets/fonts/Figtree-Medium.ttf"),
    FigtreeBold: require("../assets/fonts/Figtree-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Pressable style={styles.container} onPress={() => {}}>
      <Text style={styles.temporal}>Song</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignSelf: "center",
    bottom: 90,
    width: "100%",
    height: 60,
    padding: 0,
    marginHorizontal: 10,
    zIndex: 3,
    backgroundColor: "red",
    borderRadius: 5,
    alignItems: "center",
  },
  temporal: {
    color: "#fff",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});

export default TrackView;
