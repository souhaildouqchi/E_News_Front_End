import Constants from "expo-constants";

const settings = {
  dev: {
    apiUrl: "http://192.168.1.5:5001",
  },
  staging: {
    apiUrl: "http://192.168.1.5:5001",
  },
  prod: {
    apiUrl: "http://192.168.1.5:5001",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
