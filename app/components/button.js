import { View, TouchableOpacity, Text } from "react-native"

export default Button = ({ onPress, label="Sign In", color="#B1C381", textColor="#ffffff", iconRight="" }) => {
    return (
        <TouchableOpacity onPress={() => onPress()} style={{backgroundColor:color}} className="h-[45px] flex-row rounded-md px-5 items-center justify-center">
            <View>
                <Text style={{ color:textColor }} className="font-MontserratBold text-center">{label}</Text>
            </View>

            {
                iconRight !== "" &&
                <View className="ml-2">
                    {iconRight}
                </View>
            }
        </TouchableOpacity>
    )
}