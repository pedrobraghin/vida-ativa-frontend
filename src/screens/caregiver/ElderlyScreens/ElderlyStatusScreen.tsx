import IoIcons from "@expo/vector-icons/Ionicons";
import MCIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";

import Modal from "../../../components/Modal";
import { Colors } from "../../../constants/Colors";
import { RootStackScreenProps } from "../RootNavigation";
import { useUserData } from "../../../hooks/useUserData";
import { ElderlyInfos } from "../../../@types/ElderlyInfos";
import { ActivityIndicator } from "@react-native-material/core";
import { useParentParams } from "../../../hooks/useParentParams";
import { deleteFriendship, getElderlyData } from "../../../functions/friends";
import { formatTime } from "../../../utils/formatTime";

type ParentParams = {
  id: string;
  friendshipId: string;
  fullName: string;
};

export default function ElderlyStatusScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [elderlyInfos, setElderlyInfos] = useState<ElderlyInfos>(
    {} as ElderlyInfos
  );
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation<RootStackScreenProps>();
  const params = useParentParams<ParentParams>("ElderlyScreens");
  const id = params?.id as string;
  const fullName = params?.fullName as string;
  const friendshipId = params?.friendshipId as string;

  const { appointments, contacts, events, medications, elderly } = elderlyInfos;
  const { getFriendsList } = useUserData();

  useEffect(() => {
    navigation.setOptions({
      title: fullName,
      headerTitleStyle: {
        color: Colors.MainColor,
      },
    });
    getElderlyInfos();
  }, []);

  async function getElderlyInfos() {
    const infos = await getElderlyData(id!);
    if (!infos) return navigation.goBack();

    setElderlyInfos(infos);
    setIsLoading(false);
  }

  async function handleDeleteFriendship() {
    await deleteFriendship(friendshipId);
    await getFriendsList();
    navigation.goBack();
  }

  function openModal() {
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
  }

  if (isLoading) {
    return <ActivityIndicator size={32} color={Colors.MainColor} />;
  }

  return (
    <ScrollView className="bg-white px-6">
      <View>
        <View className="mb-5">
          <View>
            {elderly.img ? (
              <View className="items-center my-5">
                <Image
                  source={{
                    uri: elderly.img.regular,
                  }}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 100,
                  }}
                />
              </View>
            ) : (
              <View className="items-center justify-center my-5">
                <IoIcons
                  name="person"
                  color={Colors.MainColor}
                  style={{
                    backgroundColor: "transparent",
                    borderRadius: 10,
                    padding: 8,
                  }}
                  size={128}
                />
              </View>
            )}
            <Text className="text-lg font-semibold text-main-color">
              Informações básicas
            </Text>
            <Text className="text-lg">Nome: {fullName}</Text>
            <Text className="text-lg">Telefone: {elderly.phoneNumber}</Text>
            <Text className="text-lg">Endereço: {elderly.address}</Text>
          </View>
        </View>

        <View className="mb-5">
          <Text className="text-lg font-semibold text-main-color mb-2">
            Medicamentos
          </Text>
          <View>
            {medications.length > 0 ? (
              medications.map((medication) => (
                <View
                  key={medication.id}
                  className="border-2 border-c8 rounded-md p-4 flex-row items-center"
                >
                  <View className="mr-4">
                    {medication.img ? (
                      <Image
                        source={{
                          uri: medication.img,
                        }}
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 100,
                        }}
                      />
                    ) : (
                      <View>
                        <MCIcons
                          name="pill"
                          color={Colors.MainColor}
                          style={{
                            backgroundColor: "transparent",
                            borderRadius: 10,
                            padding: 6,
                          }}
                          size={32}
                        />
                      </View>
                    )}
                  </View>
                  <View>
                    <View className="flex-row">
                      <Text className="text-25 font-semibold">Nome: </Text>
                      <Text>{medication.name}</Text>
                    </View>
                    <View className="flex-row">
                      <Text className="text-25 font-semibold">Posologia: </Text>
                      <Text>{medication.posology}</Text>
                    </View>
                    <View className="flex-row">
                      <Text className="text-25 font-semibold">Horário: </Text>
                      <Text>{formatTime(new Date(medication.time))}</Text>
                    </View>
                    <View className="flex-row">
                      <Text className="text-25 font-semibold">Tipo: </Text>
                      <Text>{medication.type}</Text>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <View>
                <Text className="text-base italic">
                  Nenhum medicamento cadastrado.
                </Text>
              </View>
            )}
          </View>
        </View>

        <View className="mb-5">
          <Text className="text-lg font-semibold text-main-color">
            Consultas médicas
          </Text>
          <View>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <View
                  key={appointment.id}
                  className="border-2 border-c8 rounded-md p-4 mt-2"
                >
                  <View className="flex-row items-center">
                    <Text className="text-25 font-semibold">Nome: </Text>
                    <Text className="text-25">{appointment.title}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-25 font-semibold">Doutor(a): </Text>
                    <Text className="text-25">{appointment.doctor}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-25 font-semibold">Localização: </Text>
                    <Text className="text-25">{appointment.location}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-25 font-semibold">Data: </Text>
                    <Text className="text-25">
                      {new Date(appointment.date).toLocaleDateString()}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-25 font-semibold">Descrição: </Text>
                    <Text className="text-25">
                      {appointment.description || "Não informada"}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <View>
                <Text className="text-base italic">
                  Nenhuma consulta médica cadastrada.
                </Text>
              </View>
            )}
          </View>
        </View>

        <View className="mb-5">
          <Text className="text-lg font-semibold text-main-color">
            Contatos de emergência
          </Text>
          <View>
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <View
                  key={contact.id}
                  className="border-2 border-c8 rounded-md p-4 flex-row items-center mt-2"
                >
                  <View className="mr-4">
                    {contact.img ? (
                      <Image
                        source={{
                          uri: contact.img,
                        }}
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 100,
                        }}
                      />
                    ) : (
                      <IoIcons
                        name="person"
                        size={32}
                        color={Colors.MainColor}
                      />
                    )}
                  </View>
                  <View>
                    <View className="flex-row">
                      <Text className="text-25 font-semibold">Nome: </Text>
                      <Text>{contact.name}</Text>
                    </View>
                    <View className="flex-row">
                      <Text className="text-25 font-semibold">Telefone: </Text>
                      <Text>{contact.phoneNumber}</Text>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <Text className="text-base italic">
                Nenhum contato cadastrado.
              </Text>
            )}
          </View>
        </View>

        <View className="mb-5">
          <Text className="text-lg font-semibold text-main-color">
            Eventos na agenda
          </Text>
          <View>
            {events.length > 0 ? (
              events.map((event) => (
                <View
                  key={event.id}
                  className="border-2 border-c8 rounded-md p-4 mt-2"
                >
                  <View className="flex-row items-center">
                    <Text className="text-25 font-semibold">Nome: </Text>
                    <Text className="text-25">{event.title}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-25 font-semibold">Data: </Text>
                    <Text className="text-25">
                      {new Date(event.date).toLocaleDateString()}
                    </Text>
                  </View>

                  <View className="flex-row items-center">
                    <Text className="text-25 font-semibold">Localização: </Text>
                    <Text className="text-25">
                      {event.location || "Não informada"}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <View>
                <Text className="text-base italic">
                  Nenhum evento cadastrado.
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <View className="my-4">
        <TouchableOpacity
          className="bg-main-color p-4 rounded-lg self-end w-full items-center"
          onPress={openModal}
        >
          <Text className="text-text-color">Desfazer amizade</Text>
        </TouchableOpacity>

        <Modal
          onConfirm={handleDeleteFriendship}
          onCancel={closeModal}
          confirmText="Excluir"
          cancelText="Cancelar"
          isModalVisible={modalVisible}
        >
          <View className="flex-row items-center flex-wrap">
            <Text className="text-lg">
              Tem certeza que deseja desfazer amizade com
              {<Text className="font-bold"> {fullName}</Text>}?
            </Text>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}
