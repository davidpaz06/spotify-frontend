import React, { useState } from "react";
import { useFonts } from "expo-font";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

interface FilterProps {
  options: string[]; // Array de opciones
  onSelect?: (option: string) => void; // Callback opcional para manejar la selección
}

const Filter: React.FC<FilterProps> = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const [fontsLoaded] = useFonts({
    FigtreeRegular: require("../assets/fonts/Figtree-Regular.ttf"),
    FigtreeBold: require("../assets/fonts/Figtree-Bold.ttf"),
    FigtreeLight: require("../assets/fonts/Figtree-Light.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={options}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.option,
              selectedOption === item && styles.selectedOption,
            ]}
            onPress={() => handleSelect(item)}
          >
            <Text
              style={[
                styles.optionText,
                selectedOption === item && styles.selectedOptionText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    height: 30,
  },
  option: {
    marginRight: 5,
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    backgroundColor: "#454545",
    borderRadius: 20,
  },
  optionText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "FigtreeLight",
  },
  selectedOption: {
    backgroundColor: "#FFF",
  },
  selectedOptionText: {
    color: "#1A1A1A",
    fontFamily: "FigtreeRegular",
  },
});

export default Filter;
