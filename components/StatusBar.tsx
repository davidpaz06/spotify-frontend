import React from "react";
import { View, StyleSheet, Platform } from "react-native";

interface HeaderProps {
  style?: object;
  backgroundColor?: string; // Nueva prop para el color de fondo
}

const Header: React.FC<HeaderProps> = ({ backgroundColor }) => {
  return (
    <View
      style={[
        styles.headerContainer,
        backgroundColor ? { backgroundColor } : null, // Aplica el color si se pasa como prop
      ]}
    ></View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    paddingTop: Platform.select({
      ios: 40,
      android: 36,
    }),
    paddingLeft: 20,
    backgroundColor: "#353535", // Color por defecto
    justifyContent: "center",
  },
});

export default Header;
