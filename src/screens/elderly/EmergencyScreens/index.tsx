import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import EmergencyScreen from "./EmergencyScreen";
import EmergencyContactScreen from "./EmergencyContactScreen";
import AddEmergencyContactScreen from "./AddEmergencyContactScreen";

export type EmergencyStackNavigationProps = {
  index: undefined;
  AddEmergencyContact: {
    screen: string;
  };
  EmergencyContact: {
    screen: string;
  };
};

export type EmergencyScreenProps =
  NativeStackNavigationProp<EmergencyStackNavigationProps>;

const Stack = createNativeStackNavigator<EmergencyStackNavigationProps>();

export default function () {
  return (
    <Stack.Navigator
      initialRouteName="index"
      screenOptions={{ presentation: "modal", animation: "slide_from_right" }}
    >
      <Stack.Screen
        name="index"
        component={EmergencyScreen}
        options={{
          title: "Emergência",
        }}
      />
      <Stack.Screen
        name="AddEmergencyContact"
        component={AddEmergencyContactScreen}
        options={{
          title: "Adicionar contato de emergência",
        }}
      />
      <Stack.Screen
        name="EmergencyContact"
        component={EmergencyContactScreen}
        options={{
          title: "Contato de emergência",
        }}
      />
    </Stack.Navigator>
  );
}
