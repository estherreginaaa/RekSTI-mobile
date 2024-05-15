import { View, StyleSheet } from "react-native";
import NavigationBar from "./components/navigationbar";

export default function Account({ navigation }) {
  return (
    <View style={styles.container}>
      <NavigationBar page={"Account"} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
