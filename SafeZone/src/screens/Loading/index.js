import * as React from "react";
import { StyleSheet, View, Animated, Easing } from "react-native";
import { Image } from "expo-image";
import { Color } from "../../../GlobalStyles";
import { useEffect, useRef } from "react";

const Loading = ({ navigation }) => {
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startRotation = () => {
      rotateValue.setValue(0);
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start(() => startRotation());
    };

    startRotation();

    const timer = setTimeout(() => {
      navigation.replace("Start");
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [rotateValue, navigation]);

  const rotation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.frameChild} />
      <View style={styles.imageContainer}>
        <Animated.Image
          style={[styles.frameItem, { transform: [{ rotate: rotation }] }]}
          contentFit="cover"
          source={require("../../../assets/frame-567369794.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorMediumaquamarine,
    alignItems: "center",
    justifyContent: "center",
  },
  frameChild: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  frameItem: {
    width: 100,
    height: 100,
  },
});

export default Loading;
