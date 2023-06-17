import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import ElderlyStatusScreen from "./ElderlyStatusScreen";

export type ElderlyStackNavigationProps = {
  index: undefined;
  ElderlyStatus: {
    screen: string;
    id: string;
  };
};

export type ElderlyStackScreenProps =
  NativeStackScreenProps<ElderlyStackNavigationProps>;

const Stack = createNativeStackNavigator<ElderlyStackNavigationProps>();

export default function ElderlyScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="index" component={ElderlyStatusScreen} />
      <Stack.Screen name="ElderlyStatus" component={ElderlyStatusScreen} />
    </Stack.Navigator>
  );
}
