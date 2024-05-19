import { View, Text } from "react-native"
import { Icon } from "react-native-paper"

export default ListMonitoring = ({ data }) => {
    return (
        <View className="border border-[#EEC759] rounded-xl flex w-full p-3 my-1">
            <View className="flex-row flex w-full">
                <View className="flex w-6/12">
                    <View>
                    <Text className="font-MontserratBold text-md text-black">
                        {data.rooms_name}
                    </Text>
                    </View>
                    <View className="mt-2">
                    <View className="my-1">
                        <Text className="font-MontserratMedium text-xs text-black">
                            Nama : {data.user.name}
                        </Text>
                    </View>
                    <View>
                        <Text className="font-MontserratMedium text-xs text-black">
                            Email : {data.user.email}
                        </Text>
                    </View>
                    </View>
                </View>

                {
                    <View className="flex w-6/12 flex-row items-center justify-end">
                        {
                            (data.current_temp > data.max_temp || data.current_noise > data.max_noise || data.isDoorOpen) &&
                            <View className="mx-2">
                                <Icon source="alert" color={"#9DB9CD"} size={25} />
                            </View>
                        }
                        
                        <View>
                            {
                                data.current_temp > data.max_temp &&
                                <View>
                                    <Text className="font-MontserratMedium text-xs text-black">Tempratur</Text>
                                </View>
                            }

                            {
                                data.current_noise > data.max_noise &&
                                <View>
                                    <Text className="font-MontserratMedium text-xs text-black">Kebisingan</Text>
                                </View>
                            }

                            {
                                data.isDoorOpen &&
                                <View>
                                    <Text className="font-MontserratMedium text-xs text-black">Pintu terbuka</Text>
                                </View>
                            }
                        </View>
                    </View>
                }
            </View>
            <View className="flex-row flex border-t border-t-[#EEC759] mt-3 pt-3">
                <View className="flex w-3/12 flex-row items-center justify-center">
                    <View className="mx-2">
                    <Icon source="thermometer-minus" color={"#EEC759"} size={20} />
                    </View>
                    <View>
                    <Text className="font-MontserratBold text-xs text-black">
                        {data.current_temp} C
                    </Text>
                    </View>
                </View>
                <View className="flex w-3/12 flex-row items-center justify-center">
                    <View className="mx-2">
                    <Icon source="surround-sound" color={"#EEC759"} size={20} />
                    </View>
                    <View>
                    <Text className="font-MontserratBold text-xs text-black">
                        {data.current_noise} dB
                    </Text>
                    </View>
                </View>
                <View className="flex w-6/12 flex-row items-center justify-center">
                    <View className="mx-2">
                    <Icon source="door-open" color={"#EEC759"} size={20} />
                    </View>
                    <View>
                    <Text className="font-MontserratBold text-xs text-black">
                        Pintu {data.isDoorOpen ? "Terbuka" : "Tertutup"}
                    </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}