import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { RootStackScreenProps } from "../RootNavigation";
import { useUserData } from "../../../hooks/useUserData";
import { Medication } from "../../../components/Medication";
import { Appointment } from "../../../components/Appointment";

export default function MedicationsScreen() {
  const navigation = useNavigation<RootStackScreenProps>();

  const { medications, appointments, getAppointments, getMedications } =
    useUserData();

  useEffect(() => {
    getAppointments();
    getMedications();
  }, []);

  function handleAddMedication() {
    navigation.navigate("MedicationsScreens", { screen: "AddMedication" });
  }

  function handleAddAppointment() {
    navigation.navigate("MedicationsScreens", { screen: "AddAppointment" });
  }

  return (
    <ScrollView className="flex-1 bg-white px-5">
      <View className="mb-10 mt-4">
        <View className="flex-row justify-between items-center">
          <Text className="font-semibold text-xl">Consultas</Text>
          <TouchableOpacity
            className="bg-main-color px-2 py-3 rounded-md my-2"
            onPress={handleAddAppointment}
          >
            <Text className="text-center text-text-color">
              Cadastrar consulta
            </Text>
          </TouchableOpacity>
        </View>
        <View className="mt-4">
          {appointments.length > 0 ? (
            appointments.map((appointment) => {
              return (
                <View className="mb-4" key={appointment.id}>
                  <Appointment appointment={appointment} />
                </View>
              );
            })
          ) : (
            <Text className="text-base italic">
              Você não possui nenhuma consulta agendada.
            </Text>
          )}
        </View>
      </View>
      <View>
        <View className="flex-row justify-between items-center">
          <Text className="font-semibold text-xl">Remédios</Text>
          <TouchableOpacity
            className="bg-main-color px-2 py-3 rounded-md my-2"
            onPress={handleAddMedication}
          >
            <Text className="text-center text-text-color">
              Cadastrar medicamento
            </Text>
          </TouchableOpacity>
        </View>
        <View className="mt-4">
          {medications.length > 0 ? (
            medications.map((medication) => {
              return (
                <View className="mb-4" key={medication.id}>
                  <Medication medication={medication} />
                </View>
              );
            })
          ) : (
            <View className="justify-center">
              <Text className="text-base italic">
                Você não possui nenhum remédio cadastrado.
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}