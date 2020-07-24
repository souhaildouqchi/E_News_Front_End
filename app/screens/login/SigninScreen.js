import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import AuthContext from "../../context/AuthContext";
import { NavigationEvents } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import AuthForm from "../../components/AuthForm";
import { Button } from "react-native-paper";

const SigninScreen = ({ navigation }) => {
  const { signIn, clearErrorMessage } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <ImageBackground
        source={require("../../assets/background.png")}
        style={styles.image}
      >
        {/*  <NavigationEvents onWillBlur={clearErrorMessage} /> */}
        <AuthForm
          headerText="Welcome back!"
          subText="Log in with your email and discover the universe."
          errorMessage={signIn.errorMessage}
          AppOnSubmit={signIn}
          submitButtonText="Log in"
          facebookText="Or Log in with"
        />

        <View style={{ position: "absolute", top: 35, left: 15 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome name="arrow-circle-left" size={30} color="#B74A68" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //justifyContent: "center",
    //marginBottom: 150,
  },
  image: {
    position: "absolute",
    left: 0,
    top: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default SigninScreen;
