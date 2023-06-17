import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FA5Icons from "@expo/vector-icons/FontAwesome5";
import MCIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useUserData } from "../../../hooks/useUserData";
import { RootStackScreenProps } from "../RootNavigation";
import { useParentParams } from "../../../hooks/useParentParams";
import { deleteMedication } from "../../../functions/medications";
import { OutputMedicationDTO } from "../../../@types/MedicationTypes";
import { Colors } from "../../../constants/Colors";
import { formatTime } from "../../../utils/formatTime";
import Modal from "../../../components/Modal";
import { Notifications } from "../../../services/Notifications";

type ParentParams = {
  medication?: OutputMedicationDTO;
};

export default function MedicationScreen() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { getMedications } = useUserData();

  const navigation = useNavigation<RootStackScreenProps>();
  const params = useParentParams<ParentParams>("MedicationsScreens");
  const medication = params!.medication;
  useEffect(() => {
    navigation.setOptions({
      title: medication?.name,
    });
  }, []);

  function openModal() {
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
  }

  function handleEditMedication() {
    navigation.navigate("MedicationsScreens", {
      screen: "AddMedication",
      medication,
      isEditing: true,
    });
  }

  async function handleDeleteMedication() {
    const notifications = new Notifications();
    try {
      await deleteMedication(medication!.id);
      await getMedications();
      await notifications.cancelNotification(medication!.id);
      navigation.goBack();
    } catch (e) {}
  }

  return (
    <SafeAreaView className="bg-white flex-1 px-5 justify-between">
      <View className="py-10 ">
        <View className="mt-4 justify-center items-center">
          {medication!.img ? (
            <Image
              source={{
                uri: medication?.img,
              }}
              style={{
                width: 150,
                height: 150,
                borderRadius: 100,
              }}
            />
          ) : (
            <View className="border-2 border-main-color rounded-full p-5">
              <MCIcons
                name="pill"
                color={Colors.MainColor}
                style={{
                  backgroundColor: "transparent",
                  borderRadius: 10,
                  padding: 6,
                }}
                size={124}
              />
            </View>
          )}
        </View>
        <View className="mt-10">
          <View className="flex-row">
            <Text className="font-bold text-xl text-25">Nome: </Text>
            <Text className="text-xl text-25">{medication?.name}</Text>
          </View>
          <View className="flex-row">
            <Text className="font-bold text-xl text-25">Dose: </Text>
            <Text className="text-xl text-25">{medication?.posology}</Text>
          </View>
          <View className="flex-row">
            <Text className="font-bold text-xl text-25">Horário: </Text>
            <Text className="text-xl text-25">
              {formatTime(new Date(medication!.time))}
            </Text>
          </View>
          <View className="flex-row">
            <Text className="font-bold text-xl text-25">Tipo: </Text>
            <Text className="text-xl text-25">{medication?.type}</Text>
          </View>
          <View className="flex-row">
            <Text className="font-bold text-xl text-25">Descrição: </Text>
            <Text className="text-xl text-25">{medication?.description}</Text>
          </View>
        </View>
      </View>
      <View className="flex-row items-end justify-between h-16 mb-10">
        <TouchableOpacity className="items-center w-32" onPress={openModal}>
          <MCIcons name="delete" size={40} color="red" />
          <Text className="mt-1 text-base">Excluir remédio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center w-32"
          onPress={handleEditMedication}
        >
          <FA5Icons name="edit" size={32} color={Colors.MainColor} />
          <Text className="mt-2 text-base">Editar remédio</Text>
        </TouchableOpacity>
      </View>
      <Modal
        onConfirm={handleDeleteMedication}
        onCancel={closeModal}
        confirmText="Excluir remédio"
        cancelText="Cancelar"
        isModalVisible={modalVisible}
      >
        <View className="flex-row items-center flex-wrap">
          <Text className="text-lg">
            Tem certeza que deseja excluir o remédio
            {<Text className="font-bold"> {medication?.name}</Text>}?
          </Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
