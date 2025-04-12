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
      <Image
        source={require("../assets/images/onboarding-logo.png")}
        style={styles.trackViewImg}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 3,
    position: "absolute",
    bottom: 10,
    width: "95%",
    height: 60,
    alignSelf: "center",
    backgroundColor: "#252525",
    borderRadius: 15,
    padding: 5,
  },
  temporal: {
    color: "#fff",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  trackViewImg: {
    width: 50,
    height: 50,
    borderRadius: 15,
  },
});

export default TrackView;
