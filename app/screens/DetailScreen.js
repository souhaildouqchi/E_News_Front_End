import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import { Feather } from "@expo/vector-icons";
import { SharedElement } from "react-native-shared-element";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../config/colors";
import { Image } from "react-native-expo-image-cache";
import { SaveItem, ReadItem } from "../components/DbHelper";
const DetailScreen = (props) => {
  const [saved, setSaved] = useState([]);
  const [items, setItems] = useState(props.route.params);

  const onSave = (item) => {
    let saved = [];

    ReadItem("saved")
      .then((res) => {
        if (res) {
          saved = JSON.parse(res);
        }

        const newItems = [...saved, item];
        const items = JSON.stringify(newItems);

        SaveItem("saved", items).then((res) => {
          console.log("saved", res);
        });
      })
      .catch((e) => console.warn(e));
  };

  const goToDetails = () => {
    setSaved([]);
    props.navigation.navigate("SaveScreen");
  };
  const { width, height } = Dimensions.get("window");
  const { data } = props.route.params; // this returns the data from each article

  //ReadItem("saved").then((res) => console.log(res));
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <SharedElement id={`item.${data.id}.photo`}>
            <Image
              resizeMode="cover"
              uri={data.img}
              style={{
                width: 400,
                height: 300,
                borderBottomLeftRadius: 50,
                //borderBottomRightRadius: 50,
              }}
            />
          </SharedElement>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              position: "absolute",
              bottom: 14,
              left: 10,
            }}
          >
            <SharedElement id={`item.${data.id}.profilePic`}>
              <Image
                resizeMode="cover"
                uri={data.image}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 10,
                  marginRight: 14,
                }}
              />
            </SharedElement>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <SharedElement id={`item.${data.id}.profilePic`}>
                <Image
                  resizeMode="cover"
                  uri={
                    "https://fertility.womenandinfants.org/app/uploads/photo-huff-post-logo.png"
                  }
                  style={styles.blogProfilePic}
                />
              </SharedElement>
              <View>
                <SharedElement id={`item.${data.id}.username`}>
                  <Text
                    style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                  >
                    {data.username}
                  </Text>
                </SharedElement>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <SharedElement id={`item.${data.id}.username`}>
                    {data.author != null ? (
                      <Text style={styles.blogUsername}>{data.author}</Text>
                    ) : (
                      <Text style={styles.blogUsername}>Anonymous author</Text>
                    )}
                  </SharedElement>

                  <SharedElement id={`item.${data.id}.readtime`}>
                    <View style={{ bottom: 5 }}>
                      <Entypo
                        name="time-slot"
                        size={20}
                        color={colors.shade2}
                        style={{ top: 82, right: 200 }}
                      />
                      <Text style={styles.readtime}>
                        {data.content.length / 10} Min
                      </Text>
                    </View>
                  </SharedElement>
                </View>
              </View>

              <View style={{ right: 30, top: 70, flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    onSave(data);
                  }}
                >
                  <MaterialCommunityIcons
                    name="bookmark"
                    size={30}
                    color={colors.shade2}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <SharedElement id={`item.${data.id}.readtime`}>
            <View style={styles.backTag}>
              {data.category != null ? (
                <Text
                  style={{
                    color: "#00C6BF",
                    fontSize: 14,
                    textTransform: "uppercase",
                  }}
                >
                  {data.category}
                </Text>
              ) : (
                <Text
                  style={{
                    color: "#00C6BF",
                    fontSize: 14,
                    textTransform: "uppercase",
                  }}
                >
                  World
                </Text>
              )}
            </View>
          </SharedElement>
        </View>
        <SharedElement
          id={`item.${data.id}.text`}
          style={{ width: width - 30, marginBottom: 14 }}
        >
          <Text
            style={{
              fontSize: 26,
              fontWeight: "bold",
              lineHeight: 32,
              color: "#FFFFFF",
              top: 70,
              left: 20,
            }}
          >
            {data.title}
          </Text>
        </SharedElement>
        <Text
          style={{
            fontSize: 16,
            lineHeight: 28,
            textAlign: "justify",
            opacity: 0.5,
            color: "#CDCFDE",
            top: 100,
            left: 20,
            width: 360,
          }}
        >
          {data.excerpt} {"\n"}
          {data.content}
        </Text>
        <View
          style={{
            marginVertical: 25,
            paddingBottom: 20,
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", padding: 12, alignItems: "center" }}
          >
            {/*      <Feather name="heart" size={16} color="orange" />
            <Text style={{ marginHorizontal: 10 }}>3.4k Likes</Text>*/}
          </TouchableOpacity>
        </View>
        <View style={{ position: "absolute", top: 40, left: 10 }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <FontAwesome name="arrow-circle-left" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2B2B34",
    alignItems: "center",
    justifyContent: "center",
  },
  blogProfilePic: {
    height: 50,
    width: 50,
    borderRadius: 10,
    //marginRight: 10,
    top: 65,
    right: 65,
  },
  blogUsername: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    top: 40,
    right: 90,
  },
  readtime: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.shade2,
    right: 160,
    top: 65,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  MultipleBook: {
    top: 192,
    left: 310,
  },
  backTag: {
    backgroundColor: "#343641",
    alignItems: "center",
    bottom: 50,
    left: 265,
    width: 120,
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
  },
});
export default DetailScreen;
