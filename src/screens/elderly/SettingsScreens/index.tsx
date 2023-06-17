import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import SettingsScreen from "./SettingsScreen";
import DeleteAccountScreen from "./DeleteAccountScreen";

export type SettingNavigationProps = {
  index: undefined;
  DeleteAccount: {
    screen: string;
  };
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
