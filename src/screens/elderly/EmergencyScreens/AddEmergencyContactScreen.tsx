import * as ImagePicker from "expo-image-picker";
import FAIcons from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import FormErrorsContainer from "../../../components/FormErrorsContainer";

import { EmergencyScreenProps } from ".";
import { Colors } from "../../../constants/Colors";
import { useUserData } from "../../../hooks/useUserData";
import { TextInput } from "../../../components/TextInput";
import { OutputContactDTO } from "../../../@types/ContactType";
import { useParentParams } from "../../../hooks/useParentParams";
import { createContact, updateContact } from "../../../functions/contacts";

type ParentParams = {
  contact?: OutputContactDTO;
  isEditing?: boolean;
};

export default function AddEmergencyContactScreen() {
  const params = useParentParams<ParentParams>("EmergencyScreens");
  const isEditing = params?.isEditing;
  const contact = params?.contact;

  const navigation = useNavigation<EmergencyScreenProps>();
  const [photo, setPhoto] = useState<string | null>(contact?.img || null);
  const [name, setName] = useState<string>(contact?.name || "");
  const [phoneNumber, setPhoneNumber] = useState<string>(
    contact?.phoneNumber || ""
  );
  const [errors, setErrors] = useState<string[] | null>(null);
  const { getContacts } = useUserData();

  useEffect(() => {
    if (isEditing) {
      navigation.setOptions({
        title: "Editar contato de emergência",
      });
    }
  }, []);

  async function handleSelectPhoto() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        base64: true,
        allowsEditing: true,
        quality: 1,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        selectionLimit: 1,
      });

      if (result.canceled) {
        return;
      }
      result.assets[0];
      const uri = result.assets[0].uri;
      setPhoto(uri);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleAddEmergencyContact() {
    setErrors(null);
    const errors = [];
    if (!name.trim()) {
      errors.push("É necessário informar um nome para o contato!");
    }

    if (!phoneNumber.trim()) {
      errors.push(
        "É necessário informar um número de telefone para o contato!"
      );
    }

    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    if (isEditing) {
      try {
        await updateContact(contact!.id, {
          name,
          phoneNumber,
          img: photo ? photo : undefined,
        });
        await getContacts();

        navigation.navigate("index");
      } catch (e) {
        setErrors([
          "Erro ao editar contato de emergência! Se o erro persistir contate o suporte do sistema.",
        ]);
        return;
      }
    } else {
      try {
        await createContact({
          name,
          phoneNumber,
          img: photo ? photo : undefined,
        });
        await getContacts();
        navigation.goBack();
      } catch (e) {
        setErrors([
          "Erro ao cadastrar contato de emergência! Se o erro persistir contate o suporte do sistema.",
        ]);
        return;
      }
    }
  }

  return (
    <KeyboardAwareScrollView className="flex-1 bg-white px-5">
      <View className="items-center max-w-[200px] self-center mt-10 bg-main-color rounded-full w-auto relative">
        {photo ? (
          <Image
            source={{ uri: photo }}
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
            }}
          />
        ) : (
          <View className="w-[200px] h-[200px] justify-center items-center">
            <FAIcons name="camera" size={60} color={Colors.White} />
          </View>
        )}
        <TouchableOpacity
          className="absolute border-2 border-c8 -right-1 top-5 bg-white p-2 rounded-full"
          onPress={handleSelectPhoto}
        >
          <MaterialIcons name="edit" size={20} />
        </TouchableOpacity>
      </View>
      <View>
        <Text className="text-lg font-bold text-25 mb-2">Nome</Text>
        <TextInput placeholder="Nome" value={name} onChangeText={setName} />
      </View>
      <View className="mt-2">
        <Text className="text-lg font-bold text-25 mb-2">Telefone</Text>
        <TextInput
          placeholder="Telefone"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          onEndEditing={handleAddEmergencyContact}
        />
      </View>
      <TouchableOpacity
        onPress={handleAddEmergencyContact}
        className="bg-main-color rounded-full justify-center items-center py-4 my-6"
      >
        <Text className="text-text-color font-semibold">Salvar</Text>
      </TouchableOpacity>
      {errors && <FormErrorsContainer errors={errors} />}
    </KeyboardAwareScrollView>
  );
}
