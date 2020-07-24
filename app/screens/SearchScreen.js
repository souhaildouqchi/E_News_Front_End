import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import SearchList from "../components/SearchList";
import HotTopics from "../components/HotTopics";
import { LinearGradient } from "expo-linear-gradient";
function SearchScreen(props) {
  const [category, setCategory] = useState();
  return (
    <>
      <LinearGradient
        colors={["#353540", "#353540", "#1E1E24"]}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={{ top: 50 }}>
          <HotTopics
            onCategorySelect={setCategory}
            ImageWidth={100}
            ImageHeight={100}
            ImageRadius={60}
          />
        </View>
        <SearchList navigation={props.navigation} />
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({});
export default SearchScreen;
