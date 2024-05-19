import { View, Text, ScrollView, ToastAndroid } from "react-native"
import { Icon } from "react-native-paper"
import database from '@react-native-firebase/database';
import Button from "./components/button"
import ListMonitoring from "./components/listMonitoring"
import { Fragment, useEffect, useState } from "react";
import NavigationBar from "./components/navigationbar";

const Monitoring = ({ navigation }) => {
  const [listRooms, setListRooms] = useState([])

  const dataRooms = async () => {
    try {
      const usersRef = database().ref('rooms');
      usersRef.on('value', snapshot => {
  
        const data = snapshot.val();
        const usersArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        
        setListRooms(usersArray)
      })
      
    } catch (error) {
      ToastAndroid.show("Failed get list Rooms !", ToastAndroid.SHORT)
    }
  }

  useEffect(() => {
    dataRooms()
  }, [])

  return (
    <Fragment>
      <View className="px-4 pt-10 bg-white flex-1">
        <View className="mb-4 flex">
          <View>
            <Text className="font-MontserratSemiBold text-lg">Monitoring Kamar</Text>
          </View>
          <View>
            <Text className="font-MontserratMedium text-xs">
                Penghuni kamar yang melebihi ambang batas temperatur dan ambang kebisingan akan di tandai dengan warna yang berbeda
            </Text>
          </View>
          <View className="items-end">
            <Button
              label="Refresh"
              textColor="#000000"
              iconRight={<Icon source="history" color={"#000000"} size={20} />}
              onPress={dataRooms}
            />
          </View>
        </View>
        <View className="w-full flex flex-1">
          <ScrollView>
            {
              listRooms.length > 0 &&
              listRooms.map((e, i) => {
                return (
                  <ListMonitoring data={e} key={i}/>
                )
              })
            }
          </ScrollView>
        </View>
      </View>
      <NavigationBar page="Monitoring" navigation={navigation}/>
    </Fragment>
  )
}

export default Monitoring