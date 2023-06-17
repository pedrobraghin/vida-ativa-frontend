import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import SettingsScreen from "./SettingsScreen";

export type SettingNavigationProps = {
  index: undefined;
};

const Stack = createNativeStackNavigator<SettingNavigationProps>();

export type SettingsScreenProps =
  NativeStackScreenProps<SettingNavigationProps>;

export default function SettingsScreens() {
  return (
    <Stack.Navigator
      initialRouteName="index"
      screenOptions={{
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="index"
        component={SettingsScreen}
        options={{
          title: "Configurações",
        }}
      />
    </Stack.Navigator>
  );
}
