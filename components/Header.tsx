import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { useFonts } from "expo-font";

interface HeaderProps {
  style?: object;
  backgroundColor?: string;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ backgroundColor, title }) => {
  const user_img = require("../assets/images/icon.png");

  const [fontsLoaded] = useFonts({
    FigtreeBold: require("../assets/fonts/Figtree-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      style={[
        styles.headerContainer,
        backgroundColor ? { backgroundColor } : null,
      ]}
    >
      <Text style={styles.title}>{title || "Header"}</Text>
      <Image
        source={{
          uri: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/account-white-icon.png",
        }}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 90,
    paddingHorizontal: 20,
    backgroundColor: "#1A1A1A", // Color por defecto
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "FigtreeBold",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Header;
