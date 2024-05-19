import { Text, View, ScrollView, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { useAuth } from "../auth/AuthProvider";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Landing({ navigation }) {
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate("SetLimit");
    }
  }, [isLoggedIn]);

  return (
    <SafeAreaView>
      <View className="flex w-full justify-center items-center h-screen">
        <View className="w-full items-center">
          <Image
            source={require("../assets/images/5301126.png")}
            className="w-full"
          />
        </View>
        <View className="bg-[#FFFBE9] flex-1 w-full px-4 py-5">
          <View className="items-center">
            <Text className="text-[#9BB8CD] text-3xl font-MontserratExtraBold">
              Monitor Your dorm,
            </Text>
            <Text className="text-[#9BB8CD] text-3xl font-MontserratExtraBold">
              anytime,
            </Text>
            <Text className="text-[#9BB8CD] text-3xl font-MontserratExtraBold">
              anywhere !
            </Text>
          </View>
          <View className="px-5 items-center pb-3 pt-5">
            <Text className="text-center font-MontserratSemiBold text-[#F5DC95]">
              We helpyou monitor your dorm, just throught your phone
            </Text>
          </View>
          <View className="my-3 items-center">
            <TouchableOpacity
              onPress={() => navigation.navigate("SignIn")}
              className="bg-[#B1C381] h-[40px] w-[100px] rounded-md px-5 items-center justify-center"
            >
              <View>
                <Text className="text-white font-MontserratBold">Sign In</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
