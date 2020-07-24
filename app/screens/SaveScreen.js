import React, { useState } from "react";
import { Text, StyleSheet, View, SafeAreaView } from "react-native";
import SaveSearchList from "../components/SaveSearchList";
import HotTopics from "../components/HotTopics";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";

function SaveScreen(props) {
  const [category, setCategory] = useState();
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
        <SaveSearchList navigation={props.navigation} />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
export default SaveScreen;
