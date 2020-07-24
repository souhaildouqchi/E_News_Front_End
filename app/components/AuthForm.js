import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import colors from "../config/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import AppIcon from "./AppIcon";
import AppButton from "../components/AppButton";
import * as Yup from "yup";
import { Formik } from "formik";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Facebook from "expo-facebook";
//errorMessage
function AuthForm({
  headerText,
  errorMessage,
  AppOnSubmit,
  subText,
  submitButtonText,
  facebookText,
}) {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
  });
  const appId = "275670833768434";
  const appName = "News Space";
  Facebook.initializeAsync(appId, appName);
  const facebookLogIn = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync("275670833768434", {
        permissions: ["public_profile"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`
        )
          .then((response) => response.json())
          .then((data) => {
            setLoggedinStatus(true);
            setUserData(data);
          })
          .catch((e) => console.log(e));
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };
  return (
    // onsubmit // value
    <View style={styles.InputContainer}>
      <Text style={styles.Text1}>{headerText}</Text>
      <Text style={styles.Text2}>{subText}</Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => AppOnSubmit(values)}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
          <>
            <Input
              errorMessage={touched.email && errors.email}
              errorStyle={{ color: "red" }}
              inputStyle={{ color: "#C2C4D0" }}
              placeholder="Your email"
              onBlur={() => setFieldTouched("email")}
              onChangeText={handleChange("email")}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              textContentType="emailAddress"
              placeholderTextColor="#797586"
              leftIcon={<Icon name="email" size={20} color="#797586" />}
            />
            <Input
              errorMessage={touched.password && errors.password}
              onBlur={() => setFieldTouched("password")}
              errorStyle={{ color: "red" }}
              inputStyle={{ color: "#C2C4D0" }}
              secureTextEntry
              placeholder="Your password"
              placeholderTextColor="#797586"
              onChangeText={handleChange("password")}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="password"
              leftIcon={<Icon name="lock" size={20} color="#797586" />}
            />
            {errorMessage ? (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}
            <View style={styles.ButtonContainer}>
              <AppButton
                title={submitButtonText}
                onPress={handleSubmit}

                //handlesubmit calls onSubmit
              />
              <Text style={{ color: "#fff", padding: 10 }}>{facebookText}</Text>
              <TouchableOpacity onPress={facebookLogIn}>
                <AppIcon
                  name="facebook"
                  size={50}
                  backgroundColor="#B74A68"
                  iconColor="#221E4F"
                />
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}
const styles = StyleSheet.create({
  InputContainer: {
    padding: 10,
    top: "-3%",
    width: "100%",
    //left: "10%",
    justifyContent: "center",
    alignItems: "center",

    flex: 1,
  },
  Text1: {
    textAlign: "center",
    fontSize: 24,
    color: "#ffff",
    fontWeight: "bold",
  },
  Text2: {
    color: "#797586",
    textAlign: "center",
  },
  ButtonContainer: {
    width: "100%",
    alignItems: "center",

    height: "50%",
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
  },
});
export default AuthForm;
