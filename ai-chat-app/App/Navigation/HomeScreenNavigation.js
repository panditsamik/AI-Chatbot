import React from "react";
import {
  createNativeStackNavigator,
  TransitionPresets,
} from "@react-navigation/native-stack";
import HomeScreen from "../Pages/HomeScreen";
import ChatScreen from "../Pages/ChatScreen";

const Stack = createNativeStackNavigator();
const isAndroid = true;

export default function HomeScreenNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
      }}
    >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen
        name="chat"
        component={ChatScreen}
        screenOptions={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
}
