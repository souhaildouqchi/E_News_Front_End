import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import { SharedElement } from "react-native-shared-element";
import TouchableScale from "react-native-touchable-scale";
import { category } from "../api/data";

import colors from "../config/colors";

function HotTopics({ onCategorySelect, ImageHeight, ImageWidth, ImageRadius }) {
  //const { width, height } = Dimensions.get("window");
  return (
    <View style={styles.Container}>
      <View>
        <Text style={styles.CategoryText}>Hot Topics</Text>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingHorizontal: 15 }}
        data={category}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View>
              <View>
                <TouchableScale
                  activeScale={0.9}
                  tension={50}
                  friction={7}
                  useNativeDriver
                  onPress={() => onCategorySelect(item.category)}
                >
                  {/* to show the horizental news list*/}

                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: ImageWidth,
                      height: ImageHeight,
                      borderRadius: ImageRadius,
                      marginRight: 10,
                      borderColor: colors.shade2,
                      borderWidth: 2,
                    }}
                  />

                  {/* to show the news titles inside the pictures*/}
                  <SharedElement
                    id={`item.${item.id}.text`}
                    style={{
                      width: 100,
                      position: "absolute",
                      bottom: 95,
                      //left: 10,
                      paddingHorizontal: 5,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.blogTitle}>{item.title}</Text>
                  </SharedElement>
                  {/* to show the pictre of the author of the news article*/}

                  {/* to show the name of the author and read time of article*/}
                </TouchableScale>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    top: -20,
  },
  blogTitle: {
    color: colors.shade3,
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 20,
  },
  blogProfilePic: {
    height: 50,
    width: 50,
    borderRadius: 10,
    marginRight: 14,
  },
  blogUsername: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  readtime: {
    fontSize: 14,
    color: "white",
  },
  CategoryText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.shade2,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
});

export default HotTopics;
