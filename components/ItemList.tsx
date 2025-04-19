import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import ItemView from "./ItemView";

interface ItemListProps {
  data: {
    track: string;
    url: string;
    artist: string;
  }[];
  viewType: "one" | "two" | "three";
  limit?: number;
}

const ItemList: React.FC<ItemListProps> = ({ data, viewType, limit }) => {
  // Limitar los datos si se proporciona un límite
  const limitedData = limit ? data.slice(0, limit) : data;

  return (
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
  );
};

const capitalize = (str: string) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

const styles = StyleSheet.create({
  // Estilo general del contenedor
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "red",
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
