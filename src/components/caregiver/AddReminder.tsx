import { useState } from "react";
import IoIcons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";

import Reminder from "./Reminder";
import { Colors } from "../../constants/Colors";
import { useUserData } from "../../hooks/useUserData";
import { RootStackScreenProps } from "../../screens/caregiver/RootNavigation";

export function AddReminder() {
  const navigation = useNavigation<RootStackScreenProps>();
  const [remindersIndex, setRemindersIndex] = useState(0);
  const { reminders } = useUserData();

  function handleAddReminder() {
    navigation.navigate("ReminderScreens", { screen: "AddReminder" });
  }

  function nextReminder() {
    if (remindersIndex < reminders.length - 1) {
      setRemindersIndex(remindersIndex + 1);
    } else {
      setRemindersIndex(0);
    }
  }

  function previousReminder() {
    if (remindersIndex > 0) {
      setRemindersIndex(remindersIndex - 1);
    } else {
      setRemindersIndex(reminders.length - 1);
    }
  }
  return (
    <View>
      <View className="p-5 rounded-md shadow shadow-zinc-200 bg-white mb-3">
        <TouchableOpacity
          className="border border-dashed border-c8 p-5 justify-center items-center "
          onPress={handleAddReminder}
        >
          <View className="flex-row items-center gap-x-2">
            <Text>Adicionar lembrete</Text>
            <IoIcons
              name="add-circle-outline"
              size={20}
              color={Colors.Gray_c8}
            />
          </View>
        </TouchableOpacity>
      </View>
      {reminders.length > 0 && (
        <View className="bg-white rounded-md">
          <Reminder reminder={reminders[remindersIndex]} short />
        </View>
      )}
    </View>
  );
}
