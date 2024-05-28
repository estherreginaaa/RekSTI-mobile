import { useEffect, useState } from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import { Icon } from "react-native-paper";
import Button from "./components/button";
import { useAuth } from "../auth/AuthProvider";

export default function LoginAuth({ navigation }) {
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const { signIn, isLoggedIn } = useAuth();

  const validate = () => {
    let newErrors = {
      email: "",
      password: "",
    };

    if (!email) {
      newErrors.email = "Email is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSignIn = () => {
    setErrorEmail("");
    setErrorPass("");

    const findErrors = validate();

    if (Object.values(findErrors).some((value) => value !== "")) {
      setErrorEmail(findErrors.email);
      setErrorPass(findErrors.password);
    } else {
      signIn(email, password)
        .then(async (res) => {
          navigation.navigate("SetLimit");
        })
        .catch((error) => {
          if (error.code === "auth/invalid-credential") {
            setErrorEmail("Email or password invalid.");
            setErrorPass("Email or password invalid.");
          } else {
            setErrorEmail("Something went wrong.");
            setErrorPass("Something went wrong.");
          }
        });
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate("SetLimit");
    }
  }, [isLoggedIn]);

  return (
    <ScrollView className="bg-white h-screen w-full px-4">
      <View className="flex-1 h-screen justify-center items-center">
        <View className="items-center py-4">
          <Text className="font-MontserratExtraBold text-2xl text-[#9BB8CD] text-center">
            Sign In
          </Text>
        </View>

        <View className="w-full my-2">
          <View className="border border-[#F0CF70] rounded-lg flex flex-row items-center px-4">
            <View>
              <Icon source="email" color={"#9BB8CD"} size={20}></Icon>
            </View>
            <View className="flex-1">
              <TextInput
                className="bg-white border-none text-xs h-[45px] px-2"
                placeholder="Email"
                value={email}
                onChangeText={(e) => setEmail(e)}
              />
            </View>
          </View>

          {errorEmail !== "" && (
            <View>
              <Text className="text-red-500 font-MontserratMedium text-xs">
                {errorEmail}
              </Text>
            </View>
          )}
        </View>

        <View className="w-full my-2">
          <View className="border border-[#F0CF70] rounded-lg flex flex-row items-center px-4">
            <View>
              <Icon source="key" color={"#9BB8CD"} size={20}></Icon>
            </View>
            <View className="flex-1">
              <TextInput
                secureTextEntry={true}
                className="bg-white border-none text-xs h-[45px] px-2"
                placeholder="Password"
                value={password}
                onChangeText={(e) => setPassword(e)}
              />
            </View>
          </View>

          {errorPass !== "" && (
            <View>
              <Text className="text-red-500 font-MontserratMedium text-xs">
                {errorPass}
              </Text>
            </View>
          )}
        </View>

        <View className="items-center my-2">
          <Button onPress={handleSignIn} />
        </View>
      </View>
    </ScrollView>
  );
}
