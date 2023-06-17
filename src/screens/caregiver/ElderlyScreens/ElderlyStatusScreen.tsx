import { useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { RootStackScreenProps } from "../RootNavigation";
import { useUserData } from "../../../hooks/useUserData";
import { deleteFriendship } from "../../../functions/friends";
import { useParentParams } from "../../../hooks/useParentParams";
import { Colors } from "../../../constants/Colors";
import Modal from "../../../components/Modal";

type ParentParams = {
  id: string;
  friendshipId: string;
  fullName: string;
};

export default function ElderlyStatusScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation<RootStackScreenProps>();
  const params = useParentParams<ParentParams>("ElderlyScreens");
  const id = params?.id as string;
  const fullName = params?.fullName as string;
  const friendshipId = params?.friendshipId as string;

  const { getFriendsList } = useUserData();

  useEffect(() => {
    navigation.setOptions({
      title: fullName,
      headerTitleStyle: {
        color: Colors.MainColor,
      },
    });
  }, []);

  async function handleDeleteFriendship() {
    await deleteFriendship(friendshipId);
    await getFriendsList();
    navigation.goBack();
  }

  function openModal() {
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-5">
      <View className="items-center mt-4">
        <TouchableOpacity
          className="bg-main-color py-2 px-4 rounded-lg self-end"
          onPress={openModal}
        >
          <Text className="text-text-color">Desfazer amizade</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text>{id}</Text>
      </View>
      <Modal
        onConfirm={handleDeleteFriendship}
        onCancel={closeModal}
        confirmText="Excluir"
        cancelText="Cancelar"
        isModalVisible={modalVisible}
      >
        <View className="flex-row items-center flex-wrap">
          <Text className="text-lg">
            Tem certeza que deseja desfazer amizade com
            {<Text className="font-bold"> {fullName}</Text>}?
          </Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
