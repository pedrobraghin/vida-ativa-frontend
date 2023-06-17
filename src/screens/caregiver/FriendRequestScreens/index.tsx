import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import FriendRequestsScreen from "./FriendRequestsScreen";

export type FriendRequestsStackNavigationProps = {
  index: undefined;
};

export type FriendRequestsScreenProps =
  NativeStackScreenProps<FriendRequestsStackNavigationProps>;

const Stack = createNativeStackNavigator<FriendRequestsStackNavigationProps>();

export default function FriendRequestsScreens() {
  return (
    <Stack.Navigator initialRouteName="index">
      <Stack.Screen name="index" component={FriendRequestsScreen} />
    </Stack.Navigator>
  );
}
