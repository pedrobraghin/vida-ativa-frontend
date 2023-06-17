import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { RootStackScreenProps } from "../../elderly/RootNavigation";

export default function SettingsScreen() {
  const navigation = useNavigation<RootStackScreenProps>();

  function handleLogout() {
    navigation.navigate("LogoutScreen", { screen: "LogoutScreen" });
  }

  async function handleDeleteAccount() {}

  return (
    <SafeAreaView className="bg-white flex-1 px-5 pt-5">
      <View className="gap-y-4">
        <TouchableOpacity
          className="border-2 border-red-300 p-4 rounded-md"
          onPress={handleDeleteAccount}
        >
          <Text className="text-center text-lg text-red-300 font-bold">
            Apagar conta
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="border-2 border-red-300 p-4 rounded-md"
          onPress={handleLogout}
        >
          <Text className="text-center text-lg text-red-300 font-bold">
            Sair
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
