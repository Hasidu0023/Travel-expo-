import React, { useEffect } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

const Welcome: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login"); // ✅ Navigate to Login after 4 seconds
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1b5e20" />
      <Text style={styles.text}>Welcome Screen</Text>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#1b5e20" },
  text: { color: "#fff", fontSize: 28, fontWeight: "bold" },
});
