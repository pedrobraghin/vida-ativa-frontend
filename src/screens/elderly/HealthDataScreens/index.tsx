import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HealthDataScreen from "./HealthDataScreen";

type StackNavigationProps = {
  index: undefined;
};

const Stack = createNativeStackNavigator<StackNavigationProps>();

export default function () {
  return (
    <Stack.Navigator
      initialRouteName="index"
      screenOptions={{ presentation: "modal" }}
    >
      <Stack.Screen
        name="index"
        component={HealthDataScreen}
        options={{
          title: "Dados de saúde",
        }}
      />
    </Stack.Navigator>
  );
}
