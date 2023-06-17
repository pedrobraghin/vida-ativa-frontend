import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import NotificationScreen from "./NotificationScreen";

export type NotificationsStackNavigationProps = {
  index: undefined;
};

export type NotificationsScreenProps =
  NativeStackScreenProps<NotificationsStackNavigationProps>;

const Stack = createNativeStackNavigator();

export default function NotificationsScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="index"
        component={NotificationScreen}
        options={{ title: "Notificações" }}
      />
    </Stack.Navigator>
  );
}
