import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import { Colors } from "../../../constants/Colors";

import HelpScreen from "./HelpScreen";
import ProfileScreen from "./ProfileScreen";
import SettingsMenuScreen from "./SettingsMenuScreen";
import SettingsScreen from "./SettingsScreen";
import DeleteAccountScreen from "./DeleteAccountScreen";

export type SettingsStackNavigationProps = {
  Index: undefined;
  ProfileMenu: {
    screen: string;
  };
  HelpMenu: {
    screen: string;
  };
  SettingsMenu: {
    screen: string;
  };
  DeleteAccount: {
    screen: string;
  };
};

export type SettingsMenuStackScreenProps =
  NativeStackNavigationProp<SettingsStackNavigationProps>;

const Stack = createNativeStackNavigator<SettingsStackNavigationProps>();

export default function () {
  return (
    <Stack.Navigator
      initialRouteName="Index"
      screenOptions={{
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="Index"
        component={SettingsMenuScreen}
        options={{ title: "Menu de configurações", headerShown: false }}
      />
      <Stack.Screen
        name="ProfileMenu"
        component={ProfileScreen}
        options={{
          title: "Perfil",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.White },
        }}
      />
      <Stack.Screen
        name="HelpMenu"
        component={HelpScreen}
        options={{
          title: "Ajuda",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.White },
        }}
      />
      <Stack.Screen
        name="SettingsMenu"
        component={SettingsScreen}
        options={{
          title: "Configurações",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.White },
        }}
      />
      <Stack.Screen
        name="DeleteAccount"
        component={DeleteAccountScreen}
        options={{
          title: "Apagar conta",
        }}
      />
    </Stack.Navigator>
  );
}
