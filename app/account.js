import { View, Text } from "react-native"
import { Icon } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import Button from "./components/button"
import { useAuth } from "../auth/AuthProvider"

const Account = ({ navigation }) => {
  const { signOut, user } = useAuth()

  const logout = async () => {
    await signOut()
    navigation.navigate("Landing")
  }

  return (
    <SafeAreaView>
      <View className="flex-1 min-h-screen justify-center items-center bg-white">
        <View className="w-full items-center">
          <View className="my-2">
            <Icon source="account-circle" size={100} color="#EEC759"/>
          </View>
          <View>
            <Text className="font-MontserratSemiBold text-lg text-[#EEC759] text-center">{user.email}</Text>
          </View>
          <View className="items-center my-3">
            <Button
              label="Sign Out"
              onPress={() => logout()}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Account