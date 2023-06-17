import FA5Icons from "@expo/vector-icons/FontAwesome5";
import MCIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FormErrorsContainer from "../../../components/FormErrorsContainer";

import { Colors } from "../../../constants/Colors";
import { formatTime } from "../../../utils/formatTime";
import { deleteEvent } from "../../../functions/events";
import { useUserData } from "../../../hooks/useUserData";
import { RootStackScreenProps } from "../RootNavigation";
import { useParentParams } from "../../../hooks/useParentParams";
import { OutputUserEventsTypeDTO } from "../../../@types/EventsTypes";
import Modal from "../../../components/Modal";

type ParentParams = {
  event: OutputUserEventsTypeDTO;
};

export default function EventScreen() {
  const [errors, setErrors] = useState<string[] | null>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { getEvents } = useUserData();

  const navigation = useNavigation<RootStackScreenProps>();
  const params = useParentParams<ParentParams>("CalendarScreens");
  const event = params!.event;

  useEffect(() => {
    navigation.setOptions({
      title: event.title,
    });
  }, []);

  function openModal() {
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
  }

  async function handleDeleteEvent() {
    setErrors(null);
    try {
      await deleteEvent(event.id);
      await getEvents();
      navigation.goBack();
    } catch (err) {
      setErrors([
        "Falha ao excluir evento. Se o erro persistir contate o suporte do sistema.",
      ]);
    }
  }

  async function handleEditEvent() {
    navigation.navigate("CalendarScreens", {
      screen: "CreateEvent",
      event,
      isEditing: true,
    });
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-5 justify-between">
      {errors && <FormErrorsContainer errors={errors} />}
      <View>
        <View className="flex-row mt-4">
          <Text className="font-bold text-xl">Evento: </Text>
          <Text className="text-xl">{event.title}</Text>
        </View>
        {event.location && (
          <View className="flex-row mt-4">
            <Text className="font-bold text-xl">Local: </Text>
            <Text className="text-xl">{event.location}</Text>
          </View>
        )}
        <View className="flex-row mt-4">
          <Text className="font-bold text-xl">Data: </Text>
          <Text className="text-xl">
            {new Date(event.date).toLocaleDateString()}
          </Text>
        </View>
        <View className="flex-row mt-4">
          <Text className="font-bold text-xl">Horário: </Text>
          <Text className="text-xl">{formatTime(new Date(event.date))}</Text>
        </View>
      </View>
      <View className="flex-row items-end justify-between h-16 mb-10">
        <TouchableOpacity className="items-center w-32" onPress={openModal}>
          <MCIcons name="delete" size={40} color="red" />
          <Text className="mt-1 text-base">Excluir evento</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center w-32"
          onPress={handleEditEvent}
        >
          <FA5Icons name="edit" size={32} color={Colors.MainColor} />
          <Text className="mt-2 text-base">Editar evento</Text>
        </TouchableOpacity>
      </View>
      <Modal
        onConfirm={handleDeleteEvent}
        onCancel={closeModal}
        confirmText="Excluir"
        cancelText="Cancelar"
        isModalVisible={modalVisible}
      >
        <View className="flex-row items-center flex-wrap">
          <Text className="text-lg">
            Tem certeza que deseja excluir o evento
            {<Text className="font-bold"> {event.title}</Text>}?
          </Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
