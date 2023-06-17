import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NotificationType } from "../../../@types/NotificationType";
import Notification from "../../../components/caregiver/Notification";

const notifications: NotificationType[] = [
  {
    dateTime: new Date(),
    message: "This is a test notification",
    title: "This is a test notification",
    type: "info",
    img: "https://www.github.com/pedrobraghin.png",
    id: "1",
    fromId: "3",
  },
  {
    dateTime: new Date(),
    message: "This is a test notification",
    title: "This is a test notification",
    type: "info",
    img: "https://www.github.com/pedrobraghin.png",
    id: "2",
    fromId: "910",
  },
];

export default function NotificationScreen() {
  return (
    <SafeAreaView className="flex-1 px-4 pt-2 bg-white">
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Notification notification={item} />}
      />
    </SafeAreaView>
  );
}
