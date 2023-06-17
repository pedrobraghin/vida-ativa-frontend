import FA5Icons from "@expo/vector-icons/FontAwesome5";
import MCIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntIcons from "@expo/vector-icons/AntDesign";

import { useNavigation } from "@react-navigation/native";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";

import { RootStackScreenProps } from "../RootNavigation";

export function HomeScreen() {
  const navigation = useNavigation<RootStackScreenProps>();

  function handlePressMedications() {
    navigation.navigate("MedicationsScreens", { screen: "Medications" });
  }

  function handlePressHealthData() {
    navigation.navigate("HealthDataScreens", { screen: "HealthData" });
  }

  function handlePressEmergency() {
    navigation.navigate("EmergencyScreens", { screen: "Emergency" });
  }

  function handlePressCaregivers() {
    navigation.navigate("CaregiversScreens", { screen: "Caregivers" });
  }

  function handlePressPhysicalActivity() {
    navigation.navigate("PhysicalActivityScreens", {
      screen: "PhysicalActivity",
    });
  }

  function handlePressSettings() {
    navigation.navigate("SettingsScreens", { screen: "SettingsScreens" });
  }

  return (
    <ScrollView className="bg-white">
      <View className="justify-between px-5 py-5 gap-y-4">
        <TouchableOpacity
          className="bg-main-color rounded-[24px] p-4 w-full"
          onPress={handlePressMedications}
        >
          <View className="flex-row items-center gap-5">
            <View className="w-16">
              <MCIcons name="pill" size={50} color="white" />
            </View>
            <Text className="text-text-color text-lg text-center">
              Remédios e consultas
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-main-color rounded-[24px] p-4 w-full"
          onPress={() =>
            navigation.navigate("CalendarScreens", { screen: "Calendar" })
          }
        >
          <View className="flex-row items-center gap-5">
            <View className="w-16">
              <AntIcons name="calendar" size={50} color="white" />
            </View>
            <Text className="text-text-color text-lg text-center">Agenda</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-main-color rounded-[24px] p-4 w-full"
          onPress={handlePressHealthData}
        >
          <View className="flex-row items-center gap-5">
            <View className="w-16">
              <FA5Icons name="heartbeat" size={50} color="white" />
            </View>
            <Text className="text-text-color text-lg text-center">
              Dados de saúde
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-main-color rounded-[24px] p-4 w-full"
          onPress={handlePressPhysicalActivity}
        >
          <View className="flex-row items-center gap-5">
            <View className="w-16">
              <FA5Icons name="dumbbell" size={50} color="white" />
            </View>
            <Text className="text-text-color text-lg text-center">
              Atividades físicas
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-main-color rounded-[24px] p-4 w-full"
          onPress={handlePressCaregivers}
        >
          <View className="flex-row items-center gap-5">
            <View className="w-16">
              <FA5Icons name="user-friends" size={50} color="white" />
            </View>
            <Text className="text-text-color text-lg text-center">
              Cuidadores
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className=" bg-main-color rounded-[24px] p-4 w-full"
          onPress={handlePressEmergency}
        >
          <View className="flex-row items-center gap-5">
            <View className="w-16">
              <FA5Icons name="ambulance" size={50} color="white" />
            </View>
            <Text className="text-text-color text-lg text-center">
              Emergência
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className=" bg-main-color rounded-[24px] p-4 w-full"
          onPress={handlePressSettings}
        >
          <View className="flex-row items-center gap-5">
            <View className="w-16">
              <AntIcons name="setting" size={50} color="white" />
            </View>
            <Text className="text-text-color text-lg text-center">
              Configurações
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
