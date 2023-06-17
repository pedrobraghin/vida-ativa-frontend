import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import HomeScreens from "./HomeScreens";
import TabNavigation from "./TabNavigation";
import CalendarScreens from "./CalendarScreens";
import LogoutScreen from "../auth/LogoutScreen";
import SettingsScreens from "./SettingsScreens";
import EmergencyScreens from "./EmergencyScreens";
import CaregiversScreens from "./CaregiversScreens";
import HealthDataScreens from "./HealthDataScreens";
import MedicationsScreens from "./MedicationsScreens";
import PhysicalActivityScreens from "./PhysicalActivityScreens";
import { OutputContactDTO } from "../../@types/ContactType";
import { OutputUserEventsTypeDTO } from "../../@types/EventsTypes";
import { OutputMedicationDTO } from "../../@types/MedicationTypes";
import { OutputAppointmentDTO } from "../../@types/AppointmentTypes";

export type RootStackNavigationProps = {
  index: undefined;
  CalendarScreens: {
    screen: string;
    event?: OutputUserEventsTypeDTO;
    isEditing?: boolean;
  };
  CaregiversScreens: {
    screen: string;
    caregiverId?: string;
    friendshipId?: string;
    friendshipDate?: string;
  };
  EmergencyScreens: {
    screen: string;
    contact?: OutputContactDTO;
    isEditing?: boolean;
  };
  HealthDataScreens: {
    screen: string;
  };
  HomeScreens: {
    screen: string;
  };
  MedicationsScreens: {
    screen: string;
    medication?: OutputMedicationDTO;
    isEditing?: boolean;
    appointment?: OutputAppointmentDTO;
  };
  PhysicalActivityScreens: {
    screen: string;
  };
  SettingsScreens: {
    screen: string;
  };
  LogoutScreen: {
    screen: string;
  };
};

const RootStack = createNativeStackNavigator<RootStackNavigationProps>();
export type RootStackScreenProps =
  NativeStackNavigationProp<RootStackNavigationProps>;

export default function RootNavigation() {
  return (
    <RootStack.Navigator
      initialRouteName="index"
      screenOptions={{ animation: "slide_from_right" }}
    >
      <RootStack.Screen
        name="index"
        component={TabNavigation}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="CalendarScreens"
        component={CalendarScreens}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="CaregiversScreens"
        component={CaregiversScreens}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="EmergencyScreens"
        component={EmergencyScreens}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="HealthDataScreens"
        component={HealthDataScreens}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="HomeScreens"
        component={HomeScreens}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="MedicationsScreens"
        component={MedicationsScreens}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="PhysicalActivityScreens"
        component={PhysicalActivityScreens}
        options={{
          presentation: "modal",
          title: "Atividades físicas",
        }}
      />
      <RootStack.Screen
        name="SettingsScreens"
        component={SettingsScreens}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="LogoutScreen"
        component={LogoutScreen}
        options={{
          presentation: "transparentModal",
          headerShown: false,
          animation: "none",
        }}
      />
    </RootStack.Navigator>
  );
}
