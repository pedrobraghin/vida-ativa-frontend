import IoIcons from "@expo/vector-icons/Ionicons";
import FA5Icons from "@expo/vector-icons/FontAwesome5";
import MCIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Colors } from "../../constants/Colors";
import { HomeScreen } from "./HomeScreens/HomeScreen";
import EmergencyScreen from "./EmergencyScreens/EmergencyScreen";
import CaregiversScreen from "./CaregiversScreens/CaregiversScreen";
import MedicationsScreen from "./MedicationsScreens/MedicationsScreen";
import ProfileScreen from "./SettingsScreens/ProfileScreen";
import { useUser } from "../../hooks/useUser";

type TabNavigationProps = {
  Home: undefined;
  Calendar: {
    screen: string;
  };
  Medications: {
    screen: string;
  };
  Caregivers: {
    screen: string;
  };
  Emergency: {
    screen: string;
  };
  Profile: {
    screen: string;
  };
};

export type TabScreenProps = NativeStackNavigationProp<TabNavigationProps>;

const Tab = createBottomTabNavigator<TabNavigationProps>();

export default function TabNavigation() {
  const { user } = useUser();
  const { img } = user;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: { height: 70 },
        tabBarLabelStyle: { color: Colors.Black_35, top: -5 },
        lazy: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Início",
          tabBarAccessibilityLabel: "Tela inicial",
          title: "Tela inicial",
          tabBarIcon: ({ color, focused }) => (
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
          ),
        }}
      />

      <Tab.Screen
        name="Medications"
        component={MedicationsScreen}
        options={{
          tabBarLabel: "Remédios e consultas",
          title: "Remédios e consultas",
          tabBarAccessibilityLabel: "Tela de remédios e consultas",
          tabBarIcon: ({ color, focused }) => (
            <MCIcons
              name="pill"
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
        name="Emergency"
        component={EmergencyScreen}
        options={{
          tabBarLabel: "Emergência",
          tabBarAccessibilityLabel: "Tela de remédios e consultas",
          title: "Emergência",
          tabBarIcon: ({ color, focused }) => (
            <FA5Icons
              name="ambulance"
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
        name="Caregivers"
        component={CaregiversScreen}
        options={{
          tabBarLabel: "Cuidadores",
          title: "Cuidadores",
          tabBarAccessibilityLabel: "Tela dos cuidadores",
          tabBarIcon: ({ color, focused }) => (
            <FA5Icons
              name="user-friends"
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
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Perfil",
          title: "Perfil",
          tabBarAccessibilityLabel: "Tela de perfil",

          tabBarIcon: ({ color, focused }) => (
            <Image
              source={{ uri: img.regular }}
              style={{
                width: 32,
                height: 32,
                borderRadius: 100,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
