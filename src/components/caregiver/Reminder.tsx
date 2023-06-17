import AntIcons from "@expo/vector-icons/AntDesign";
import FeatherIcons from "@expo/vector-icons/Feather";

import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { ReminderType } from "../../@types/ReminderType";
import { Colors } from "../../constants/Colors";
import { updateReminder } from "../../functions/reminder";
import { useUserData } from "../../hooks/useUserData";

interface ReminderProps {
  reminder: ReminderType;
}

export default function Reminder({
  reminder: { title, completed, id },
}: ReminderProps) {
  const [isCompleted, setIsCompleted] = useState(completed);
  const { getRemindersList } = useUserData();

  async function handleCheck() {
    const newStatus = !isCompleted;

    setIsCompleted(newStatus);
    await updateReminder(id, { completed: newStatus });
    await getRemindersList();
  }

  return (
    <TouchableOpacity
      className={
        "flex-row  items-center justify-between min-h-5 border-2 border-c8 rounded-md p-4 transition-none mb-2 " +
        (isCompleted ? "bg-main-color border-transparent" : "")
      }
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
  );
}
