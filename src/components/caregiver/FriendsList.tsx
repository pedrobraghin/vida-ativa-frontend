import { useEffect } from "react";
import { View, FlatList, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackScreenProps } from "../../screens/caregiver/RootNavigation";

import FriendListItem from "./FriendListItem";
import { useUserData } from "../../hooks/useUserData";
import { FriendshipType } from "../../@types/FriendsTypes";
import { getFriendships } from "../../functions/friends";

export function FriendsList() {
  const { friendships: friendsList, setFriendsList } = useUserData();
  const navigation = useNavigation<RootStackScreenProps>();

  async function getFriendsList() {
    const friends = await getFriendships();
    setFriendsList(friends);
  }

  useEffect(() => {
    getFriendsList();
  }, []);

  function handleOnPress(friendship: FriendshipType) {
    const user = friendship.userOne ? friendship.userOne : friendship.userTwo;
    navigation.navigate("ElderlyScreens", {
      screen: "ElderlyScreens",
      id: user.id,
      fullName: user.fullName,
      friendshipId: friendship.id,
    });
  }

  return (
    <View>
      {friendsList.length > 0 ? (
        <FlatList
          data={friendsList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FriendListItem friendship={item} onPress={handleOnPress} />
          )}
        />
      ) : (
        <View className="border-2  border-c8 p-4 rounded-md">
          <Text className="text-center">
            Você ainda não cuida de nenhum idoso.
          </Text>
        </View>
      )}
    </View>
  );
}
