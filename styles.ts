import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    color: "#2c3e50",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 3,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  stat: { fontSize: 16, marginBottom: 4 },
  bad: { color: "red" },
  good: { color: "green" },
  neutral: { color: "gray" },
  buttons: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  btn: { padding: 10, borderRadius: 6, flex: 1, marginHorizontal: 4, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "bold" },
  historyText: { fontSize: 14, marginVertical: 2 },
});
