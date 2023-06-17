import { useNavigation } from "@react-navigation/native";
import { OutputMedicationDTO } from "../@types/MedicationTypes";
import { View, Text, Image, TouchableOpacity } from "react-native";

import MCIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { formatTime } from "../utils/formatTime";
import { Colors } from "../constants/Colors";
import { RootStackScreenProps } from "../screens/elderly/RootNavigation";

interface MedicationProps {
  medication: OutputMedicationDTO;
}

export function Medication({ medication }: MedicationProps) {
  const navigation = useNavigation<RootStackScreenProps>();

  function handleViewMedication() {
    navigation.navigate("MedicationsScreens", {
      screen: "MedicationScreen",
      medication,
    });
  }

  return (
    <TouchableOpacity
      className="p-4 border-c8 border-2 rounded-md flex-row items-center"
      onPress={handleViewMedication}
    >
      <View>
        {medication.img ? (
          <Image
            source={{
              uri: medication.img,
            }}
            style={{
              width: 64,
              height: 64,
              borderRadius: 100,
            }}
          />
        ) : (
          <View>
            <MCIcons
              name="pill"
              color={Colors.MainColor}
              style={{
                backgroundColor: "transparent",
                borderRadius: 10,
                padding: 6,
              }}
              size={50}
            />
          </View>
        )}
      </View>
      <View className="ml-4 ">
        <Text className="text-xl font-semibold text-25">{medication.name}</Text>
        <Text className="text-lg text-25">
          Horário: {formatTime(new Date(medication.time))}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
