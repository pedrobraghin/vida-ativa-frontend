import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Modal from "../../../components/Modal";
import { useUser } from "../../../hooks/useUser";
import { RootStackScreenProps } from "../RootNavigation";

export default function SettingsScreen() {
  const navigation = useNavigation<RootStackScreenProps>();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { logout } = useUser();

  function handleLogout() {
    setModalVisible(false);
    logout();
  }

  function openModal() {
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
  }

  function handleDeleteAccount() {
    navigation.navigate("SettingsScreens", { screen: "DeleteAccount" });
  }

  return (
    <SafeAreaView className="bg-white flex-1 px-5 pt-5">
      <View className="mb-4">
        <TouchableOpacity
          className="border-2 border-red-300 p-4 rounded-md"
          onPress={handleDeleteAccount}
        >
          <Text className="text-center text-lg text-red-300 font-bold">
            Apagar conta
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          className="border-2 border-red-300 p-4 rounded-md"
          onPress={openModal}
        >
          <Text className="text-center text-lg text-red-300 font-bold">
            Sair
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        onConfirm={handleLogout}
        onCancel={closeModal}
        confirmText="Sair"
        cancelText="Cancelar"
        isModalVisible={modalVisible}
      >
        <View className="flex-row items-center flex-wrap">
          <Text className="text-lg">Tem certeza que deseja sair?</Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
