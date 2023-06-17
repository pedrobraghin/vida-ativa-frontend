import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import HomeScreen from "./HomeScreen";
import AddReminderScreen from "../ReminderScreens/AddReminderScreen";

import NotificationScreen from "../NotificationsScreens/NotificationScreen";

export type StackNavigationProps = {
  Index: undefined;
  AddReminder: {
    screen: string;
  };
  Notifications: {
    screen: string;
  };
};

export type HomeStackScreenProps =
  NativeStackNavigationProp<StackNavigationProps>;

const Stack = createNativeStackNavigator<StackNavigationProps>();

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
        component={HomeScreen}
        options={{
          title: "Início",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddReminder"
        component={AddReminderScreen}
        options={{
          title: "Seus lembretes",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          title: "Notificações",
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
