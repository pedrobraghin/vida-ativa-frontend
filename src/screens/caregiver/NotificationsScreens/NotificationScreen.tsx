import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationScreen() {
  return (
    <SafeAreaView className="flex-1 px-4 pt-2 bg-white items-center justify-center">
      <Text className="text-xl italic">Em breve!</Text>
    </SafeAreaView>
  );
}
