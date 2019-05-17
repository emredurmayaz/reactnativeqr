import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import MadicatesScreen from "../screens/MadicatesScreen";
import QrScreen from "../screens/QrScreen";
import Record from "../screens/Record";

const LinksStack = createStackNavigator({
  MadicatesScreen: MadicatesScreen,
  Record: Record
});

LinksStack.navigationOptions = {
  tabBarLabel: "İlaçlar",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: QrScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Qr",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-camera" : "md-camera"}
    />
  )
};

export default createBottomTabNavigator({
  LinksStack,
  SettingsStack
});
