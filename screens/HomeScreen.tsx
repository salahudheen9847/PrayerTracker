import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Animated,
  Pressable,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

type RootStackParamList = {
  Home: undefined;
  PrayerTracker: undefined;
  FastTracker: undefined;
  AssetReceivable: undefined;
  LiabilityPayable: undefined;
  Zakat: undefined;
  HajjTracker: undefined;
  UmrahTracker: undefined; // ✅ Add UmrahTracker
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

// Gradient Button (square style)
const GradientButton = ({
  onPress,
  colors,
  title,
}: {
  onPress: () => void;
  colors: string[];
  title: string;
}) => {
  const scale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{ margin: 12 }}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <LinearGradient colors={colors} style={styles.squareButton}>
          <Text style={styles.squareButtonText}>{title}</Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6c5ce7" />

      {/* Top Gradient Bar with Heading */}
      <LinearGradient colors={["#6c5ce7", "#341f97"]} style={styles.topBar}>
        <Text style={styles.header}>Islamic Tracker</Text>
      </LinearGradient>

      {/* Buttons */}
      <View style={styles.buttonGrid}>
        <GradientButton
          onPress={() => navigation.navigate("PrayerTracker")}
          colors={["#6c5ce7", "#341f97"]}
          title="Prayer"
        />
        <GradientButton
          onPress={() => navigation.navigate("FastTracker")}
          colors={["#00b894", "#019267"]}
          title="Fast"
        />
        <GradientButton
          onPress={() => navigation.navigate("AssetReceivable")}
          colors={["#fdcb6e", "#e17055"]}
          title="Assets"
        />
        <GradientButton
          onPress={() => navigation.navigate("LiabilityPayable")}
          colors={["#d63031", "#e84393"]}
          title="Liabilities"
        />
        <GradientButton
          onPress={() => navigation.navigate("Zakat")}
          colors={["#0984e3", "#74b9ff"]}
          title="Zakat"
        />
        <GradientButton
          onPress={() => navigation.navigate("HajjTracker")}
          colors={["#f39c12", "#e67e22"]}
          title="Hajj Tracker"
        />
        {/* ✅ Umrah Tracker Button */}
        <GradientButton
          onPress={() => navigation.navigate("UmrahTracker")}
          colors={["#8e44ad", "#9b59b6"]}
          title="Umrah Tracker"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    alignItems: "center",
  },
  topBar: {
    width: "100%",
    paddingVertical: 35,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    letterSpacing: 1,
  },
  buttonGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 40,
  },
  squareButton: {
    width: 110,
    height: 110,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  squareButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
});
