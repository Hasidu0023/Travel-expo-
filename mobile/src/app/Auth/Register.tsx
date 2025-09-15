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

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const handleRegister = async () => {
    setMessage("");
    setMessageType("");

    if (!name || !email || !password || !confirmPassword) {
      setMessage("Please fill in all fields");
      setMessageType("error");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
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
      const response = await axios.post(
        "http://192.168.8.176:5000/api/auth/register",
        { name, email, password }
      );

      setMessageType("success");
      setMessage(response.data.message || "User registered successfully!");

      setTimeout(() => {
        navigation.replace("Login");
      }, 1500);
    } catch (error: any) {
      if (error.response) {
        setMessage(error.response.data.detail || "Registration failed");
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
            { opacity: opacityAnim, transform: [{ translateY: formSlideAnim }] },
          ]}
        >
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Image source={LogoImg} style={styles.logoImage} resizeMode="contain" />
            </View>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to start your journey</Text>
          </View>

          <View style={styles.inputsContainer}>
            <InputField
              label="Full Name"
              value={name}
              onChange={setName}
              focusedInput={focusedInput}
              setFocusedInput={setFocusedInput}
              inputKey="name"
              placeholder="Enter your full name"
            />
            <InputField
              label="Email Address"
              value={email}
              onChange={setEmail}
              focusedInput={focusedInput}
              setFocusedInput={setFocusedInput}
              inputKey="email"
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <InputField
              label="Password"
              value={password}
              onChange={setPassword}
              focusedInput={focusedInput}
              setFocusedInput={setFocusedInput}
              inputKey="password"
              placeholder="Enter your password"
              secureTextEntry
            />
            <InputField
              label="Confirm Password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              focusedInput={focusedInput}
              setFocusedInput={setFocusedInput}
              inputKey="confirmPassword"
              placeholder="Confirm your password"
              secureTextEntry
            />

            {message !== "" && (
              <View
                style={[
                  styles.messageContainer,
                  messageType === "error" ? styles.errorContainer : styles.successContainer,
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
                onPress={handleRegister}
                disabled={loading}
                activeOpacity={0.9}
              >
                <Text style={styles.buttonText}>
                  {loading ? "Creating Account..." : "Sign Up"}
                </Text>
              </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={styles.linkContainer}
            >
              <Text style={styles.linkText}>
                Already have an account? <Text style={styles.linkHighlight}>Login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

type InputProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  focusedInput: string | null;
  setFocusedInput: (key: string | null) => void;
  inputKey: string;
  placeholder: string;
  keyboardType?: any;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  secureTextEntry?: boolean;
};

const InputField = ({
  label,
  value,
  onChange,
  focusedInput,
  setFocusedInput,
  inputKey,
  placeholder,
  keyboardType,
  autoCapitalize,
  secureTextEntry,
}: InputProps) => (
  <View style={[styles.inputWrapper, focusedInput === inputKey && styles.inputFocused]}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#94A3B8"
      value={value}
      onChangeText={onChange}
      onFocus={() => setFocusedInput(inputKey)}
      onBlur={() => setFocusedInput(null)}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      secureTextEntry={secureTextEntry}
    />
  </View>
);

// Styles remain the same as Login screen
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
