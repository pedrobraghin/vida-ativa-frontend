import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";

import IoIcons from "@expo/vector-icons/Ionicons";
import FA5Icons from "@expo/vector-icons/FontAwesome5";
import MCIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { Colors } from "../../../constants/Colors";
import { useParentParams } from "../../../hooks/useParentParams";
import { OutputContactDTO } from "../../../@types/ContactType";
import { RootStackScreenProps } from "../RootNavigation";
import { deleteContact } from "../../../functions/contacts";
import { useUserData } from "../../../hooks/useUserData";
import Modal from "../../../components/Modal";

type ParentParams = {
  contact: OutputContactDTO;
};

export default function EmergencyContactScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation<RootStackScreenProps>();
  const params = useParentParams<ParentParams>("EmergencyScreens");
  const { getContacts } = useUserData();

  const {
    contact: { name, phoneNumber, img, id },
  } = params!;

  useEffect(() => {
    navigation.setOptions({
      title: `${name}`,
    });
  }, []);

  async function makePhoneCall() {
    try {
      Linking.openURL(`tel:${phoneNumber}`);
    } catch (err) {}
  }

  async function handleDeleteContact() {
    try {
      await deleteContact(id);
      await getContacts();
      navigation.goBack();
    } catch (err) {}
  }

  function openModal() {
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
  }

  function onConfirmModal() {
    closeModal();
    handleDeleteContact();
  }

  async function handleEditContact() {
    navigation.navigate("EmergencyScreens", {
      screen: "AddEmergencyContact",
      contact: params!.contact,
      isEditing: true,
    });
  }

  return (
    <View className="flex-1 px-6 py-5 bg-white justify-between">
      <View>
        <View className="items-center mb-10 mt-10">
          {img ? (
            <Image
              source={{ uri: img }}
              style={{ width: 128, height: 128 }}
              className="rounded-full"
            />
          ) : (
            <IoIcons name="person" size={128} color={Colors.MainColor} />
          )}
        </View>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Text className="font-bold text-xl">Nome: </Text>
            <Text className="text-xl w-56" numberOfLines={1}>
              {name}
            </Text>
          </View>
          <TouchableOpacity
            className="active:bg-slate-400 rounded-full w-12 h-12  items-center justify-center "
            onPress={makePhoneCall}
          >
            <FA5Icons name="phone-alt" size={32} color={Colors.MainColor} />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center">
          <Text className="font-bold text-xl">Telefone: </Text>
          <Text className="text-xl">{phoneNumber}</Text>
        </View>
      </View>
      <View className="flex-row items-end justify-between h-16">
        <TouchableOpacity className="items-center w-32" onPress={openModal}>
          <MCIcons name="delete" size={40} color="red" />
          <Text className="mt-1 text-base">Excluir contato</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center w-32"
          onPress={handleEditContact}
        >
          <FA5Icons name="edit" size={32} color={Colors.MainColor} />
          <Text className="mt-2 text-base">Editar contato</Text>
        </TouchableOpacity>
      </View>
      <Modal
        onConfirm={onConfirmModal}
        onCancel={closeModal}
        confirmText="Excluir"
        cancelText="Cancelar"
        isModalVisible={modalVisible}
      >
        <View className="flex-row items-center flex-wrap">
          <Text className="text-lg">
            Tem certeza que deseja excluir o contato de
            {<Text className="font-bold"> {name}</Text>}?
          </Text>
        </View>
      </Modal>
    </View>
  );
}
