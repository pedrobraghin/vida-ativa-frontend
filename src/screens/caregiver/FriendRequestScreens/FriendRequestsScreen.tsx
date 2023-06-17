import { Text, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { FriendRequestListItem } from "../../../components/FriendRequestListItem";
import { useUserData } from "../../../hooks/useUserData";

export default function FriendRequestsScreen() {
  const { getFriendRequests, friendRequests } = useUserData();

  useFocusEffect(
    useCallback(() => {
      getFriendRequests();
    }, [])
  );

  return (
    <SafeAreaView className="bg-white flex-1 px-5 pt-5">
      <Text className="text-main-color text-xl font-bold">
        Solicitações de conexão
      </Text>
      {friendRequests.length > 0 ? (
        <FlatList
          data={friendRequests}
          keyExtractor={(request) => request.id}
          renderItem={({ item }) => <FriendRequestListItem request={item} />}
          onEndReached={getFriendRequests}
          onEndReachedThreshold={0.1}
        />
      ) : (
        <View>
          <Text>Nenhuma solicitação de amizade.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
