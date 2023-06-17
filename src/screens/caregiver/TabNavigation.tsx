import IoIcons from "@expo/vector-icons/Ionicons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Colors } from "../../constants/Colors";

import FriendRequestsScreen from "./FriendRequestScreens/FriendRequestsScreen";
import HomeScreen from "./HomeScreens/HomeScreen";
import SettingsTabScreen from "./SettingsScreens/SettingsMenuScreen";
import { useUserData } from "../../hooks/useUserData";

export type TabNavigationProps = {
  CaregiverHome: {
    name: string;
  };
  CaregiverInvitations: {
    name: string;
  };
  CaregiverSettings: {
    name: string;
  };
};

export type TabScreenProps = NativeStackNavigationProp<TabNavigationProps>;

const Tab = createBottomTabNavigator<TabNavigationProps>();

export default function TabNavigation() {
  const { friendRequests } = useUserData();
  return (
    <Tab.Navigator
      initialRouteName="CaregiverHome"
      id="TabNavigation"
      screenOptions={{
        tabBarStyle: { height: 70 },
        tabBarLabelStyle: { color: Colors.Black_35, top: -5 },
        lazy: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="CaregiverInvitations"
        component={FriendRequestsScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Solicitações",
          tabBarAccessibilityLabel: "Solicitações de amizade",
          tabBarBadge: friendRequests.length || undefined,
          tabBarIcon: ({ color, focused }) => (
            <IoIcons
              name="person-add-outline"
              color={focused ? "white" : color}
              style={{
                backgroundColor: focused ? Colors.MainColor : "transparent",
                borderRadius: 10,
                padding: 6,
              }}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CaregiverHome"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Início",
          tabBarAccessibilityLabel: "Tela inicial",
          tabBarIcon: (props) => {
            const { color, focused } = props;
            return (
              <IoIcons
                name="home-sharp"
                color={focused ? "white" : color}
                style={{
                  backgroundColor: focused ? Colors.MainColor : "transparent",
                  borderRadius: 10,
                  padding: 6,
                }}
                size={24}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="CaregiverSettings"
        component={SettingsTabScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Configurações",
          tabBarAccessibilityLabel: "Configurações",
          tabBarIcon: ({ color, focused }) => (
            <IoIcons
              name="settings-outline"
              color={focused ? "white" : color}
              style={{
                backgroundColor: focused ? Colors.MainColor : "transparent",
                borderRadius: 10,
                padding: 6,
              }}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
