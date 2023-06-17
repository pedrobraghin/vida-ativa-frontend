import FA5Icons from "@expo/vector-icons/FontAwesome5";

import { useEffect } from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import FABAdd from "../../../components/FABAdd";
import FriendListItem from "../../../components/caregiver/FriendListItem";

import { useUserData } from "../../../hooks/useUserData";
import { FriendshipType } from "../../../@types/FriendsTypes";
import { RootStackScreenProps } from "../RootNavigation";

import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function CaregiversScreen() {
  const navigation = useNavigation<RootStackScreenProps>();
  const { friendships, getFriendsList, getFriendRequests } = useUserData();

  useFocusEffect(
    useCallback(() => {
      getFriendsList();
      getFriendRequests();
    }, [])
  );

  useEffect(() => {
    getFriendsList();
    getFriendRequests();
  }, []);

  function handleCaregiversRequests() {
    navigation.navigate("CaregiversScreens", { screen: "CaregiversInvites" });
  }

  function handleViewCaregiver(friendship: FriendshipType) {
    const user = friendship.userOne ? friendship.userOne : friendship.userTwo;

    navigation.navigate("CaregiversScreens", {
      screen: "Caregiver",
      caregiverId: user.id,
      friendshipId: friendship.id,
      friendshipDate: friendship.createdAt,
    });
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-5 py-5 flex-1">
        {friendships.length > 0 ? (
          <FlatList
            data={friendships}
            renderItem={({ item: friendship }) => (
              <FriendListItem
                key={friendship.id}
                friendship={friendship}
                onPress={() => handleViewCaregiver(friendship)}
              />
            )}
            keyExtractor={(friendship) => friendship.id}
          />
        ) : (
          <View className="flex-1 justify-center">
            <Text className="text-xl text-center italic">
              Você ainda não possui nenhum cuidador.
            </Text>

            <TouchableOpacity
              onPress={handleCaregiversRequests}
              className="bg-main-color rounded-md py-3 px-4 my-2"
            >
              <Text className="text-text-color text-center">
                Adicionar cuidador
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <FABAdd
        onPress={handleCaregiversRequests}
        children={<FA5Icons name="user-friends" color="#fff" size={24} />}
      />
    </SafeAreaView>
  );
}
