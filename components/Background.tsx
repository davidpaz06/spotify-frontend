import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

interface BackgroundProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[]; // Prop para estilos adicionales
}

const Background: React.FC<BackgroundProps> = ({ children, style }) => {
  return <View style={[styles.background, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    backgroundColor: "#1A1A1A",
    height: "100%",
    zIndex: 1,
  },
});

export default Background;
