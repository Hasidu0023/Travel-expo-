import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Animated,
  Easing,
  Image,
} from "react-native";
import axios from "axios";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

const LogoImg = require("../../../assets/images/icon.png");

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function Login({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const scaleValue = useRef(new Animated.Value(1)).current;
  const formSlideAnim = useRef(new Animated.Value(30)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(formSlideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = async () => {
    setMessage("");
    setMessageType("");

    if (!email || !password) {
      setMessage("Please fill in all fields");
      setMessageType("error");
      return;
    }

    setLoading(true);

    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();

    try {
      // ✅ Correct backend endpoint
      const response = await axios.post(
        "http://192.168.8.176:5000/api/auth/login",
        { email, password }
      );

      setMessage(response.data.message || "Login successful!");
      setMessageType("success");

      setTimeout(() => {
        navigation.replace("Dashboard");
      }, 1500);
    } catch (error: any) {
      // Handle backend errors
      if (error.response) {
        setMessage(error.response.data.detail || "Invalid credentials");
      } else {
        setMessage(error.message || "Network error");
      }
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View
          style={[
            styles.formContainer,
            {
              opacity: opacityAnim,
              transform: [{ translateY: formSlideAnim }],
            },
          ]}
        >
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Image
                source={LogoImg}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.title}>Welcome To Trave</Text>
            <Text style={styles.subtitle}>Sign in to continue your journey</Text>
          </View>

          <View style={styles.inputsContainer}>
            <View
              style={[
                styles.inputWrapper,
                focusedInput === "email" && styles.inputFocused,
              ]}
            >
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#94A3B8"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                onFocus={() => setFocusedInput("email")}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            <View
              style={[
                styles.inputWrapper,
                focusedInput === "password" && styles.inputFocused,
              ]}
            >
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#94A3B8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                onFocus={() => setFocusedInput("password")}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            {message !== "" && (
              <View
                style={[
                  styles.messageContainer,
                  messageType === "error"
                    ? styles.errorContainer
                    : styles.successContainer,
                ]}
              >
                <Text style={styles.messageIcon}>
                  {messageType === "error" ? "⚠️" : "✅"}
                </Text>
                <Text style={styles.messageText}>{message}</Text>
              </View>
            )}

            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleLogin}
                disabled={loading}
                activeOpacity={0.9}
              >
                <Text style={styles.buttonText}>
                  {loading ? "Logging in..." : "Login"}
                </Text>
              </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              style={styles.linkContainer}
            >
              <Text style={styles.linkText}>
                Don't have an account?{" "}
                <Text style={styles.linkHighlight}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ✅ Styles remain the same
const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, backgroundColor: "#FFFFFF", justifyContent: "center" },
  formContainer: { paddingHorizontal: 25, paddingTop: 40, paddingBottom: 40, width: "100%" },
  logoContainer: { alignItems: "center", marginBottom: 40 },
  logo: { width: 150, height: 150, borderRadius: 30, justifyContent: "center", alignItems: "center", marginBottom: 20, elevation: 5 },
  logoImage: { width: 100, height: 100 },
  title: { fontSize: 28, fontWeight: "800", color: "#1E293B", marginBottom: 10, textAlign: "center" },
  subtitle: { fontSize: 16, color: "#64748B", textAlign: "center" },
  inputsContainer: { width: "100%" },
  inputWrapper: { width: "100%", backgroundColor: "#F8FAFC", borderRadius: 16, marginBottom: 20, padding: 5, paddingHorizontal: 15, paddingTop: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 1, borderWidth: 1, borderColor: "#E2E8F0" },
  inputFocused: { borderColor: "#4A6EF6", backgroundColor: "#FFFFFF", shadowColor: "#4A6EF6", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 2 },
  inputLabel: { fontSize: 12, color: "#64748B", marginBottom: 5, fontWeight: "600" },
  input: { padding: 0, paddingBottom: 10, fontSize: 16, color: "#1E293B", fontWeight: "500" },
  forgotPassword: { alignSelf: "flex-end", marginBottom: 25 },
  forgotPasswordText: { color: "#3A8DDE", fontSize: 14, fontWeight: "600" },
  messageContainer: { flexDirection: "row", alignItems: "center", padding: 15, borderRadius: 12, marginBottom: 20 },
  errorContainer: { backgroundColor: "#FEF2F2", borderLeftWidth: 4, borderLeftColor: "#EF4444" },
  successContainer: { backgroundColor: "#F0FDF4", borderLeftWidth: 4, borderLeftColor: "#22C55E" },
  messageIcon: { marginRight: 10, fontSize: 20 },
  messageText: { flex: 1, fontSize: 14, fontWeight: "500", color: "#1E293B" },
  button: { backgroundColor: "#3A8DDE", width: "100%", padding: 18, borderRadius: 16, alignItems: "center", marginBottom: 25, shadowColor: "#4A6EF6", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  buttonDisabled: { backgroundColor: "#93C5FD" },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700", letterSpacing: 0.5 },
  linkContainer: { alignItems: "center" },
  linkText: { fontSize: 15, color: "#64748B" },
  linkHighlight: { color: "#3A8DDE", fontWeight: "700" },
});
