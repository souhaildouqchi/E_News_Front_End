import React from "react";
import { View, Text, StyleSheet, Dimensions, FlatList } from "react-native";
import colors from "../config/colors";
import TouchableScale from "react-native-touchable-scale";
import ActivityIndicator from "../components/ActivityIndicator";
import Card from "./Card";
import { Button } from "react-native-paper";
function ArticleListVer({ navigation, post, error, loading }) {
  return (
    <>
      <View style={styles.Container}>
        <Text style={styles.HeadText}>Popular</Text>
        <Text style={styles.subText}>Show all</Text>
      </View>
      {error && (
        <>
          <Text>Something went wrong couldn't retrieve the Articles.</Text>
        </>
      )}
      <ActivityIndicator animating={loading} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={post}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableScale
              activeScale={0.9}
              tension={50}
              friction={7}
              useNativeDriver
              onPress={() =>
                navigation.navigate("DetailScreen", { data: item })
              }
            >
              <Card item={item} />
            </TouchableScale>
          );
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  Container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  HeadText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.shade2,
  },
  subText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.shade2,
  },
});

export default ArticleListVer;
