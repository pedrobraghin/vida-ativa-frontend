import IoIcons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";

import { Colors } from "../../constants/Colors";
import { RootStackScreenProps } from "../../screens/caregiver/RootNavigation";

export function AddReminder() {
  const navigation = useNavigation<RootStackScreenProps>();

  function handleAddReminder() {
    navigation.navigate("ReminderScreens", { screen: "AddReminder" });
  }

  return (
    <View className="p-5 rounded-md shadow shadow-zinc-200 bg-white">
      <TouchableOpacity
        className="border border-dashed border-c8 p-10 justify-center items-center "
        onPress={handleAddReminder}
      >
        <View className="flex-row items-center gap-x-2">
          <Text>Adicionar lembrete</Text>
          <IoIcons name="add-circle-outline" size={20} color={Colors.Gray_c8} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
