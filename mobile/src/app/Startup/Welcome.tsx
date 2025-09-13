import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  Animated,
  Easing,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

const Welcome: React.FC<Props> = ({ navigation }) => {
  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Run animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 3500,
        easing: Easing.linear,
        useNativeDriver: false, // width interpolation requires layout
      }),
    ]).start();

    // Navigate after delay
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigation, fadeAnim, scaleAnim, slideAnim, progressAnim]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Background circles */}
      <View style={styles.background}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />
        <View style={styles.circle3} />
      </View>

      {/* Main content */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            {/* ✅ Fixed: use require() for image */}
            <Image
              source={require("../../../../mobile/assets/images/icon.png")}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
        </View>

        <Text style={styles.title}>TravelMate</Text>
        <Text style={styles.subtitle}>Your journey begins here</Text>

        {/* Loading bar */}
        <View style={styles.loadingContainer}>
          <Animated.View style={[styles.loadingBar, { width: progressWidth }]} />
        </View>
      </Animated.View>

      {/* Footer */}
      <Animated.Text style={[styles.footerText, { opacity: fadeAnim }]}>
        Discover the world with us
      </Animated.Text>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  circle1: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(74, 110, 246, 0.1)",
    top: -100,
    left: -50,
  },
  circle2: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(74, 110, 246, 0.07)",
    bottom: -50,
    right: -50,
  },
  circle3: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(74, 110, 246, 0.05)",
    top: "40%",
    left: "60%",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 80,
  },
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 24,
    // backgroundColor: "#4A6EF6",
    justifyContent: "center",
    alignItems: "center",
    // shadowColor: "#4A6EF6",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 5,
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  title: {
    color: "#1E293B",
    fontSize: 36,
    fontWeight: "800",
    marginBottom: 10,
    letterSpacing: 1,
  },
  subtitle: {
    color: "#64748B",
    fontSize: 18,
    marginBottom: 40,
    letterSpacing: 0.5,
  },
  loadingContainer: {
    width: 200,
    height: 4,
    backgroundColor: "#E2E8F0",
    borderRadius: 2,
    overflow: "hidden",
  },
  loadingBar: {
    height: "100%",
    backgroundColor: "#4A6EF6",
    borderRadius: 2,
  },
  footerText: {
    position: "absolute",
    bottom: 40,
    color: "#64748B",
    fontSize: 14,
  },
});
