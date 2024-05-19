import { View, Text } from "react-native";
import { Icon } from "react-native-paper";
import Button from "./components/button.js";
import { useAuth } from "../auth/AuthProvider";
import NavigationBar from "./components/navigationbar.js";
import { Fragment } from "react";

const Account = ({ navigation }) => {
  const { signOut, user } = useAuth();

  const logout = async () => {
    await signOut();
    navigation.navigate("Landing");
  };

  return (
    <Fragment>
      <View className="flex-1 min-h-screen justify-center items-center bg-white">
        <View className="w-full items-center">
          <View className="my-2">
            <Icon source="account-circle" size={100} color="#EEC759" />
          </View>
          <View>
            <Text className="font-MontserratSemiBold text-lg text-[#EEC759] text-center">
              {user.email}
            </Text>
          </View>
          <View className="items-center my-3">
            <Button label="Sign Out" onPress={() => logout()} />
          </View>
        </View>
      </View>
      <NavigationBar page="Account" navigation={navigation}/>
    </Fragment>
  );
};

export default Account;
