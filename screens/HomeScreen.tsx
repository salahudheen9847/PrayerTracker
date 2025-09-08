// HomeScreen.tsx
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
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

// Gradient Button with press animation (text only)
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
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
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
      style={{ width: "100%", alignItems: "center" }}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <LinearGradient colors={colors} style={styles.button}>
          <Text style={styles.buttonText}>{title}</Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f6fa" />
      <Text style={styles.header}>Islamic Tracker</Text>

      <View style={styles.buttonContainer}>
        <GradientButton
          onPress={() => navigation.navigate("PrayerTracker")}
          colors={["#6c5ce7", "#341f97"]}
          title="Prayer Tracker"
        />

        <GradientButton
          onPress={() => navigation.navigate("FastTracker")}
          colors={["#00b894", "#019267"]}
          title="Fast Tracker"
        />

        {/* New Asset/Receivable Button */}
        <GradientButton
          onPress={() => navigation.navigate("AssetReceivable")}
          colors={["#fdcb6e", "#e17055"]}
          title="Asset / Receivable"
        />

        {/* New Liability/Payable Button */}
        <GradientButton
          onPress={() => navigation.navigate("LiabilityPayable")}
          colors={["#d63031", "#e84393"]}
          title="Liability / Payable"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f6fa",
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#2d3436",
    marginBottom: 60,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    width: 280,
    height: 60,
    borderRadius: 50,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
});
