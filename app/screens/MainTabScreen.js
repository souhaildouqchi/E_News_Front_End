import React from "react";
import {} from "react-native";
import MainScreen from "./MainScreen";
import DetailScreen from "./DetailScreen";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

const Stack = createSharedElementStackNavigator();

const MainTabScreen = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="MainScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={(navigation) => ({
          headerBackTitleVisible: false,
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
        })}
        sharedElements={(route) => {
          const { data } = route.params;
          return [
            {
              id: `item.${data.id}.photo`,
              animation: "move",
              resize: "clip",
              align: "center-top",
            },
            {
              id: `item.${data.id}.text`,
              animation: "fade",
              resize: "clip",
              align: "left-center",
            },
            {
              id: `item.${data.id}.profilePic`,
              animation: "move",
              resize: "clip",
              align: "left-center",
            },
            {
              id: `item.${data.id}.username`,
              animation: "fade",
              resize: "clip",
              align: "left-center",
            },
            {
              id: `item.${data.id}.readtime`,
              animation: "fade",
              resize: "clip",
              align: "left-center",
            },
          ];
        }}
      />
    </Stack.Navigator>
  );
};

export default MainTabScreen;
