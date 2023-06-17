import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PhysicalActivityScreen from "./PhysicalActivityScreen";

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
        component={PhysicalActivityScreen}
        options={{
          title: "Atividades Físicas",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
