import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
// to use the image picker we need to give permission

function ImagePickerApp() {
  const [imageUri, setImageUri] = useState();
  const requestPermission = async () => {
    // same as requestCameraROll
    /* const result = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.LOCATION
    );
    result.granted; */
    const { granted } = await ImagePicker.requestCameraRollPermissionsAsync;
    if (!granted)
      alert("You need to enable permission to access to the library");
  };
  // the function passed to useEffect gets called only the first time
  // the componenet gets rendered ( returned)
  useEffect(() => {
    requestPermission();
  }, []);
  const selectImage = async () => {
    // to get the image library
    try {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) setImageUri(result.uri); // if the user didnt cancel
      // we update the state with the new image
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text>ImagePickerApp</Text>
      <Button title="Select Image" onPress={selectImage} />
      <Image source={{ uri: imageUri }} style={{ height: 200, width: 200 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default ImagePickerApp;
