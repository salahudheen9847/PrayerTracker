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
import Icon from "react-native-vector-icons/FontAwesome5";

type RootStackParamList = {
  Home: undefined;
  PrayerTracker: undefined;
  FastTracker: undefined;
  AssetReceivable: undefined;
  LiabilityPayable: undefined;
  Zakat: undefined;
  HajjTracker: undefined;
  UmrahTracker: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

// Gradient Button with Icon
const GradientButton = ({
  onPress,
  colors,
  title,
  icon,
}: {
  onPress: () => void;
  colors: string[];
  title: string;
  icon: string;
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
          <Icon name={icon} size={28} color="#fff" style={{ marginBottom: 6 }} />
          <Text style={styles.squareButtonText}>{title}</Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#3498db" // blue background for status bar
          translucent={false}
        />

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
            icon="mosque"
          />
          <GradientButton
            onPress={() => navigation.navigate("FastTracker")}
            colors={["#00b894", "#019267"]}
            title="Fast"
            icon="utensils"
          />
          <GradientButton
            onPress={() => navigation.navigate("AssetReceivable")}
            colors={["#fdcb6e", "#e17055"]}
            title="Assets"
            icon="coins"
          />
          <GradientButton
            onPress={() => navigation.navigate("LiabilityPayable")}
            colors={["#d63031", "#e84393"]}
            title="Liabilities"
            icon="balance-scale"
          />
          <GradientButton
            onPress={() => navigation.navigate("Zakat")}
            colors={["#0984e3", "#74b9ff"]}
            title="Zakat"
            icon="hand-holding-usd"
          />
          <GradientButton
            onPress={() => navigation.navigate("HajjTracker")}
            colors={["#f39c12", "#e67e22"]}
            title="Hajj"
            icon="kaaba"
          />
          <GradientButton
            onPress={() => navigation.navigate("UmrahTracker")}
            colors={["#8e44ad", "#9b59b6"]}
            title="Umrah"
            icon="kaaba"
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B0E0E6", // blue background
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
    width: 100,
    height: 100,
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
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
  },
});
