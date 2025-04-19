import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import ItemView from "./ItemView";
import { Pressable } from "react-native";

interface ItemListProps {
  data: {
    id: string;
    release_date: string;
    type: string;
    album: string;
    artist: string;
    imageUrl: string;
  }[];
  viewType: "one" | "two" | "three";
  limit?: number;
}

const ItemList: React.FC<ItemListProps> = ({ data, viewType, limit }) => {
  const limitedData = limit ? data.slice(0, limit) : data;

  return (
    <Pressable onPress={() => console.log("Pressed")}>
      <View
        style={[
          styles.container,
          styles[`container${capitalize(viewType)}` as keyof typeof styles],
        ]}
      >
        {limitedData.map((item, index) => (
          <ItemView key={index} data={item} viewType={viewType} />
        ))}
      </View>
    </Pressable>
  );
};

const capitalize = (str: string) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

const styles = StyleSheet.create({
  // Estilo general del contenedor
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  // Estilo para la vista "one"
  containerOne: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 25,
    paddingHorizontal: 35,
  },

  // Estilo para la vista "two"
  containerTwo: {
    rowGap: 15,
    flexDirection: "row",
    justifyContent: "space-around",

    flexWrap: "wrap",
  },

  // Estilo para la vista "three"
  containerThree: {
    rowGap: 15,
    flexDirection: "column",
  },
});

export default ItemList;
