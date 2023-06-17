import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import EventScreen from "./EventScreen";
import CalendarScreen from "./CalendarScreen";
import CreateEventScreen from "./CreateEventScreen";

import { Colors } from "../../../constants/Colors";

type CalendarStackNavigationProps = {
  index: undefined;
  CreateEvent: {
    screen: string;
  };
  Event: {
    screen: string;
  };
};

export type CalendarScreenProps =
  NativeStackNavigationProp<CalendarStackNavigationProps>;

const Stack = createNativeStackNavigator<CalendarStackNavigationProps>();

export default function () {
  return (
    <Stack.Navigator
      initialRouteName="index"
      screenOptions={{
        headerTitleStyle: {
          color: Colors.MainColor,
        },
        animation: "slide_from_right",
        presentation: "modal",
      }}
    >
      <Stack.Screen
        name="index"
        component={CalendarScreen}
        options={{
          title: "Agenda",
        }}
      />
      <Stack.Screen
        name="CreateEvent"
        component={CreateEventScreen}
        options={{
          title: "Criar evento",
        }}
      />
      <Stack.Screen
        name="Event"
        component={EventScreen}
        options={{
          title: "Evento",
        }}
      />
    </Stack.Navigator>
  );
}
