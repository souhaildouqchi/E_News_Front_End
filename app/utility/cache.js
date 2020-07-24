import React from "react";
import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";

const prefix = "cache";
const expiryInMinutes = 5;
// we give this function an item and tells us if the item is expired or not
const isExpired = (item) => {
  const now = moment(Date.now());
  const storedTime = moment(item.timesstamp);
  return now.diff(storedTime, "minutes") > expiryInMinutes; // to see if an item is expired
};
const store = async (key, value) => {
  try {
    const item = {
      value, // gets passed from the outside
      timesstamp: Date.now(),
    };
    await AsyncStorage.setItem(prefix + key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};
// a query function
const get = async (key) => {
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    const item = JSON.parse(value);
    if (!item) return null;

    if (isExpired(item)) {
      // Command Query Seperation CSQ our function or method should either be commands or query not both
      // command function changes the state of the system
      // query function returns the state of the system
      await AsyncStorage.removeItem(prefix + key);
      return null;
    }
    return item.value;
  } catch (error) {
    console.error(error);
  }
};

export default {
  store,
  get,
};
