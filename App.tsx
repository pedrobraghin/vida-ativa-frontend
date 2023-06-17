import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import AppProviders from "./AppProviders";
import AppNavigation from "./AppNavigation";
import { useEffect } from "react";
import notifee from "@notifee/react-native";

StatusBar.setBarStyle("default");

export default function App() {
  useEffect(() => {
    requestPermission();
  }, []);

  async function requestPermission() {
    await notifee.requestPermission();
  }
  return (
    <NavigationContainer>
      <AppProviders>
        <StatusBar backgroundColor="#000" />
        <AppNavigation />
      </AppProviders>
    </NavigationContainer>
  );
}
