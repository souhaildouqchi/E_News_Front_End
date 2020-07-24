import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

import colors from "../config/colors";

function header({ headerTitle }) {
  var headerDate = new Date().toDateString();
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerDate}>{headerDate}</Text>
        <Text style={styles.headerTitle}>{headerTitle}</Text>
      </View>

      <View>
        <Image
          resizeMode="cover"
          /*source={{ uri: profile.profilePic }} */

          source={require("../assets/ProfilePic.png")}
          style={styles.headerImage}
        />
        <View style={styles.headerImageNotification}></View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    marginTop: 35,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 45,
  },
  headerDate: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.shade1,
    textTransform: "uppercase",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.shade2,
  },
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: colors.shade2,
  },
  headerImageNotification: {
    height: 14,
    width: 14,
    borderRadius: 6,
    position: "absolute",
    backgroundColor: "red",
    right: -2,
    top: -2,
    borderWidth: 2,
    borderColor: "white",
  },
});
export default header;
