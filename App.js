import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeWindStyleSheet } from 'nativewind';
import { Icon } from "react-native-paper";
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
import AuthProvider from "./auth/AuthProvider";

const Stack = createNativeStackNavigator();
const Tab   = createBottomTabNavigator();

NativeWindStyleSheet.setOutput({
  default: "native",
});

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
        <AuthProvider>
          <Stack.Navigator
            initialRouteName="Landing"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="Home" component={TabNavigation}/>
          </Stack.Navigator>
        </AuthProvider>
      </NavigationContainer>
    );
  }
}

const TabNavigation = () => {
  return (
    <Tab.Navigator 
      initialRouteName="SetLimit"
      screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor : '#FF9900'
      }}
    >
      <Tab.Screen 
        name="SetLimit" 
        component={SetLimit} 
        options={{
          title : "Set Limit",
          tabBarIcon: ({ color }) => (
            <Icon source="tune-variant" color={color} size={20} ></Icon>
          ),
          tabBarStyle : {
            height : 65,
            paddingBottom: 15,
            paddingTop: 10
          }
        }}
      />
      <Tab.Screen 
        name="Monitoring" 
        component={Monitoring} 
        options={{
          title : "Monitoring",
          tabBarIcon: ({ color }) => (
            <Icon source="clipboard-text-clock" color={color} size={20} ></Icon>
          ),
          tabBarStyle : {
            height : 65,
            paddingBottom: 15,
            paddingTop: 10
          }
        }}
      />
      <Tab.Screen 
        name="Account" 
        component={Account} 
        options={{
          title : "Account",
          tabBarIcon: ({ color }) => (
            <Icon source="account-circle-outline" color={color} size={20} ></Icon>
          ),
          tabBarStyle : {
            height : 65,
            paddingBottom: 15,
            paddingTop: 10
          }
        }}
      />
    </Tab.Navigator>
  )
}
