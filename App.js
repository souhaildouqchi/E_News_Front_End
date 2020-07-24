import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MainTabScreen from "./app/screens/MainTabScreen";
import AccountScreen from "./app/screens/AccountScreen";
import SearchScreen from "./app/screens/SearchScreen";
import SaveScreen from "./app/screens/SaveScreen";
import SigninScreen from "./app/screens/login/SigninScreen";
import SignupScreen from "./app/screens/login/SignupScreen";
import WelcomeScreen from "./app/screens/login/WelcomeScreen";
import { SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { Feather } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "./app/config/colors";
import { createStackNavigator } from "@react-navigation/stack";
import { authReducer } from "./app/context/AuthReducer";
import AuthContext from "./app/context/AuthContext";
import userAPI from "./app/api/user";
import OfflineNotice from "./app/components/OfflineNotice";
const AppTabs = createMaterialBottomTabNavigator();
const AuthStack = createStackNavigator();

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(authReducer, {
    isLoading: true,
    token: null,
    errorMessage: "",
  });
  React.useEffect(() => {
    const bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem("token");
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);
  const authContext = React.useMemo(
    () => ({
      // AUTOMATIC SIGNIN
      tryLocalSignin: async () => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          dispatch({ type: "SIGN_IN", payload: token });

          //navigate('TrackList');
        } else {
          //navigate('Signup');
        }
      },
      clearErrorMessage: async () => () => {
        dispatch({ type: "clear_error_message" });
      },
      signIn: async ({ email, password }) => {
        try {
          const response = await userAPI.post("/signin", { email, password });
          await AsyncStorage.setItem("token", response.data.token);
          // using signin since the logic is the same
          dispatch({ type: "SIGN_IN", token: response.data.token });
        } catch (err) {
          dispatch({
            type: "add_error",
            payload: "Something went wrong with sign in",
          });
        }
      },
      //signOut: () => dispatch({ type: "SIGN_OUT" }),
      signOut: async () => {
        // removing the token makes identification not work again
        await AsyncStorage.removeItem("token");
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async ({ email, password }) => {
        try {
          const response = await userAPI.post("/signup", { email, password });
          await AsyncStorage.setItem("token", response.data.token);
          dispatch({ type: "SIGN_IN", payload: response.data.token });

          // making use of the navigate component to access navigation
          // and redirect the user
        } catch (err) {
          dispatch({
            type: "add_error",
            payload: "Something went wrong with sign up",
          });
        }
      },
    }),
    []
  );
  return (
    <AuthContext.Provider value={authContext}>
      <OfflineNotice />
      <NavigationContainer>
        {state.token === null ? (
          <AuthStack.Navigator headerMode="none">
            {state.isLoading ? (
              <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
            ) : (
              <>
                <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
                <AuthStack.Screen name="SignIn" component={SigninScreen} />
                <AuthStack.Screen name="SignUp" component={SignupScreen} />
              </>
            )}
          </AuthStack.Navigator>
        ) : (
          <AppTabs.Navigator
            initialRouteName="MainTabScreen"
            activeColor={colors.shade1}
          >
            <AppTabs.Screen
              name="Home"
              component={MainTabScreen}
              options={{
                tabBarColor: "#292B34",

                tabBarIcon: ({ color }) => (
                  <SimpleLineIcons
                    name="home"
                    size={24}
                    color={colors.shade2}
                  />
                ),
              }}
            />

            <AppTabs.Screen
              name="SearchScreen"
              component={SearchScreen}
              options={{
                tabBarLabel: "Search",
                tabBarColor: "#292B34",
                tabBarIcon: ({ color }) => (
                  <Feather name="search" size={24} color={colors.shade2} />
                ),
              }}
            />
            <AppTabs.Screen
              name="SaveScreen"
              component={SaveScreen}
              options={{
                tabBarLabel: "Save",
                tabBarColor: "#292B34",
                tabBarIcon: ({ color }) => (
                  <Feather name="bookmark" size={24} color={colors.shade2} />
                ),
              }}
            />
            <AppTabs.Screen
              name="AccountScreen"
              component={AccountScreen}
              options={{
                tabBarLabel: "Account",
                tabBarColor: "#292B34",

                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="account-circle-outline"
                    size={24}
                    color={colors.shade2}
                  />
                ),
              }}
            />
          </AppTabs.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
