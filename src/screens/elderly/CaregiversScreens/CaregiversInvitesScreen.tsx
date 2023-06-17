import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import UserSearchResult from "../../../components/UserSearchResult";

import { getUser } from "../../../functions/user";
import { Colors } from "../../../constants/Colors";
import { TextInput } from "../../../components/TextInput";
import { AccountTypes, SearchUserResult } from "../../../@types/UserType";
import { useUserData } from "../../../hooks/useUserData";
import UserSentRequest from "../../../components/UserSentRequest";
import { FriendshipRequestStatus } from "../../../@types/FriendsTypes";

export default function CaregiversInvitesScreen() {
  const navigation = useNavigation();
  const [caregiverEmail, setCaregiverEmail] = useState("");
  const [caregiver, setCaregiver] = useState<SearchUserResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [searched, setSearched] = useState<boolean>(false);
  const [isAlreadyFriends, setIsAlreadyFriends] = useState<boolean>(false);
  const {
    sentFriendRequests,
    getSentRequests,
    setSentFriendRequests,
    friendships,
  } = useUserData();

  useEffect(() => {
    getSentRequests();
    navigation.setOptions({
      headerTitleStyle: {
        color: Colors.MainColor,
      },
    });
  }, []);

  async function handleSearchCaregiver() {
    setSearched(true);
    setIsLoading(true);
    setIsFinished(false);

    const caregiver = await getUser(AccountTypes.CAREGIVER, caregiverEmail);
    const alreadyFriends = friendships.some((friendship) => {
      if (friendship.userOne) {
        return friendship.userOne.id === caregiver?.id;
      } else {
        return friendship.userTwo.id === caregiver?.id;
      }
    });
    setIsAlreadyFriends(alreadyFriends);
    setCaregiver(caregiver);
    setIsLoading(false);
    setIsFinished(true);
  }

  function cleanResults() {
    setSearched(false);
    setCaregiver(null);
    setIsFinished(false);
    setIsLoading(false);
  }

  function handleCancelFriendRequest(requestId: string) {
    setSentFriendRequests((prev) => {
      return prev.filter((request) => request.id !== requestId);
    });
  }

  return (
    <SafeAreaView className="flex-1 px-5 pt-5 bg-white">
      <View className="gap-y-2 mb-5">
        <Text className="font-bold text-base">Adicionar cuidador</Text>
        <TextInput
          placeholder="Digite o e-mail do cuidador"
          onChangeText={setCaregiverEmail}
          value={caregiverEmail}
          onSubmitEditing={handleSearchCaregiver}
          keyboardType="email-address"
        />
      </View>
      <View>
        <Text className="font-bold text-base">Resultados</Text>
        <View className="mt-2">
          {isLoading && (
            <ActivityIndicator color={Colors.MainColor} size={"large"} />
          )}
          {isFinished && !caregiver && <Text>Cuidador não encontrado.</Text>}
          {isFinished && caregiver && (
            <UserSearchResult
              {...caregiver}
              status={
                isAlreadyFriends ? FriendshipRequestStatus.ACCEPTED : undefined
              }
              cb={cleanResults}
            />
          )}
          {!searched && (
            <Text className="italic text-base">
              Pesquise pelo e-mail do cuidador para exibir resultados
            </Text>
          )}
        </View>
      </View>
      <View>
        <Text className="font-bold text-base mt-4">Solicitações enviadas</Text>
        <View>
          <View>
            {sentFriendRequests.length > 0 ? (
              <FlatList
                data={sentFriendRequests}
                keyExtractor={(request) => request.id}
                renderItem={({ item: request }) => {
                  return (
                    <UserSentRequest
                      requestId={request.id}
                      {...request.receiver}
                      key={request.id}
                      cb={handleCancelFriendRequest}
                    />
                  );
                }}
                ListHeaderComponent={() => <View className="mb-2" />}
                ItemSeparatorComponent={() => <View className="mb-4" />}
              />
            ) : (
              <View className="italic text-base">
                <Text>Nenhuma solicitação de amizade enviada</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
