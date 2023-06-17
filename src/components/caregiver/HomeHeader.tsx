import { useNavigation } from "@react-navigation/native";
import { Image, Text, View, TouchableOpacity } from "react-native";
import IoIcons from "@expo/vector-icons/Ionicons";
import { useUser } from "../../hooks/useUser";
import NotificationsIcon from "./NotificationsIcon";
import { RootStackScreenProps } from "../../screens/caregiver/RootNavigation";
import { Colors } from "../../constants/Colors";

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
        {img ? (
          <Image
            source={{ uri: img.regular }}
            style={{
              width: 44,
              height: 44,
              borderRadius: 100,
            }}
          />
        ) : (
          <View className="rounded-full p-4 border-2 border-main-color">
            <IoIcons
              name="person"
              color={Colors.White}
              style={{
                backgroundColor: "transparent",
                borderRadius: 10,
                padding: 2,
              }}
              size={24}
            />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
