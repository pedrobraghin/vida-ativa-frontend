import { Image, Text, View, TouchableOpacity } from "react-native";
import { FriendshipType } from "../../@types/FriendsTypes";

interface FriendListItemProps {
  onPress: (friendship: FriendshipType) => void;
  friendship: FriendshipType;
}

export default function FriendListItem({
  friendship,
  onPress,
}: FriendListItemProps) {
  const user = friendship.userOne ? friendship.userOne : friendship.userTwo;

  const { fullName, img } = user;

  function handleOnPress() {
    onPress(friendship);
  }

  return (
    <View className="border-c8 border-2 shadow-md rounded-md mb-2 overflow-hidden">
      <TouchableOpacity
        className="active:bg-zinc-200 bg-white"
        onPress={handleOnPress}
      >
        <View className="flex-row items-center gap-x-4 px-3 py-4">
          <View className="rounded-full overflow-hidden">
            <Image source={{ uri: img.regular }} className="w-10 h-10" />
          </View>
          <Text className="font-semibold">{fullName}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
