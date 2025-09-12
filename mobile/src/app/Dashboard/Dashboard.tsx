import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

const Dashboard: React.FC = () => {
  const features = [
    { title: "Trips", color: "#4caf50" },
    { title: "Bookings", color: "#2196f3" },
    { title: "Wallet", color: "#ff9800" },
    { title: "Profile", color: "#9c27b0" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>

      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {features.map((feature, index) => (
          <TouchableOpacity key={index} style={[styles.card, { backgroundColor: feature.color }]}>
            <Text style={styles.cardText}>{feature.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8f5e9",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1b5e20",
    marginBottom: 30,
    textAlign: "center",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    height: 120,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "700",
  },
});
