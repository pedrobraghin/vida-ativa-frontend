import * as ImagePicker from "expo-image-picker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import IoIcons from "@expo/vector-icons/Ionicons";

import { useState } from "react";
import { TextInput } from "@react-native-material/core";
import { View, Image, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useUser } from "../../../hooks/useUser";
import { Colors } from "../../../constants/Colors";

export default function ProfileScreen() {
  const [photo, setPhoto] = useState<string | null>(null);

  const { user, setUser } = useUser();
  const { img, email, fullName } = user;

  async function handleSelectPhoto() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        base64: true,
        allowsEditing: true,
        quality: 1,

        selectionLimit: 1,
      });

      if (result.canceled) {
        return;
      }

      const uri = result.assets[0].uri;

      setPhoto(uri);
      setUser({
        img: {
          regular: uri,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <KeyboardAwareScrollView>
      <View className="flex-1 bg-white px-10 items-center gap-y-5">
        <View className="items-center max-w-[200px] rounded-full w-auto relative">
          {img ? (
            <Image
              source={{ uri: photo ?? img.regular }}
              style={{
                width: 200,
                height: 200,
                borderRadius: 100,
              }}
            />
          ) : (
            <View className="rounded-full p-4 border-2 border-main-color">
              <IoIcons
                name="person"
                color={Colors.MainColor}
                style={{
                  backgroundColor: "transparent",
                  borderRadius: 10,
                  padding: 6,
                }}
                size={128}
              />
            </View>
          )}
          <TouchableOpacity
            className="absolute border-2 border-c8 -right-1 top-5 bg-white p-2 rounded-full"
            onPress={handleSelectPhoto}
          >
            <MaterialIcons name="edit" size={20} />
          </TouchableOpacity>
        </View>
        <View className="w-full gap-y-5">
          <View className="flex-row gap-x-2 items-center">
            <TextInput
              value={email}
              variant="outlined"
              label="E-mail"
              style={{ flex: 1, opacity: 0.6 }}
              editable={false}
              color={Colors.MainColor}
            />
          </View>
          <View className="flex-row gap-x-2 items-center">
            <TextInput
              value={fullName}
              variant="outlined"
              label="Nome"
              color={Colors.MainColor}
              style={{ flex: 1, opacity: 0.6 }}
              editable={false}
            />
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
