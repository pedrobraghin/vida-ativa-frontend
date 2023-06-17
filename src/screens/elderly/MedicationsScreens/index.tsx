import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import MedicationsScreen from "./MedicationsScreen";
import { AddAppointmentScreen } from "./AddAppointmentScreen";
import { Colors } from "../../../constants/Colors";
import { AddMedicationScreen } from "./AddMedicationScreen";
import MedicationScreen from "./MedicationScreen";
import AppointmentScreen from "./AppointmentScreen";

export type MedicationsStackNavigationProps = {
  index: undefined;
  AddMedication: {
    screen: string;
  };
  AddAppointment: {
    screen: string;
  };
  MedicationScreen: {
    screen: string;
  };
  AppointmentScreen: {
    screen: string;
  };
};

export type MedicationsScreenProps =
  NativeStackNavigationProp<MedicationsStackNavigationProps>;

const Stack = createNativeStackNavigator<MedicationsStackNavigationProps>();

export default function () {
  return (
    <Stack.Navigator
      initialRouteName="index"
      screenOptions={{
        presentation: "modal",
        headerTitleStyle: { color: Colors.MainColor },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="index"
        component={MedicationsScreen}
        options={{ title: "Remédios e consultas" }}
      />
      <Stack.Screen
        name="AddAppointment"
        component={AddAppointmentScreen}
        options={{ title: "Adicionar consulta" }}
      />
      <Stack.Screen
        name="AddMedication"
        component={AddMedicationScreen}
        options={{ title: "Adicionar remédio" }}
      />
      <Stack.Screen name="MedicationScreen" component={MedicationScreen} />
      <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} />
    </Stack.Navigator>
  );
}
