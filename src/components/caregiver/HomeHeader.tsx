import { useNavigation } from "@react-navigation/native";
import { Image, Text, View, TouchableOpacity } from "react-native";

import { useUser } from "../../hooks/useUser";
import NotificationsIcon from "./NotificationsIcon";
import { RootStackScreenProps } from "../../screens/caregiver/RootNavigation";

export default function HomeHeader() {
  const navigation = useNavigation<RootStackScreenProps>();

  const {
    user: { img, name },
  } = useUser();

  function handlePressProfile() {
    navigation.navigate("SettingsScreens", { screen: "ProfileMenu" });
  }

  return (
    <View className="flex-row justify-between items-center py-2 h-15">
      <View>
        <NotificationsIcon />
      </View>
      <View>
        <Text className="text-lg text-text-color">Olá, {name.first}!</Text>
      </View>
      <TouchableOpacity
        className="rounded-full overflow-hidden border-2 border-white"
        onPress={handlePressProfile}
      >
        <Image
          source={{
            uri: img.regular,
          }}
          className="w-10 h-10"
        />
      </TouchableOpacity>
    </View>
  );
}
