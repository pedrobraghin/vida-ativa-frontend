import IoIcons from "@expo/vector-icons/Ionicons";

import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { RootStackScreenProps } from "../../screens/caregiver/RootNavigation";

interface NotificationsProps {
  count?: number;
}

export default function NotificationsIcon({ count = 0 }: NotificationsProps) {
  const navigation = useNavigation<RootStackScreenProps>();

  function handleShowNotifications() {
    navigation.navigate("NotificationsScreens", {
      screen: "NotificationsScreens",
    });
  }

  return (
    <TouchableOpacity
      onPress={handleShowNotifications}
      className="relative h-10 w-10 items-center justify-center rounded-full active:bg-zinc-300"
    >
      {count > 0 && (
        <View className="items-center justify-center bg-red-400 rounded-full absolute left-1/2 -top-1 w-5 h-5">
          <Text className="text-text-color text-center text-[10px]  min-w-full rounded-full">
            {count > 99 ? "99+" : count}
          </Text>
        </View>
      )}
      <View>
        <IoIcons name="md-notifications-outline" size={24} color={"white"} />
      </View>
    </TouchableOpacity>
  );
}
