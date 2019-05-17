import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

const Loading = ({ opaticyState }) => {
  if (opaticyState) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={"red"} />
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100
  }
});

export default Loading;
