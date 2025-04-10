import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

interface ItemViewProps {
  data: {
    track: string; // Nombre del track
    url: string; // URL de la imagen
    artist: string; // Nombre del artista
  };
  viewType?: "one" | "two" | "three"; // Tipos de vista (opcional)
}

const ItemView: React.FC<ItemViewProps> = ({ data, viewType = "one" }) => {
  const { track = "Unknown Track", url = "", artist = "Unknown Artist" } = data;

  const [fontsLoaded] = useFonts({
    FigtreeRegular: require("../assets/fonts/Figtree-Regular.ttf"),
    FigtreeMedium: require("../assets/fonts/Figtree-Medium.ttf"),
    FigtreeBold: require("../assets/fonts/Figtree-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  const containerStyle =
    styles[`container${capitalize(viewType)}` as keyof typeof styles] ||
    styles.containerOne;
  const imageStyle =
    styles[`image${capitalize(viewType)}` as keyof typeof styles] ||
    styles.imageOne;
  const trackStyle =
    styles[`track${capitalize(viewType)}` as keyof typeof styles] ||
    styles.trackOne;
  const artistStyle =
    styles[`artist${capitalize(viewType)}` as keyof typeof styles] ||
    styles.artistOne;

  return (
    <View style={containerStyle}>
      <Image
        source={{ uri: url || "https://via.placeholder.com/150" }}
        style={imageStyle}
      />
      {viewType === "three" ? (
        <View style={styles.wrapperThree}>
          <Text style={trackStyle} numberOfLines={1} ellipsizeMode="tail">
            {track}
          </Text>
          <Text style={artistStyle} numberOfLines={1} ellipsizeMode="tail">
            {artist}
          </Text>
        </View>
      ) : (
        <>
          <Text
            style={trackStyle}
            numberOfLines={viewType === "two" ? 2 : 1}
            ellipsizeMode="tail"
          >
            {track}
          </Text>
          <Text style={artistStyle} numberOfLines={1} ellipsizeMode="tail">
            {artist}
          </Text>
        </>
      )}
    </View>
  );
};

// Función para capitalizar la primera letra de un string
const capitalize = (str: string) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

const styles = StyleSheet.create({
  // ---------------- One ------------------
  containerOne: {
    width: 110,
    borderRadius: 5,
    overflow: "hidden",
  },
  imageOne: {
    width: "100%",
    height: 110,
  },
  trackOne: {
    fontFamily: "FigtreeMedium",
    color: "#FFF",
    fontSize: 14,
    marginTop: 5,
  },
  artistOne: {
    fontFamily: "FigtreeRegular",
    fontSize: 12,
    color: "#909090",
  },
  wrapperOne: {
    flexDirection: "column",
  },

  // ---------------- Two ------------------
  containerTwo: {
    flexDirection: "row",
    overflow: "hidden",
    width: 180,
    borderRadius: 5,
    backgroundColor: "#333333",
  },
  imageTwo: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  trackTwo: {
    paddingHorizontal: 10,
    width: 120,
    fontFamily: "FigtreeBold",
    color: "#FFF",
    fontSize: 14,
    alignSelf: "center",
  },
  artistTwo: {
    display: "none",
  },
  wrapperTwo: {},

  // ---------------- Three ------------------
  containerThree: {
    height: 50,
    flexDirection: "row",
    overflow: "hidden",
    width: "100%",
  },
  imageThree: {
    width: 50,
    height: 50,
  },
  wrapperThree: {
    flex: 1,
    alignSelf: "center",
    flexDirection: "column",
  },
  trackThree: {
    height: 25,
    paddingHorizontal: 10,
    fontFamily: "FigtreeMedium",
    color: "#FFF",
    fontSize: 16,
  },
  artistThree: {
    height: 25,
    paddingHorizontal: 10,
    fontFamily: "FigtreeRegular",
    color: "#909090",
    fontSize: 12,
  },
});

export default ItemView;
