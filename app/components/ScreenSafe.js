import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView } from "react-native";
function ScreenSafe(props) {
  return <SafeAreaView style={styles.screen}>{props.children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
  },
});
export default ScreenSafe;
