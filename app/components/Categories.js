import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { category } from "../api/data";
import colors from "../config/colors";
function Categories({ onCategorySelect }) {
  const [categroy, updateCategory] = useState(onCategorySelect);

  const updateOnPress = (index) => {
    const categories = categroy.map((item) => {
      item.selected = false;
      return item;
    });
    categories[index].selected = true;
    updateCategory(categories);
  };
  return (
    <View style={styles.Categories}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={category}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => [onCategorySelect(item.category)]}>
              <Text
                style={item.selected ? styles.selectedText : styles.normalText}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  Categories: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    top: -30,
  },
  Text: {
    //color: colors.shade1,
    fontWeight: "bold",
    fontSize: 12,
    marginLeft: 15,
  },
  selectedText: {
    color: colors.shade1,
    fontWeight: "bold",
    fontSize: 12,
    marginLeft: 15,
    textDecorationLine: "underline",
  },
  normalText: {
    color: colors.shade1,
    fontWeight: "bold",
    fontSize: 12,
    marginLeft: 15,
  },
});
export default Categories;
