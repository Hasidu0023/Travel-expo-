import React, { useState } from "react";
/* eslint-disable jsx-a11y/accessible-emoji */
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  TextInput,
  Alert 
} from "react-native";

// NOTE: If you're using react-navigation, replace `any` with the
// proper navigation prop type from your navigator, e.g.:
// import { StackNavigationProp } from '@react-navigation/stack';
// type Props = { navigation: StackNavigationProp<RootStackParamList, 'Dashboard'> };
type NavProp = {
  replace: (routeName: string) => void;
  navigate?: (routeName: string, params?: Record<string, unknown>) => void;
};

type Props = {
  navigation: NavProp;
};

const Dashboard: React.FC<Props> = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  
  // User data
  const user = {
    name: "Anuja Mahagamage",
    points: 1240,
    level: "Explorer"
  };

  // Categories
  const categories = ["All", "Beaches", "Mountains", "Cities", "Historical"];
  
  // Quick actions
  const quickActions = [
    { 
      title: "Book Flight", 
      icon: "✈️", 
      color: "#4A6EF6",
      screen: "Flights"
    },
    { 
      title: "Find Hotels", 
      icon: "🏨", 
      color: "#FB6D6C",
      screen: "Hotels"
    },
    { 
      title: "My Trips", 
      icon: "🧳", 
      color: "#38B679",
      screen: "Trips"
    },
    { 
      title: "Travel Map", 
      icon: "🗺️", 
      screen: "Map"
    }
  ];

  // Upcoming trips
  const upcomingTrips = [
    {
      id: 1,
      destination: "Bali, Indonesia",
      date: "Jun 15 - Jun 22, 2023",
      image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
    },
    {
      id: 2,
      destination: "Paris, France",
      date: "Jul 10 - Jul 17, 2023",
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80"
    }
  ];

  // Recommended destinations
  const recommendations = [
    {
      id: 1,
      name: "Santorini",
      country: "Greece",
      price: "$820",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=868&q=80",
      rating: 4.8
    },
    {
      id: 2,
      name: "Kyoto",
      price: "$950",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      rating: 4.7
    },
    {
      id: 3,
      name: "Machu Picchu",
      country: "Peru",
      price: "$720",
      image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      rating: 4.9
    }
  ];

  // Popular destinations
  const popularDestinations = [
    {
      id: 1,
      name: "Maldives",
      country: "Maldives",
      image: "https://images.unsplash.com/photo-1590523541545-6b1a08d50943?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      rating: 4.9
    },
    {
      id: 2,
      name: "Swiss Alps",
      country: "Switzerland",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      rating: 4.8
    },
    {
      id: 3,
      name: "Tokyo",
      country: "Japan",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      rating: 4.7
    }
  ];

  // Logout function
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Logout", 
          onPress: () => navigation.replace("Login"),
          style: "destructive"
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header with user profile */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>{user.name}</Text>
        </View>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Where do you want to go?"
          placeholderTextColor="#94A3B8"
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text
            style={styles.searchIcon}
            accessibilityRole="image"
            accessibilityLabel="search icon"
          >
            🔍
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        {/* Rewards card */}
        <View style={styles.rewardsCard}>
          <View>
            <Text style={styles.rewardsTitle}>Travel Points</Text>
            <Text style={styles.rewardsPoints}>{user.points} pts</Text>
            <Text style={styles.rewardsLevel}>{user.level} Level</Text>
          </View>
          <View style={styles.rewardsIcon}>
            <Text
              style={{ fontSize: 32 }}
              accessibilityRole="image"
              accessibilityLabel="trophy"
            >
              🏆
            </Text>
          </View>
        </View>

        {/* Quick actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          {quickActions.map((action, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.actionButton, { backgroundColor: action.color }]}
            >
              <Text style={styles.actionIcon}>{action.icon}</Text>
              <Text style={styles.actionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((category, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.categoryButton, 
                activeCategory === category && styles.categoryButtonActive
              ]}
              onPress={() => setActiveCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                activeCategory === category && styles.categoryTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Upcoming trips */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Trips</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.tripsContainer}
        >
          {upcomingTrips.map(trip => (
            <TouchableOpacity key={trip.id} style={styles.tripCard}>
              <Image source={{ uri: trip.image }} style={styles.tripImage} />
              <View style={styles.tripOverlay}>
                <Text style={styles.tripDestination}>{trip.destination}</Text>
                <Text style={styles.tripDate}>{trip.date}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Recommended destinations */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.recommendationsContainer}
        >
          {recommendations.map(destination => (
            <TouchableOpacity key={destination.id} style={styles.destinationCard}>
              <Image source={{ uri: destination.image }} style={styles.destinationImage} />
              <View style={styles.destinationInfo}>
                <View>
                  <Text style={styles.destinationName}>{destination.name}</Text>
                  <Text style={styles.destinationCountry}>{destination.country}</Text>
                </View>
                <View style={styles.destinationMeta}>
                  <Text style={styles.destinationPrice}>{destination.price}</Text>
                  <View style={styles.ratingContainer}>
                    <Text
                      style={styles.ratingIcon}
                      accessibilityRole="image"
                      accessibilityLabel="star"
                    >
                      ⭐
                    </Text>
                    <Text style={styles.ratingText}>{destination.rating}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Popular destinations */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Destinations</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.popularContainer}>
          {popularDestinations.map(destination => (
            <TouchableOpacity key={destination.id} style={styles.popularCard}>
              <Image source={{ uri: destination.image }} style={styles.popularImage} />
              <View style={styles.popularInfo}>
                <View>
                  <Text style={styles.popularName}>{destination.name}</Text>
                  <Text style={styles.popularCountry}>{destination.country}</Text>
                </View>
                <View style={styles.ratingContainer}>
                  <Text
                    style={styles.ratingIcon}
                    accessibilityRole="image"
                    accessibilityLabel="star"
                  >
                    ⭐
                  </Text>
                  <Text style={styles.ratingText}>{destination.rating}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 16,
    color: "#64748B",
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E293B",
  },
  logoutButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#FEF2F2",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  logoutText: {
    color: "#DC2626",
    fontWeight: "600",
    fontSize: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    height: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchButton: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#4A6EF6",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
    shadowColor: "#4A6EF6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  searchIcon: {
    fontSize: 20,
  },
  rewardsCard: {
    backgroundColor: "#4A6EF6",
    borderRadius: 20,
    padding: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#4A6EF6",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 5,
  },
  rewardsTitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    marginBottom: 8,
  },
  rewardsPoints: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 4,
  },
  rewardsLevel: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
  },
  rewardsIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 8,
  },
  seeAllText: {
    color: "#4A6EF6",
    fontWeight: "600",
  },
  actionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  actionButton: {
    width: "48%",
    height: 100,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  actionIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  actionText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryButtonActive: {
    backgroundColor: "#4A6EF6",
  },
  categoryText: {
    color: "#64748B",
    fontWeight: "600",
  },
  categoryTextActive: {
    color: "#FFFFFF",
  },
  tripsContainer: {
    marginBottom: 24,
  },
  tripCard: {
    width: 280,
    height: 160,
    borderRadius: 16,
    marginRight: 16,
    overflow: "hidden",
    position: "relative",
  },
  tripImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  tripOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 16,
  },
  tripDestination: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  tripDate: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
  },
  recommendationsContainer: {
    marginBottom: 24,
  },
  destinationCard: {
    width: 200,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    marginRight: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  destinationImage: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
  },
  destinationInfo: {
    padding: 12,
  },
  destinationName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  destinationCountry: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 8,
  },
  destinationMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  destinationPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#4A6EF6",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
  },
  popularContainer: {
    marginBottom: 24,
  },
  popularCard: {
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  popularImage: {
    width: "100%",
    height: 160,
    resizeMode: "cover",
  },
  popularInfo: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  popularName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  popularCountry: {
    fontSize: 14,
    color: "#64748B",
  },
  bottomSpacing: {
    height: 30,
  },
});

export default Dashboard;