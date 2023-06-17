import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RegisterStepOne from "./RegisterStepOne";
import RegisterStepTwo from "./RegisterStepTwo";
import RegisterStepThree from "./RegisterStepThree";

export type RegisterNavigationProps = {
  RegisterStepOne: undefined;
  RegisterStepTwo: {
    screen: string;
  };
  RegisterStepThree: {
    screen: string;
  };
};

const Stack = createNativeStackNavigator<RegisterNavigationProps>();

export default function RegisterScreens() {
  return (
    <Stack.Navigator
      initialRouteName="RegisterStepOne"
      screenOptions={{
        headerTransparent: true,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="RegisterStepOne"
        component={RegisterStepOne}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="RegisterStepTwo"
        component={RegisterStepTwo}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="RegisterStepThree"
        component={RegisterStepThree}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
}
