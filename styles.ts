import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa", // subtle off-white
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
    color: "#2d3436", // dark gray
  },
  card: {
    backgroundColor: "#fff",
    padding: 18,
    marginVertical: 10,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    color: "#2d3436",
  },
  stat: {
    fontSize: 15,
    marginBottom: 4,
    color: "#636e72",
  },
  bad: { color: "#e17055" }, // red-orange for warning
  good: { color: "#00b894" }, // green for positive
  neutral: { color: "#636e72" }, // gray for neutral
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  btn: {
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  historyText: {
    fontSize: 14,
    marginVertical: 2,
    color: "#2d3436",
  },
});
