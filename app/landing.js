import { Text, View, StyleSheet } from "react-native";
import { Icon } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Landing() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <Text>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.push("SetLimit")}>
        <Text>Set Limit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
