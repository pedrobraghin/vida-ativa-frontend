import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import MCIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { OutputAppointmentDTO } from "../@types/AppointmentTypes";
import { RootStackScreenProps } from "../screens/elderly/RootNavigation";
import { Colors } from "../constants/Colors";
import { formatTime } from "../utils/formatTime";

interface AppointmentProps {
  appointment: OutputAppointmentDTO;
}

export function Appointment({ appointment }: AppointmentProps) {
  const navigation = useNavigation<RootStackScreenProps>();

  function handleViewAppointment() {
    navigation.navigate("MedicationsScreens", {
      screen: "AppointmentScreen",
      appointment,
    });
  }

  return (
    <TouchableOpacity
      className="border-c8 border-2 rounded-md flex-row items-center px-4 py-2 "
      onPress={handleViewAppointment}
    >
      <View className="items-center mr-4">
        <View className="border-2 border-main-color rounded-full p-2 ">
          <MCIcons name="calendar-clock" size={32} color={Colors.MainColor} />
        </View>
      </View>
      <View>
        <Text className="text-lg font-semibold">{appointment.title}</Text>
        <View className="flex-row items-center">
          <Text className="text-base">
            {new Date(appointment.date).toLocaleDateString()}
          </Text>
          <Text> - </Text>
          <Text className="text-base">
            {formatTime(new Date(appointment.date))}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
