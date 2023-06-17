import AntIcons from "@expo/vector-icons/AntDesign";
import FeatherIcons from "@expo/vector-icons/Feather";
import McIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { ReminderType } from "../../@types/ReminderType";
import { Colors } from "../../constants/Colors";
import { deleteReminder, updateReminder } from "../../functions/reminder";
import { useUserData } from "../../hooks/useUserData";
import Modal from "../Modal";

interface ReminderProps {
  reminder: ReminderType;
  short?: boolean;
}

export default function Reminder({
  reminder: { title, completed, id },
  short,
}: ReminderProps) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState(completed);
  const { getRemindersList } = useUserData();

  async function handleCheck() {
    const newStatus = !isCompleted;

    setIsCompleted(newStatus);
    await updateReminder(id, { completed: newStatus });
    await getRemindersList();
  }

  function openModal() {
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
  }

  async function handleDelete() {
    await deleteReminder(id);
    await getRemindersList();
    closeModal();
  }

  return (
    <View className=" flex-row items-center justify-center gap-x-2">
      <TouchableOpacity
        className={`flex-row flex-1 items-center justify-between min-h-5 border-2 border-c8 rounded-md p-4 transition-none mb-2 ${
          isCompleted ? "bg-main-color border-transparent" : ""
        }`}
        onPress={handleCheck}
      >
        <Text
          className={
            "text-lg " + (isCompleted ? "text-text-color line-through" : "")
          }
        >
          {title}
        </Text>
        <View>
          {isCompleted ? (
            <AntIcons name="checksquare" color={Colors.White} size={24} />
          ) : (
            <FeatherIcons name="square" color={Colors.Gray_300} size={24} />
          )}
        </View>
      </TouchableOpacity>
      {!short && (
        <TouchableOpacity
          onPress={openModal}
          className="rounded-full p-1 active:bg-zinc-500"
        >
          <McIcons name="delete" color={Colors.MainColor} size={32} />
        </TouchableOpacity>
      )}
      <Modal
        onConfirm={handleDelete}
        onCancel={closeModal}
        confirmText="Excluir"
        cancelText="Cancelar"
        isModalVisible={modalVisible}
      >
        <View className="flex-row items-center flex-wrap">
          <Text className="text-lg">
            Tem certeza que deseja excluir o lembrete{" "}
            <Text className="font-bold">{title}</Text>?
          </Text>
        </View>
      </Modal>
    </View>
  );
}
