import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";

interface HeaderProps {
  style?: object;
  backgroundColor?: string;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ backgroundColor, title }) => {
  const [fontsLoaded] = useFonts({
    FigtreeBold: require("../assets/fonts/Figtree-Bold.ttf"),
  });
  const [avatar, setAvatar] = useState<string | null>(null);
  const navigation = useNavigation();

  if (!fontsLoaded) {
    return null;
  }

  const getAvatar = async () => {
    try {
      const storedAvatar = await AsyncStorage.getItem("avatar");
      if (storedAvatar) {
        setAvatar(storedAvatar);
      }
    } catch (error) {
      console.error("Error loading avatar from AsyncStorage:", error);
    }
  };

  useEffect(() => {
    getAvatar();
  }, []);

  return (
    <View
      style={[
        styles.headerContainer,
        backgroundColor ? { backgroundColor } : null,
      ]}
    >
      <Text style={styles.title}>{title || "Header"}</Text>
      <Pressable onPress={() => navigation.navigate("Profile")}>
        <Image
          source={{
            uri:
              avatar ||
              "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/account-white-icon.png",
          }}
          style={styles.image}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 90,
    paddingHorizontal: 20,
    backgroundColor: "#1A1A1A",
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
