import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "../config/colors";
import { SharedElement } from "react-native-shared-element";
import { Image } from "react-native-expo-image-cache";
function Card({ navigation, item }) {
  return (
    <View style={styles.Card}>
      <View style={{ marginRight: 30 }}>
        <SharedElement id={`item.${item.id}.photo`}>
          <Image uri={item.img} style={styles.Image} />
        </SharedElement>
      </View>
      <View style={{ width: "60%" }}>
        <View style={styles.backTag}>
          <Text style={styles.Tag}>{item.category}</Text>
        </View>

        <View style={styles.IconTitle}>
          <Text numberOfLines={2} style={styles.Title}>
            {item.title}
          </Text>
          <View style={styles.Icon}>
            <Feather name="plus" size={24} color="#565862" />
          </View>
        </View>
        {/*      <View style={styles.BottomInfo}>
          <View style={styles.ReadTime}>
            <Feather name="book-open" size={14} color="orange" />
            <Text
              style={{ marginHorizontal: 4, fontSize: 12, color: "orange" }}
            >
              {item.readtime}
            </Text>
          </View>
          <View style={styles.Likes}>
            <Feather name="thumbs-up" size={14} color="orange" />
            <Text
              style={{ marginHorizontal: 4, fontSize: 12, color: "orange" }}
            >
              {item.likes}
            </Text>
          </View>
        </View>   */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  Card: {
    borderRadius: 16,
    backgroundColor: colors.card,
    width: 330,
    height: 90,
    marginBottom: 10,
    overflow: "hidden",
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    left: 15,
  },
  Image: {
    width: 72,
    height: 72,
    borderRadius: 13,
  },
  Tag: {
    color: "#00C6BF",
    fontSize: 10,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  backTag: {
    backgroundColor: "#343641",
    alignItems: "center",
    height: "20%",
    width: "30%",
    borderRadius: 5,
    justifyContent: "center",
    left: -12,
  },
  Title: {
    color: "#E7EFFF",
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 21,
    marginBottom: 10,

    //padding: 5,
  },
  IconTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  Icon: {
    left: 10,
    bottom: 10,
  },

  /* BottomInfo: {
    flexDirection: "row",
    alignItems: "center",
    opacity: 0.4,
  }, */
  /* ReadTime: {
    flexDirection: "row",
    marginRight: 16,
    alignItems: "center",
  },*/
  /* Likes: {
    flexDirection: "row",
    marginRight: 16,
    alignItems: "center",
  }, */
});
export default Card;
