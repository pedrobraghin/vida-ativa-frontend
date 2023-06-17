import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import AddReminderScreen from "./AddReminderScreen";

export type ReminderStackNavigationProps = {
  index: undefined;
};

export type ReminderScreenProps =
  NativeStackScreenProps<ReminderStackNavigationProps>;

const Stack = createNativeStackNavigator<ReminderStackNavigationProps>();

export default function ReminderScreens() {
  return (
    <Stack.Navigator initialRouteName="index">
      <Stack.Screen
        name="index"
        component={AddReminderScreen}
        options={{ title: "Lembretes" }}
      />
    </Stack.Navigator>
  );
}
