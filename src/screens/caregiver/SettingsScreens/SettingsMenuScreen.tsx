import IoIcons from "@expo/vector-icons/Ionicons";
import AntIcons from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

import { useUser } from "../../../hooks/useUser";
import { Colors } from "../../../constants/Colors";
import { RootStackScreenProps } from "../RootNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function SettingsMenuScreen() {
  const navigation = useNavigation<RootStackScreenProps>();

  const { user } = useUser();
  const { img } = user;

  function handleProfileClick() {
    navigation.navigate("SettingsScreens", { screen: "ProfileMenu" });
  }

  function handleSettingsClick() {
    navigation.navigate("SettingsScreens", { screen: "SettingsMenu" });
  }

  function handleHelpClick() {
    navigation.navigate("SettingsScreens", { screen: "HelpMenu" });
  }

  return (
    <SafeAreaView className="bg-white flex-1">
      <TouchableOpacity
        className="pl-10 flex-row justify-between items-center border-b-2 border-zinc-300 p-7"
        onPress={handleProfileClick}
      >
        <View className="flex-row gap-x-6 flex-1 items-center">
          <View className="w-10 h-10 justify-center items-center rounded-full overflow-hidden">
            {img ? (
              <Image
                source={{ uri: img.regular }}
                style={{ width: 40, height: 40, borderRadius: 100 }}
              />
            ) : (
              <IoIcons name="person-circle-outline" size={32} />
            )}
          </View>

          <Text className="text-lg">Perfil</Text>
        </View>
        <View>
          <AntIcons name="right" size={18} color={Colors.Black_35} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        className="pl-10 flex-row justify-between items-center border-b-2 border-zinc-300 p-7"
        onPress={handleSettingsClick}
      >
        <View className="flex-row gap-x-6  flex-1 items-center">
          <View className="h-10 w-10 justify-center items-center">
            <IoIcons name="settings-outline" size={32} />
          </View>
          <Text className="text-lg">Configurações</Text>
        </View>
        <View>
          <AntIcons name="right" size={18} color={Colors.Black_35} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        className="pl-10 flex-row justify-between items-center border-b-2 border-zinc-300 p-7"
        onPress={handleHelpClick}
      >
        <View className="flex-row gap-x-6  flex-1 items-center">
          <View className="w-10 h-10 justify-center items-center">
            <IoIcons name="help-circle-outline" size={32} />
          </View>
          <Text className="text-lg">Precisa de ajuda?</Text>
        </View>
        <View>
          <AntIcons name="right" size={18} color={Colors.Black_35} />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
