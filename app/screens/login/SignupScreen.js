import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
//import NavLink from "../components/NavLink";
// will be called each time we're navigating to another screen
// Props are:
// onWillFocus, onDidFocus: to transition to
// onWillBlur, onDidBlur: when transitioning back
//import { NavigationEvents } from "@react-navigation/native"; // react v4
import AuthContext from "../../context/AuthContext";
import { FontAwesome } from "@expo/vector-icons";
import AuthForm from "../../components/AuthForm";

const SignupScreen = ({ navigation }) => {
  //const { state, signup, clearErrorMessage } = useContext(AuthContext);
  const { signUp } = React.useContext(AuthContext);
  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.image}
    >
      {/*   <NavigationEvents onWillBlur={clearErrorMessage} /> */}
      <AuthForm
        headerText="Create Your Account"
        subText="and discover the universe !"
        // errorMessage={state.errorMessage}
        AppOnSubmit={signUp}
        submitButtonText="Register"
        facebookText="Or register with"
      />
      {/*  <NavLink
        routeName="Signin"
        text="Already have an account? Sign in instead!"
   /> */}
      <View style={{ position: "absolute", top: 35, left: 15 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-circle-left" size={30} color="#B74A68" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

SignupScreen.navigationOptions = () => {
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

export default SignupScreen;
