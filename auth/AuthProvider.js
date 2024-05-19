import React, { useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import * as Notifications from 'expo-notifications';
import database from '@react-native-firebase/database';
import { registerForPushNotificationsAsync } from "../app/expoNotification"

const AuthContext = React.createContext();

export function useAuth() {
  return React.useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    console.log("onAuthStateChanged", user);
    setUser(user);
    if (!user) setIsLoggedIn(false);
    else setIsLoggedIn(true);

    if (initializing) setInitializing(false);
  }

  const shownotif = async () => {
    const usersRef = database().ref('rooms');
    usersRef.on('value', snapshot => {

      const data = snapshot.val();
      const usersArray = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
      
      for(let i=0; i<usersArray.length; i++) {
        if(usersArray[i].current_temp > usersArray[i].max_temp) {

          Notifications.scheduleNotificationAsync({
            content: {
              title: `${usersArray[i].rooms_name}`,
              body: `Temperature more than ${usersArray[i].max_temp} °C, current temprature is ${usersArray[i].current_temp} °C`,
            },
            trigger: { seconds: 3 },
          });

        }

        if(usersArray[i].current_noise > usersArray[i].max_noise) {

          Notifications.scheduleNotificationAsync({
            content: {
              title: `${usersArray[i].rooms_name}`,
              body: `Noise more than ${usersArray[i].max_noise} dB, current noise is ${usersArray[i].current_noise} dB`,
            },
            trigger: { seconds: 3 },
          });

        }

        if(usersArray[i].isDoorOpen) {
          Notifications.scheduleNotificationAsync({
            content: {
              title: `${usersArray[i].rooms_name}`,
              body: `Door is open`
            },
            trigger: { seconds: 3 },
          });
        }
      }
    })
  }

  useEffect(() => {
    registerForPushNotificationsAsync()
    shownotif()
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber; // unsubscribe on unmount
  }, []);

  const signIn = (email, password) => {
    // setIsLoggedIn(true);
    return auth().signInWithEmailAndPassword(email, password);
  };

  const signOut = () => {
    // setIsLoggedIn(false);
    return auth().signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
