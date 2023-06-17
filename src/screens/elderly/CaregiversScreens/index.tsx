import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import CaregiversScreen from "./CaregiversScreen";
import CaregiverScreen from "./CaregiverScreen";
import CaregiversInvitesScreen from "./CaregiversInvitesScreen";

type CaregiverStackNavigationProps = {
  index: undefined;
  CaregiversInvites: {
    screen: string;
  };
  Caregiver: {
    screen: string;
    id: string;
  };
};

export type CaregiverScreenProps =
  NativeStackNavigationProp<CaregiverStackNavigationProps>;

const Stack = createNativeStackNavigator<CaregiverStackNavigationProps>();

export default function () {
  return (
    <Stack.Navigator
      initialRouteName="index"
      screenOptions={{ presentation: "modal", animation: "slide_from_right" }}
    >
      <Stack.Screen
        name="index"
        component={CaregiversScreen}
        options={{
          title: "Cuidadores",
        }}
      />
      <Stack.Screen
        name="CaregiversInvites"
        component={CaregiversInvitesScreen}
        options={{ title: "Solicitações de cuidadores" }}
      />
      <Stack.Screen
        name="Caregiver"
        component={CaregiverScreen}
        options={{ title: "Cuidador" }}
      />
    </Stack.Navigator>
  );
}
