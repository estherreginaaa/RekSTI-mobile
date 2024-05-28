import {
  View,
  Text,
  ScrollView,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { Fragment, useEffect, useState } from "react";
import database from "@react-native-firebase/database";
import NavigationBar from "./components/navigationbar";

const SetLimit = ({ navigation }) => {
  const [listRooms, setListRooms] = useState([]);

  const listRoom = () => {
    const usersRef = database().ref("rooms");
    usersRef.on("value", (snapshot) => {
      const data = snapshot.val();
      const usersArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      setListRooms(usersArray);
    });
  };

  const changeTemp = (id, valueTemp) => {
    let listRoomsData = JSON.parse(JSON.stringify(listRooms));

    for (let i = 0; i < listRoomsData.length; i++) {
      if (listRoomsData[i].id === id) {
        listRoomsData[i].max_temp = valueTemp !== "" ? parseInt(valueTemp) : 0;
        break;
      }
    }

    setListRooms(listRoomsData);
  };

  const changeNoise = (id, valueNoise) => {
    let listRoomsData = JSON.parse(JSON.stringify(listRooms));

    for (let i = 0; i < listRoomsData.length; i++) {
      if (listRoomsData[i].id === id) {
        listRoomsData[i].max_noise =
          valueNoise !== "" ? parseInt(valueNoise) : 0;
        break;
      }
    }

    setListRooms(listRoomsData);
  };

  const onSaveChange = async (id, value) => {
    try {
      await database().ref(`rooms/${id}`).update(value);
      ToastAndroid.show("Update success !", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Update failed !", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    listRoom();
  }, []);

  return (
    <Fragment>
      <View className="flex-1 bg-white px-4 pt-10">
        <View>
          <View>
            <Text className="font-MontserratBold">
              Set Limit Kerendahan Temperatur dan kebisingan
            </Text>
          </View>
          <View className="mt-1">
            <Text className="font-MontserratMedium text-xs">
              Penghuni kamar akan di beri peringatan apabila suhu kamar sudah
              kurang dari atau tingkat kebisingan sudah lebih dari limit yang di
              tentukan.
            </Text>
          </View>
        </View>

        <View className="flex-1 mt-3">
          <ScrollView>
            {listRooms.length > 0 &&
              listRooms.map((e, i) => {
                return (
                  <View
                    className="border border-[#EEC759] p-2 rounded-xl my-2"
                    key={i}
                  >
                    <View>
                      <View>
                        <Text className="font-MontserratSemiBold text-lg">
                          {e.rooms_name}
                        </Text>
                      </View>
                      <View>
                        <Text className="font-MontserratMedium text-xs">
                          Name : {e.user.name}
                        </Text>
                      </View>
                      <View>
                        <Text className="font-MontserratMedium text-xs">
                          email : {e.user.email}
                        </Text>
                      </View>
                    </View>
                    <View className="flex-row w-full mt-2 pt-2 border-t border-t-[#EEC759]">
                      <View className="flex w-3/12 flex-row items-center">
                        <View className="flex-1">
                          <TextInput
                            textAlign="center"
                            inputMode="numeric"
                            value={`${e.max_temp}`}
                            className="border border-gray-200 rounded-md px-1 h-[45px] font-MontserratMedium"
                            onChangeText={(val) => changeTemp(e.id, val)}
                          />
                        </View>
                        <View>
                          <Text className="text-xl font-MontserratMedium px-2">
                            °C
                          </Text>
                        </View>
                      </View>
                      <View className="flex w-3/12 flex-row items-center">
                        <View className="flex-1">
                          <TextInput
                            textAlign="center"
                            inputMode="numeric"
                            value={`${e.max_noise}`}
                            className="border border-gray-200 rounded-md px-1 h-[45px] font-MontserratMedium"
                            onChangeText={(val) => changeNoise(e.id, val)}
                          />
                        </View>
                        <View>
                          <Text className="text-xl font-MontserratMedium px-2">
                            dB
                          </Text>
                        </View>
                      </View>
                      <View className="flex w-6/12 pl-2">
                        <TouchableOpacity
                          onPress={() => onSaveChange(e.id, e)}
                          className=" bg-[#B1C381] h-[45px] flex-row rounded-md px-5 items-center justify-center"
                        >
                          <View>
                            <Text className="font-MontserratBold text-center text-white">
                              Save
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              })}
          </ScrollView>
        </View>
      </View>
      <NavigationBar page="SetLimit" navigation={navigation} />
    </Fragment>
  );
};

export default SetLimit;
