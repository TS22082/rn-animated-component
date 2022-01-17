import React, { useRef, useState, useEffect } from "react";

import {
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Dimensions,
} from "react-native";

const App = () => {
  // animValue will be used as the value for opacity. Initial Value: 0
  const animValue = useRef(new Animated.Value(0)).current;

  const [shown, setShown] = useState(false);

  const fadeIn = () => {
    setShown(true);
    Animated.timing(animValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const fadeOut = () => {
    // Will change animValue value to 0 in .5 seconds
    Animated.timing(animValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => setShown(false));
  };

  const toggle = () => {
    !shown && setShown(true);
    Animated.timing(animValue, {
      toValue: shown === true ? 0 : 1,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      shown && setShown(false);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
        {shown ? (
          <Animated.View
            style={[
              styles.fadingCard,
              styles.shadow,
              {
                opacity: animValue,
                width: animValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 300],
                }),
              },
            ]}
          >
            <Text style={styles.fadingText}>Effect onmount / dismount</Text>
          </Animated.View>
        ) : null}
      </View>
      <View style={styles.buttonRow}>
        <Pressable onPress={toggle}>
          <Animated.View
            style={[
              styles.btn,
              styles.shadow,
              {
                transform: [
                  {
                    scale: animValue.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [1, 2, 1],
                    }),
                  },
                  {
                    rotate: animValue.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: ["0deg", "180deg", "360deg"],
                    }),
                  },
                ],
              },
            ]}
          >
            <Animated.Text style={(styles.shadowText, { color: "#ede7f6" })}>
              Toggle: {!shown ? "Show" : "Hide"}
            </Animated.Text>
          </Animated.View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#616161",
  },

  cardContainer: {
    display: "flex",
    alignItems: "center",
    height: 300,
    width: "100%",
    marginTop: 100,
  },

  fadingCard: {
    padding: 20,
    height: 300,
    width: 300,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 15,
    borderColor: "#ede7f6",
    borderWidth: 1,
    overflow: "hidden",
  },

  fadingText: {
    textAlign: "center",
    width: 200,
    fontSize: 28,

    textShadowColor: "#673ab7",
    textShadowOffset: { width: -1, height: 2 },
    color: "#ede7f6",
    textShadowRadius: 2,
  },

  buttonRow: {
    position: "absolute",
    bottom: 300,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  btn: {
    width: 140,
    height: 50,
    fontFamily: "Verdana",
    borderRadius: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textShadowColor: "#673ab7",
    textShadowOffset: { width: -1, height: 2 },
    color: "#ede7f6",
    textShadowRadius: 2,
    borderColor: "#ede7f6",
    borderWidth: 1,
  },

  shadow: {
    shadowColor: "#673ab7",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default App;
