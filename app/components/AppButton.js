import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../config/colors";
// used on the welcome screen
// color ="primary" to set default color so we dont have to specify it everytime
// to pick dinamicly acess properties (primary , secondary) we use colors[color]
function AppButton({ title, onPress, color = "primary", ...otherProps }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: colors[color] },
        { ...otherProps },
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    width: "80%",
    height: "15%",
    marginVertical: 10,
    //top: 0,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    //textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AppButton;
