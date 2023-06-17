import IoIcons from "@expo/vector-icons/Ionicons";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { Colors } from "../constants/Colors";
import { cancelFriendRequest } from "../functions/friends";

interface UserSentRequestProps {
  requestId: string;
  fullName: string;
  email: string;
  img?: {
    regular: string;
  };
  cb?: (requestId: string) => void;
}

export default function UserSentRequest({
  requestId,
  email,
  fullName,
  img,
  cb,
}: UserSentRequestProps) {
  async function handleCancelFriendRequest() {
    await cancelFriendRequest(requestId);

    if (cb) {
      cb(requestId);
    }
  }

  return (
    <View className="flex-row  items-center border-2 border-c8 rounded-md p-2">
      <View>
        {img ? (
          <Image
            source={{ uri: img?.regular }}
            className="rounded-full w-12 h-12"
          />
        ) : (
          <IoIcons name="person" size={32} color={Colors.Black_25} />
        )}
      </View>
      <View className="flex-1 ml-4">
        <Text className="text-base font-semibold text-25" numberOfLines={1}>
          {fullName}
        </Text>
        <Text numberOfLines={1}>{email}</Text>
      </View>

      <TouchableOpacity
        className=" p-2 rounded-md bg-main-color"
        onPress={handleCancelFriendRequest}
      >
        <Text className="text-text-color text-center">Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}
