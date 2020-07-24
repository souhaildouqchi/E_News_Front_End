import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import AuthContext from "../context/AuthContext";
import ImageInput from "../components/ImagePicker/ImageInput";
const AccountScreen = () => {
  // const { width, height } = Dimensions;
  const { signOut, email } = React.useContext(AuthContext);
  const [imageUri, setImageUri] = useState();
  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <View style={styles.IconText}>
          <View style={styles.IconBack}>
            <Octicons name="settings" size={36} color={colors.shade3} />
          </View>
          <View>
            <Text style={[styles.Text, { fontSize: 18, fontWeight: "bold" }]}>
              Account
            </Text>
            <Text style={[styles.Text, { color: colors.shade2, fontSize: 13 }]}>
              Edit and manage your account details
            </Text>
          </View>
        </View>
        <View style={styles.Info}>
          <View style={styles.IconText1}>
            {/*      <Image
            resizeMode="cover"
            source={require("../assets/ProfilePic.png")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 10,
              //borderBottomRightRadius: 100,
            }}
          />*/}
            <ImageInput
              imageUri={imageUri}
              onChangeImage={(uri) => setImageUri(uri)}
            />
            <View>
              <Text style={[styles.Text, { fontSize: 16, fontWeight: "bold" }]}>
                Souhail Douqchi
              </Text>
              <Text
                style={[styles.Text, { color: colors.shade2, fontSize: 13 }]}
              >
                Viewer Account
              </Text>
            </View>
          </View>
          <View style={styles.Email}>
            <Text style={[styles.Text, { color: colors.shade2 }]}>Email</Text>
            <Text style={[styles.Text, { fontWeight: "bold" }]}>
              souhaildq@gmail.com
            </Text>
          </View>
          <View style={styles.Line} />
          <View style={styles.Email}>
            <Text style={[styles.Text, { color: colors.shade2 }]}>
              User Name
            </Text>
            <Text style={[styles.Text, { fontWeight: "bold" }]}>Souhaildq</Text>
          </View>
        </View>
        <View style={styles.IconText2}>
          <View style={styles.IconBack}>
            <MaterialCommunityIcons
              name="email-open"
              size={36}
              color={colors.shade3}
            />
          </View>
          <View>
            <Text style={[styles.Text, { fontSize: 18, fontWeight: "bold" }]}>
              Help and Feedback
            </Text>
            <Text style={[styles.Text, { color: colors.shade2, fontSize: 13 }]}>
              Reach us with your feedback and questions
            </Text>
          </View>
        </View>
        <View style={styles.Info2}>
          <View style={styles.Help}>
            <Text
              style={{ color: "#C2C4D0", fontSize: 18, fontWeight: "bold" }}
            >
              Contact us
            </Text>
            <Ionicons
              name="ios-arrow-forward"
              size={24}
              color={colors.shade2}
            />
          </View>
          <View style={styles.Line} />
          <View style={styles.Help}>
            <Text
              style={{ color: "#C2C4D0", fontSize: 18, fontWeight: "bold" }}
            >
              Log out
            </Text>
            <TouchableOpacity onPress={() => signOut()}>
              <MaterialCommunityIcons
                name="logout"
                size={24}
                color={colors.shade2}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity>
          <View style={styles.Info3}>
            <View style={styles.PremuimPic}>
              <Image
                resizeMode="cover"
                source={{
                  uri:
                    "https://image.freepik.com/free-vector/news-paper-newspaper-reading-workplace-table-desk-daily-newsletter-press-read-top-view-cartoon-illustration_212005-182.jpg",
                }}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 10,
                  //borderBottomRightRadius: 100,
                }}
              />
              <View>
                <Text
                  style={[
                    styles.Text,
                    { fontSize: 18, fontWeight: "bold", color: colors.shade1 },
                  ]}
                >
                  Become Pro
                </Text>
                <Text
                  style={[styles.Text, { color: colors.shade3, fontSize: 13 }]}
                >
                  Get more News with pro
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Gradient: {
    width: "100%",
    height: "100%",
  },
  IconText: {
    flexDirection: "row",
    alignItems: "center",
    top: 50,
    left: 25,
  },
  IconText1: {
    flexDirection: "row",
    alignItems: "center",
    //top: "50%",
    //left: "5%",
  },
  IconText2: {
    flexDirection: "row",
    alignItems: "center",
    top: 45,
    left: 25,
  },
  Account: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  IconBack: {
    backgroundColor: colors.shade2,
    borderRadius: 5,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  Text: {
    left: 15,
    color: colors.shade1,
    margin: 2,
  },
  Info: {
    backgroundColor: colors.original,
    borderRadius: 15,
    width: "90%",
    justifyContent: "center",
    alignSelf: "center",
    padding: 10,
    margin: 20,
    top: 45,
  },
  Line: {
    borderBottomColor: colors.shade1,
    borderBottomWidth: 1,
    width: "85%",
    alignSelf: "center",
    padding: 10,
    opacity: 0.2,
  },
  Email: {
    marginTop: 15,
    justifyContent: "space-between",
    padding: 5,
  },
  Info2: {
    backgroundColor: colors.original,
    borderRadius: 15,
    width: "90%",
    justifyContent: "center",
    alignSelf: "center",
    padding: 10,
    margin: 20,
    top: 45,
  },
  Help: {
    marginTop: 15,
    justifyContent: "space-between",
    padding: 5,
    flexDirection: "row",
  },
  Info3: {
    backgroundColor: "#00C6BF",
    borderRadius: 15,
    width: "90%",
    height: 80,
    justifyContent: "center",
    alignSelf: "center",
    padding: 10,
    margin: 20,
    top: 20,
    opacity: 0.7,
  },
  PremuimPic: {
    flexDirection: "row",
    alignItems: "center",

    left: 5,
  },
});

export default () => {
  return (
    <LinearGradient
      colors={["#353540", "#353540", "#1E1E24"]}
      style={styles.Gradient}
    >
      <AccountScreen />
    </LinearGradient>
  );
};
