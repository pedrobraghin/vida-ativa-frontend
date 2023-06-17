import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FA5Icons from "@expo/vector-icons/FontAwesome5";
import MCIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { Colors } from "../../../constants/Colors";
import { useUserData } from "../../../hooks/useUserData";
import { RootStackScreenProps } from "../RootNavigation";
import { useParentParams } from "../../../hooks/useParentParams";
import { deleteAppointment } from "../../../functions/appointments";
import { OutputAppointmentDTO } from "../../../@types/AppointmentTypes";
import FormErrorsContainer from "../../../components/FormErrorsContainer";
import Modal from "../../../components/Modal";

type ParentParams = {
  appointment?: OutputAppointmentDTO;
};

export default function AppointmentScreen() {
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { getAppointments } = useUserData();

  const navigation = useNavigation<RootStackScreenProps>();
  const params = useParentParams<ParentParams>("MedicationsScreens");
  const appointment = params!.appointment;

  useEffect(() => {
    navigation.setOptions({
      title: appointment?.title,
    });
  }, []);

  function openModal() {
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
  }

  function handleEditAppointment() {
    navigation.navigate("MedicationsScreens", {
      isEditing: true,
      appointment,
      screen: "AddAppointment",
    });
  }

  async function handleDeleteAppointment() {
    setError(null);
    try {
      await deleteAppointment(appointment!.id);
      await getAppointments();
      navigation.navigate("index");
    } catch (err) {
      setError(
        "Ocorreu um erro ao apagar a consulta. Se o erro persistir contate o suporte do sistema."
      );
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-5 justify-between">
      <View>
        <View className="items-center mb-5 mt-10">
          <View className="border-2 border-main-color rounded-full p-10">
            <MCIcons name="calendar-clock" size={64} color={Colors.MainColor} />
          </View>
        </View>
        <View>
          <View className="flex-row">
            <Text className="text-xl font-bold">Consulta: </Text>
            <Text className="text-xl">{appointment?.title}</Text>
          </View>
          <View className="flex-row">
            <Text className="text-xl font-bold">Médico: </Text>
            <Text className="text-xl">{appointment?.doctor}</Text>
          </View>
          <View className="flex-row">
            <Text className="text-xl font-bold">Descrição: </Text>
            <Text className="text-xl">{appointment?.description}</Text>
          </View>
          <View className="flex-row">
            <Text className="text-xl font-bold">Data: </Text>
            <Text className="text-xl">
              {new Date(appointment!.date).toLocaleDateString()}
            </Text>
          </View>
        </View>
        <View className="my-4">
          {error && <FormErrorsContainer errors={[error]} />}
        </View>
      </View>
      <View className="flex-row items-end justify-between h-16 mb-10">
        <TouchableOpacity className="items-center w-32" onPress={openModal}>
          <MCIcons name="delete" size={40} color="red" />
          <Text className="mt-1 text-base">Excluir consulta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center w-32"
          onPress={handleEditAppointment}
        >
          <FA5Icons name="edit" size={32} color={Colors.MainColor} />
          <Text className="mt-2 text-base">Editar consulta</Text>
        </TouchableOpacity>
      </View>
      <Modal
        onConfirm={handleDeleteAppointment}
        onCancel={closeModal}
        confirmText="Excluir consulta"
        cancelText="Cancelar"
        isModalVisible={modalVisible}
      >
        <View className="flex-row items-center flex-wrap">
          <Text className="text-lg">
            Tem certeza que deseja excluir a consulta
            {<Text className="font-bold"> {appointment?.title}</Text>}?
          </Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
