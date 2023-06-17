import EntypoIcons from "@expo/vector-icons/Entypo";

import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, FlatList, TouchableOpacity } from "react-native";

import Reminder from "../../../components/caregiver/Reminder";

import { Colors } from "../../../constants/Colors";
import { useUserData } from "../../../hooks/useUserData";
import { TextInput } from "../../../components/TextInput";
import { createReminder } from "../../../functions/reminder";

export default function AddReminderScreen() {
  const [reminderText, setReminderText] = useState<string>("");
  const { reminders, getRemindersList } = useUserData();

  async function handleCreateReminder() {
    if (!reminderText.trim()) return;

    await createReminder(reminderText);
    await getRemindersList();
  }

  function clearReminderText() {
    setReminderText("");
  }

  useFocusEffect(
    useCallback(() => {
      getRemindersList();
    }, [])
  );

  return (
    <SafeAreaView className="px-5 flex-1 gap-y-2 bg-white">
      <View className="gap-y-2">
        <Text className="font-semibold">Novo lembrete</Text>
        <View className="relative">
          <TextInput
            placeholder="Texto do lembrete"
            className="placeholder:pl-6"
            onChangeText={setReminderText}
            value={reminderText}
            onSubmitEditing={handleCreateReminder}
          />
          {reminderText.trim() && (
            <TouchableOpacity
              onPress={clearReminderText}
              className="absolute p-1 rounded-full active:bg-c8 right-1 top-3"
            >
              <EntypoIcons
                name="cross"
                size={32}
                className="absolute"
                color={Colors.Gray_c8}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View className="gap-y-2">
        <Text className="font-semibold">Todos os lembretes</Text>
        {reminders.length > 0 ? (
          <FlatList
            data={reminders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Reminder reminder={item} />}
          ></FlatList>
        ) : (
          <View>
            <Text className="italic">Nenhum lembrete adicionado.</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
