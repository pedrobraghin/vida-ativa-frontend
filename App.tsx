import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import AppProviders from "./AppProviders";
import AppNavigation from "./AppNavigation";

StatusBar.setBarStyle("default");

export default function App() {
  return (
    <NavigationContainer>
      <AppProviders>
        <StatusBar backgroundColor="#000" />
        <AppNavigation />
      </AppProviders>
    </NavigationContainer>
  );
}
