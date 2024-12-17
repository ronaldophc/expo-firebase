import { StyleSheet } from "react-native";

const theme = {
  primaryColor: "#fdf0d5",
  defaultRadius: 4,
  textColor: "#fdf0d5"
};

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    backgroundColor: "#003049",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.textColor,
  },
  simpleText: {
    color: theme.textColor,
  },
  input: {
    height: 32,
    borderWidth: 1,
    padding: 4,
    borderColor: theme.primaryColor,
    borderRadius: theme.defaultRadius,
    color: theme.primaryColor,
    width: "100%",
    marginBottom: 12,
  },
  button: {
    height: 32,
    padding: 4,
    backgroundColor: "#669bbc",
    color: theme.textColor,
    borderRadius: theme.defaultRadius,
    width: "100%",
  },
  buttonText: {
    color: theme.textColor,
    textAlign: "center",
  },
});

export default globalStyles;
