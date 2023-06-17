import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, TouchableOpacity } from "react-native";

import { useUser } from "../../hooks/useUser";

export default function LogoutScreen() {
  const navigation = useNavigation();
  const { logout } = useUser();
  function handleLogout() {
    logout();
  }
  function handleCancel() {
    navigation.goBack();
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center px-5 pt-5 w-max h-max bg-[rgba(0,0,0,1)]">
      <View className="bg-white border-2 border-c8 rounded-md p-4 opacity-100">
        <View className="mb-4">
          <Text className="font-semibold text-lg text-25">
            Tem certeza que deseja sair da sua conta?
          </Text>
        </View>
        <View className="flex-row justify-end">
          <TouchableOpacity
            className="px-4 py-2 rounded-md"
            onPress={handleCancel}
          >
            <Text className="text-center text-lg ">Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="border-2 border-red-300 px-4 py-2 rounded-md"
            onPress={handleLogout}
          >
            <Text className="text-center text-lg text-red-300 font-bold">
              Sair
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
