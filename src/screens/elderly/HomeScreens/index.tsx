import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./HomeScreen";

type HomeStackScreenProps = {
  index: undefined;
};

const Stack = createNativeStackNavigator<HomeStackScreenProps>();

export default function () {
  return (
    <Stack.Navigator
      initialRouteName="index"
      screenOptions={{ presentation: "modal" }}
    >
      <Stack.Screen
        name="index"
        component={HomeScreen}
        options={{
          title: "Página inicial",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
