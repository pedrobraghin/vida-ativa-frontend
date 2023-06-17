import { useEffect, useState } from "react";
import FA5Icons from "@expo/vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "@react-native-material/core";
import { Text, TouchableOpacity, View, Image, Linking } from "react-native";

import { Colors } from "../../../constants/Colors";
import { RootStackScreenProps } from "../RootNavigation";
import { useUserData } from "../../../hooks/useUserData";
import { FriendType } from "../../../@types/FriendsTypes";
import { useParentParams } from "../../../hooks/useParentParams";
import { deleteFriendship, getCaregiverData } from "../../../functions/friends";
import Modal from "../../../components/Modal";

type ParentParams = {
  caregiverId: string;
  friendshipId: string;
  friendshipDate: string;
};

export default function CaregiverScreen() {
  const [caregiver, setCaregiver] = useState<FriendType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { getFriendsList } = useUserData();

  const navigation = useNavigation<RootStackScreenProps>();
  const params = useParentParams<ParentParams>("CaregiversScreens");
  const caregiverId = params?.caregiverId as string;
  const friendshipId = params?.friendshipId as string;
  const friendshipDate = params?.friendshipDate as string;

  useEffect(() => {
    navigation.setOptions({
      title: caregiver?.fullName,
      headerTitleStyle: {
        color: Colors.MainColor,
      },
    });
    loadCaregiver();
  }, []);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  async function loadCaregiver() {
    const caregiver = await getCaregiverData(caregiverId);
    setCaregiver(caregiver);
    setIsLoading(false);
  }

  async function handleDeleteFriendship() {
    await deleteFriendship(friendshipId);
    await getFriendsList();
    navigation.goBack();
  }

  if (isLoading) {
    return <ActivityIndicator size={32} color={Colors.MainColor} />;
  }

  if (!caregiver) {
    return <View />;
  }

  async function makePhoneCall() {
    try {
      Linking.openURL(`tel:${caregiver?.phoneNumber}`);
    } catch (err) {}
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-8 pt-4 pb-10 justify-between">
      <View>
        <View className="items-center my-4">
          {caregiver.img && (
            <Image
              className="rounded-md min-w-[200px]"
              source={{
                uri: caregiver.img.regular,
              }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
        <View className="gap-y-2">
          <View className="flex-row">
            <Text className="font-semibold text-xl">Nome: </Text>
            <Text className="text-xl">{caregiver.fullName}</Text>
          </View>
          <View className="flex-row justify-between items-center">
            <View className="flex-row">
              <Text className="font-semibold text-xl">Telefone: </Text>
              <Text className="text-xl">{caregiver.phoneNumber}</Text>
            </View>
            <TouchableOpacity
              className="flex-row w-10 h-10 active:bg-slate-400 rounded-full justify-center items-center"
              onPress={makePhoneCall}
            >
              <FA5Icons name="phone-alt" size={24} color={Colors.MainColor} />
            </TouchableOpacity>
          </View>
          <View className="flex-row">
            <Text className="font-semibold text-xl">Endereço: </Text>
            <Text className="text-xl">{caregiver.address}</Text>
          </View>

          <View className="flex-row">
            <Text className="font-semibold text-xl">Cuidadora desde: </Text>
            <Text className="text-xl">
              {new Date(friendshipDate).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        className="bg-main-color rounded-md max-w-md"
        onPress={openModal}
      >
        <Text className="text-text-color py-3 px-4 text-center text-base">
          Desfazer amizade
        </Text>
      </TouchableOpacity>

      <Modal
        isModalVisible={modalOpen}
        onCancel={closeModal}
        onConfirm={handleDeleteFriendship}
        confirmText="Desfazer amizade"
      >
        <Text className="text-lg">
          Tem certeza que deseja desfazer amizade com{" "}
          {<Text className="font-bold">{caregiver.fullName}</Text>}?
        </Text>
      </Modal>
    </SafeAreaView>
  );
}
