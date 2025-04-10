import React from "react";
import { useFonts } from "expo-font";
import { Text, StyleSheet } from "react-native";

interface TitleProps {
  text: string;
  style?: object;
}

const Title: React.FC<TitleProps> = ({ text, style }) => {
  const [fontsLoaded] = useFonts({
    FigtreeBold: require("../assets/fonts/Figtree-Bold.ttf"),
  });

  return <Text style={[styles.title, style]}>{text}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    marginHorizontal: 20,
    marginTop: 10,
    fontFamily: "FigtreeBold",
  },
});

export default Title;
