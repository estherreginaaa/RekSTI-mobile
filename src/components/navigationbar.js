import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-paper";
import { TouchableOpacity } from "react-native";

export default function NavigationBar({ page, navigation }) {
  function checkPage(pageName) {
    if (page == pageName) {
      return "#FF9900";
    } else return "black";
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("SetLimit")}
        style={styles.items}
      >
        <Icon
          source="tune-variant"
          color={checkPage("SetLimit")}
          size={25}
        ></Icon>
        <Text style={[styles.text, { color: checkPage("SetLimit") }]}>
          Set Limit
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Monitoring")}
        style={styles.items}
      >
        <Icon
          source="clipboard-text-clock"
          color={checkPage("Monitoring")}
          size={25}
        ></Icon>
        <Text style={[styles.text, { color: checkPage("Monitoring") }]}>
          Monitoring
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Account")}
        style={styles.items}
      >
        <Icon
          source="account-circle-outline"
          color={checkPage("Account")}
          size={25}
        ></Icon>
        <Text style={[styles.text, { color: checkPage("Account") }]}>
          Account
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF7D4",
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: "0.25",
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    margin: 0,
  },
  items: {
    alignItems: "center",
    padding: 5,
  },
  text: {
    fontWeight: "bold",
  },
});
