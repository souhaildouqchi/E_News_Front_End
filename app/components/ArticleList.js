import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SharedElement } from "react-native-shared-element";
import TouchableScale from "react-native-touchable-scale";
import colors from "../config/colors";
import { Entypo } from "@expo/vector-icons";
import ActivityIndicator from "../components/ActivityIndicator";
import { Image } from "react-native-expo-image-cache";
function ArticleList({ navigation, data, error, loading }) {
  return (
    <View style={styles.Container}>
      {error && (
        <>
          <Text>Something Went Wrong couldn't retrieve the Articles.</Text>
        </>
      )}
      <ActivityIndicator visible={loading} />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingHorizontal: 15 }}
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <View>
              <View>
                <TouchableScale
                  activeScale={0.9}
                  tension={50}
                  friction={7}
                  useNativeDriver
                  onPress={() =>
                    navigation.navigate("DetailScreen", { data: item })
                  }
                >
                  {/* to show the horizental news list*/}
                  <SharedElement id={`item.${item.id}.photo`}>
                    <Image
                      blurRadius={0.3}
                      uri={item.img}
                      style={{
                        width: 250,
                        height: 240,
                        borderRadius: 16,
                        marginRight: 10,
                      }}
                    />
                  </SharedElement>
                  {/* to show the news titles inside the pictures*/}
                  <SharedElement
                    id={`item.${item.id}.text`}
                    style={{
                      width: 250,
                      position: "absolute",
                      bottom: 100,
                      left: 10,
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text numberOfLines={2} style={styles.blogTitle}>
                      {item.title}
                    </Text>
                  </SharedElement>
                  {/* to show the pictre of the author of the news article*/}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      position: "absolute",
                      bottom: 25,
                      left: 20,
                    }}
                  >
                    <View>
                      <SharedElement id={`item.${item.id}.profilePic`}>
                        <Image
                          resizeMode="cover"
                          uri={
                            "https://fertility.womenandinfants.org/app/uploads/photo-huff-post-logo.png"
                          }
                          style={styles.blogProfilePic}
                        />
                      </SharedElement>
                    </View>
                    <View>
                      <SharedElement id={`item.${item.id}.username`}>
                        {item.author != null ? (
                          <Text style={styles.blogUsername}>{item.author}</Text>
                        ) : (
                          <Text style={styles.blogUsername}>
                            Anonymous author
                          </Text>
                        )}
                      </SharedElement>
                      <SharedElement id={`item.${item.id}.readtime`}>
                        <View style={{ bottom: 5 }}>
                          <Entypo
                            name="time-slot"
                            size={20}
                            color={colors.shade2}
                            style={{ top: 20 }}
                          />
                          <Text style={styles.readtime}>
                            {item.content.length / 10}min
                          </Text>
                        </View>
                      </SharedElement>
                    </View>
                  </View>
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
    marginBottom: 20,
  },
  blogTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 20,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
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
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    top: 10,
  },
  readtime: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.shade2,
    left: 30,
    width: "60%",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default ArticleList;
