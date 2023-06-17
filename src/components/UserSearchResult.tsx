import IoIcons from "@expo/vector-icons/Ionicons";

import { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { Colors } from "../constants/Colors";
import { useUserData } from "../hooks/useUserData";
import { sendFriendRequest } from "../functions/friends";
import { FriendshipRequestStatus } from "../@types/FriendsTypes";

interface UserSearchResultProps {
  id: string;
  fullName: string;
  email: string;
  img?: {
    regular: string;
  };
  status?: FriendshipRequestStatus;
  cb?: () => void;
}

export default function UserSearchResult({
  id,
  email,
  fullName,
  img,
  status,
  cb,
}: UserSearchResultProps) {
  const [message, setMessage] = useState("Adicionar");
  const { getSentRequests } = useUserData();

  async function handleSendFriendRequest() {
    await sendFriendRequest(id);
    setMessage("Enviado");
    await getSentRequests();
    if (cb) {
      cb();
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
      <Text>
        {status !== undefined &&
          (status === FriendshipRequestStatus.ACCEPTED ? (
            <Text className="text-center italic">Amigos</Text>
          ) : (
            <Text className="text-center italic">Enviado</Text>
          ))}
      </Text>
      {status === undefined && (
        <TouchableOpacity
          className=" p-2 rounded-md bg-main-color"
          onPress={handleSendFriendRequest}
        >
          <Text className="text-text-color text-center">{message}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
