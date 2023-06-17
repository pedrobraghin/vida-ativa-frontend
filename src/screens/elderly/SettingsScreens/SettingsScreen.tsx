import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Modal from "../../../components/Modal";
import { useUser } from "../../../hooks/useUser";

export default function SettingsScreen() {
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

  return (
    <SafeAreaView className="bg-white flex-1 px-5 pt-5">
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
        confirmText="Excluir"
        cancelText="Sair"
        isModalVisible={modalVisible}
      >
        <View className="flex-row items-center flex-wrap">
          <Text className="text-lg">Tem certeza que deseja sair?</Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
