import IoIcons from "@expo/vector-icons/Ionicons";
import FA5Icons from "@expo/vector-icons/FontAwesome5";

import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constants/Colors";
import { OutputContactDTO } from "../@types/ContactType";
import { RootStackScreenProps } from "../screens/elderly/RootNavigation";

interface ContactProps {
  contact: OutputContactDTO;
}

export default function Contact({ contact }: ContactProps) {
  const { name, img, phoneNumber } = contact;
  const navigation = useNavigation<RootStackScreenProps>();

  async function makePhoneCall() {
    try {
      Linking.openURL(`tel:${phoneNumber}`);
    } catch (err) {}
  }

  function handleViewContact() {
    navigation.navigate("EmergencyScreens", {
      screen: "EmergencyContact",
      contact,
    });
  }

  return (
    <TouchableOpacity
      className="flex-row items-center justify-between h-20 mb-2 rounded-md border-2 border-c8 shadow-25 shadow-lg px-4"
      onPress={handleViewContact}
    >
      <View className="w-16 mr-4 h-16 items-center justify-center rounded-full">
        {img ? (
          <Image
            source={{ uri: img }}
            style={{ width: 50, height: 50 }}
            className="rounded-full"
          />
        ) : (
          <IoIcons name="person" size={32} color={Colors.MainColor} />
        )}
      </View>
      <Text
        className="flex-1 text-start text-lg font-semibold"
        numberOfLines={1}
      >
        {name}
      </Text>
      <TouchableOpacity
        className="flex-row w-16 h-16 active:bg-slate-400 rounded-full justify-center items-center"
        onPress={makePhoneCall}
      >
        <FA5Icons name="phone-alt" size={32} color={Colors.MainColor} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
