import AntIcons from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { NotificationType } from "../../@types/NotificationType";
import { RootStackScreenProps } from "../../screens/caregiver/RootNavigation";

interface NotificationProps {
  notification: NotificationType;
}

export default function Notification({ notification }: NotificationProps) {
  const navigation = useNavigation<RootStackScreenProps>();
  const hours = String(notification.dateTime.getHours()).padStart(2, "0");
  const minutes = String(notification.dateTime.getMinutes()).padStart(2, "0");
  const currentMinutes = new Date().getMinutes();
  const receivedNow = currentMinutes === notification.dateTime.getMinutes();
  const time = receivedNow ? "Agora" : `${hours}:${minutes}`;

  function handleOnPress() {
    navigation.navigate("NotificationsScreens", {
      screen: "NotificationScreens",
    });
  }

  return (
    <View className="border-c8 rounded-md mb-2 border-2">
      <TouchableOpacity
        className="shadow-sm shadow-black"
        onPress={handleOnPress}
      >
        <View className="relative items-center flex-row gap-x-2 py-4 px-4">
          <View className="rounded-full overflow-hidden items-center justify-center">
            {notification.img ? (
              <Image
                source={{
                  uri: notification.img,
                }}
                className="w-12 h-12 object-cover"
              />
            ) : (
              <AntIcons name="infocirlce" />
            )}
          </View>
          <View className="gap-1 flex-1">
            <Text className="font-semibold text-base">
              {notification.title}
            </Text>
            <Text className="text">{notification.message}</Text>
          </View>
          <View className="absolute gap-x-1 right-3 bottom-4 flex-row items-center justify-end">
            <AntIcons name="clockcircleo" />
            <Text>{time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
