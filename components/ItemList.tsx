import React from "react";
import { View, StyleSheet } from "react-native";
import ItemView from "./ItemView";

interface ItemListProps {
  data: {
    track: string;
    url: string;
    artist: string;
  }[]; // Array de objetos
  viewType: "one" | "two" | "three"; // Tipo de vista
  limit?: number; // Límite de elementos a mostrar (opcional)
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

// Función para capitalizar la primera letra de un string
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
  },

  // Estilo para la vista "two"
  containerTwo: {
    rowGap: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },

  // Estilo para la vista "three"
  containerThree: {
    rowGap: 15,
    flexDirection: "column",
  },
});

export default ItemList;
