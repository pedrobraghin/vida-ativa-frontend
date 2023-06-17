import { View, Text, Image, TouchableOpacity } from "react-native";
import { FriendRequestType } from "../@types/FriendsTypes";
import { formatTime } from "../utils/formatTime";
import {
  acceptFriendRequest,
  declineFriendRequest,
} from "../functions/friends";
import { useUserData } from "../hooks/useUserData";
import { useState } from "react";

interface FriendRequestListItemProps {
  request: FriendRequestType;
}

interface ButtonProps {
  onPress: () => void;
  children?: React.ReactNode;
  secondary?: boolean;
}

function Button({ onPress, children, secondary }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`bg-${
        secondary ? "c8" : "main-color"
      } px-3 py-2 rounded-md w-full`}
    >
      {children}
    </TouchableOpacity>
  );
}

export function FriendRequestListItem({ request }: FriendRequestListItemProps) {
  const [isRequestAnswered, setIsRequestAnswered] = useState(false);
  const [message, setMessage] = useState<string>();

  const { getFriendRequests } = useUserData();

  async function handleAcceptRequest() {
    await acceptFriendRequest(request.id);
    await getFriendRequests();
    setIsRequestAnswered(true);
    setMessage("Solicitação aceita.");
  }

  async function handleDeclineRequest() {
    await declineFriendRequest(request.id);
    await getFriendRequests();
    setIsRequestAnswered(true);
    setMessage("Solicitação recusada.");
  }

  return (
    <View className="my-4 flex-row">
      <View className="flex-row gap-x-6 items-center">
        <Image
          source={{
            uri: request.sender.img.regular,
          }}
          className="w-16 h-16 rounded-full"
        />
        <View>
          <View>
            <Text className="font-semibold text-base">
              {request.sender.fullName}
            </Text>
            <Text>{formatTime(new Date(request.createdAt))}</Text>
          </View>
          {isRequestAnswered ? (
            <Text>{message}</Text>
          ) : (
            <View className="justify-start flex-row items-center mt-2">
              <View className="w-24">
                <Button onPress={handleAcceptRequest}>
                  <Text className="text-text-color text-center">Confirmar</Text>
                </Button>
              </View>
              <View className="ml-4 w-24">
                <Button onPress={handleDeclineRequest} secondary>
                  <Text className="text-text-color text-center">Recusar</Text>
                </Button>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
