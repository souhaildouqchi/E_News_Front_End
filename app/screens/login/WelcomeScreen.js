import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Modal,
  SafeAreaView,
} from "react-native";
import colors from "../../config/colors";
import AppButton from "../../components/AppButton";
import { Fontisto } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";
import { color } from "react-native-reanimated";
function WelcomeScreen({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <SafeAreaView
      style={styles.screen}
      forceInset={{ top: "always", bottom: "always" }}
    >
      <ImageBackground
        blurRadius={0}
        style={styles.background}
        source={require("../../assets/cosmo.png")}
      >
        <Text style={styles.tagline}>Welcome to {"\n"}News Space</Text>
        <Text style={styles.subtagline}>All The News in One App Only.</Text>

        <View style={styles.buttonsContainer}>
          <AppButton
            title="Login"
            onPress={() => navigation.navigate("SignIn")}
          />

          <AppButton
            title="Register"
            color="secondary"
            onPress={() => navigation.navigate("SignUp")}
          />
        </View>

        <TouchableOpacity onPress={() => setModalOpen(true)}>
          <Text style={styles.bottomText}>Terms and Conditions</Text>
        </TouchableOpacity>
        <Modal visible={modalOpen} animationType="slide">
          <ImageBackground
            blurRadius={0}
            style={styles.background}
            source={require("../../assets/Modal.png")}
          >
            <View style={styles.modalContent}>
              <Fontisto
                name="close-a"
                size={26}
                color={"#712f65"}
                style={{ ...styles.modalToggle, ...styles.modalClose }}
                onPress={() => setModalOpen(false)}
              />
              <View style={styles.ModalFullText}>
                <Text style={styles.header}>
                  Terms and Conditions Welcome to SpaceNews !
                </Text>
                <Text style={styles.ModalText1}>
                  These terms and conditions outline the rules and regulations
                  for the use of Space News's APP, By accessing this app we
                  assume you accept these terms and conditions. Do not continue
                  to use SpaceNews if you do not agree to take all of the terms
                  and conditions stated on this page.
                </Text>

                <Text style={styles.TextWarn}>
                  I UNDERSTAND THAT NEWS SPACE WILL
                </Text>
                <Text style={{ ...styles.TextWarn, ...styles.SubTextWarn }}>
                  NOT USE MY PERSONAL DATA IN ANY WAY.
                </Text>
                <Text style={styles.ModalHead}>License</Text>
                <Text style={styles.ModalText2}>
                  Unless otherwise stated, SpaceNews and/or its licensors own
                  the intellectual property rights for all material on
                  SpaceNews. All intellectual property rights are reserved.
                  {"\n"}
                  {"\n"}- You may access this from SpaceNews for your own
                  personal use subjected to restrictions set in these terms and
                  conditions.
                  {"\n"}
                  {"\n"}- You must not : Republish material from SpaceNews Sell,
                  rent, duplicate or copy material from SpaceNews Redistribute
                  content from SpaceNews This Agreement shall begin on the date
                  hereof.
                </Text>
              </View>
            </View>
          </ImageBackground>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
}
WelcomeScreen.navigationOptions = {
  headerShown: false,
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    //padding: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    top: 60,
  },

  tagline: {
    position: "absolute",
    top: 30,
    left: 10,
    fontSize: 33,
    paddingVertical: 5,
    color: "#FFB559",
    fontWeight: "bold",
  },
  bottomText: {
    color: "#797586",
    marginTop: 8,
    padding: 3,
    textAlign: "center",
  },
  subtagline: {
    position: "absolute",
    top: 120,
    left: 18,
    fontSize: 12,
    color: "#797586",
  },
  modalToggle: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    borderWidth: 1,
    borderColor: colors.shade2,
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
    //position: "absolute",
  },
  modalClose: {
    bottom: 120,
  },
  TextWarn: {
    textAlign: "center",
    fontSize: 14,
    color: colors.shade1,
    fontWeight: "bold",
  },
  ModalHead: {
    textAlign: "center",
    fontSize: 24,
    color: colors.shade1,
    fontWeight: "bold",
    bottom: 75,
  },
  ModalText1: {
    width: 350,
    left: 2,
    textAlign: "justify",
    fontSize: 16,
    color: "#A9ABB6",
    justifyContent: "center",
    alignSelf: "center",
    bottom: 45,
  },
  ModalText2: {
    width: 350,
    left: 2,
    textAlign: "justify",
    fontSize: 16,
    color: "#A9ABB6",
    justifyContent: "center",
    alignSelf: "center",
    bottom: 25,
  },
  header: {
    textAlign: "center",
    fontSize: 20,
    color: colors.shade1,
    fontWeight: "bold",
    bottom: 60,
  },
  ModalFullText: {
    bottom: 90,
  },
  SubTextWarn: {
    color: "#FAC641",
  },
});
export default WelcomeScreen;

// aboslute positioning to positine a component relative to its parent
