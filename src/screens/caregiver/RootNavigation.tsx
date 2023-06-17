import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import LogoutScreen from "../auth/LogoutScreen";
import SettingsScreens from "./SettingsScreens";
import TabNavigation from "./TabNavigation";
import HomeScreens from "./HomeScreens";
import ElderlyScreens from "./ElderlyScreens";
import NotificationsScreens from "./NotificationsScreens";
import ReminderScreens from "./ReminderScreens";
import FriendRequestsScreens from "./FriendRequestScreens";

export type RootStackNavigationProps = {
  index: undefined;
  HomeScreens: {
    screen: string;
  };
  ElderlyScreens: {
    screen: string;
    id: string;
    fullName: string;
    friendshipId: string;
  };
  NotificationsScreens: {
    screen: string;
  };
  ReminderScreens: {
    screen: string;
  };
  FriendRequestsScreens: {
    screen: string;
  };
  SettingsScreens: {
    screen: string;
  };
  LogoutScreen: {
    screen: string;
  };
};

export type RootStackScreenProps =
  NativeStackNavigationProp<RootStackNavigationProps>;

const Stack = createNativeStackNavigator<RootStackNavigationProps>();

export default function RootNavigation() {
  return (
    <Stack.Navigator screenOptions={{ animation: "slide_from_right" }}>
      <Stack.Screen
        name="index"
        component={TabNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HomeScreens"
        component={HomeScreens}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ElderlyScreens"
        component={ElderlyScreens}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="NotificationsScreens"
        component={NotificationsScreens}
        options={{
          headerShown: false,
          animation: "slide_from_left",
        }}
      />

      <Stack.Screen
        name="ReminderScreens"
        component={ReminderScreens}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="FriendRequestsScreens"
        component={FriendRequestsScreens}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SettingsScreens"
        component={SettingsScreens}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="LogoutScreen"
        component={LogoutScreen}
        options={{
          presentation: "transparentModal",
          headerShown: false,
          animation: "none",
        }}
      />
    </Stack.Navigator>
  );
}
