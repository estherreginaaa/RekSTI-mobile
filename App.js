import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "./app/landing";
import SignIn from "./app/signin";
import SetLimit from "./app/setlimit";
import Monitoring from "./app/monitoring";
import Account from "./app/account";
import {
  useFonts,
  Montserrat_500Medium,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    MontserratMedium: Montserrat_500Medium,
    MontserratBold: Montserrat_700Bold,
    MontserratExtraBold: Montserrat_800ExtraBold,
    MontserratSemiBold: Montserrat_600SemiBold,
  });
  if (!fontsLoaded) {
    console.log("Loading fonts...");
    return null;
  } else {
    console.log("Fonts Loaded!");
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Landing"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SetLimit" component={SetLimit} />
          <Stack.Screen name="Monitoring" component={Monitoring} />
          <Stack.Screen name="Account" component={Account} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
