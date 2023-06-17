import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import FAIcons from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import FormErrorsContainer from "../../../components/FormErrorsContainer";

import { Colors } from "../../../constants/Colors";
import { formatTime } from "../../../utils/formatTime";
import { RootStackScreenProps } from "../RootNavigation";
import { useUserData } from "../../../hooks/useUserData";
import { TextInput } from "../../../components/TextInput";
import { TimePicker } from "../../../components/TimePicker";
import {
  createMedication,
  updateMedication,
} from "../../../functions/medications";
import { useParentParams } from "../../../hooks/useParentParams";
import { OutputMedicationDTO } from "../../../@types/MedicationTypes";

type ParentParams = {
  medication?: OutputMedicationDTO;
  isEditing?: boolean;
};

export function AddMedicationScreen() {
  const navigation = useNavigation<RootStackScreenProps>();
  const params = useParentParams<ParentParams>("MedicationsScreens");
  const isEditing = params?.isEditing;
  const medication = params?.medication;

  const [errors, setErrors] = useState<string[] | null>(null);
  const [name, setName] = useState<string>(medication?.name || "");
  const [posology, setPosology] = useState<string>(medication?.posology || "");
  const [description, setDescription] = useState<string>(
    medication?.description || ""
  );
  const [type, setType] = useState<string>(medication?.type || "");
  const [time, setTime] = useState<Date>(
    new Date(medication?.time || Date.now())
  );
  const [photo, setPhoto] = useState<string | null>(medication?.img || null);

  const { getMedications } = useUserData();

  useEffect(() => {
    if (isEditing) {
      navigation.setOptions({
        title: "Editar remédio",
      });
    }
  }, []);

  async function handleAddMedication() {
    setErrors(null);
    const errors = [];

    if (!name.trim()) {
      errors.push("É necessário informar um nome para o medicamento!");
    }

    if (!posology.trim()) {
      errors.push("É necessário informar uma dose para o medicamento!");
    }

    if (!description.trim()) {
      errors.push("É necessário informar uma descrição para o medicamento!");
    }

    if (!type.trim()) {
      errors.push("É necessário informar um tipo para o medicamento!");
    }

    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    if (isEditing) {
      try {
        await updateMedication(medication!.id, {
          name,
          description,
          posology,
          type,
          time: time.toISOString(),
          img: photo ?? undefined,
        });
        await getMedications();
        navigation.navigate("index");
      } catch (err) {
        setErrors([
          "Ocorreu um erro ao adicionar o medicamento. Se o erro persistir contate o suporte do sistema.",
        ]);
      }
    } else {
      try {
        await createMedication({
          name,
          description,
          posology,
          type,
          time: time.toISOString(),
          img: photo ?? undefined,
        });
        await getMedications();
        navigation.goBack();
      } catch (err) {
        setErrors([
          "Ocorreu um erro ao adicionar o medicamento. Se o erro persistir contate o suporte do sistema.",
        ]);
      }
    }
  }

  function setMedicationTime(time: Date) {
    setTime(time);
  }

  async function handleSelectPhoto() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        base64: true,
        allowsEditing: true,
        quality: 1,

        selectionLimit: 1,
      });

      if (result.canceled) {
        return;
      }
      const uri = result.assets[0].uri;
      setPhoto(uri);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <KeyboardAwareScrollView className="flex-1 bg-white px-5">
      <View className="items-center max-w-[200px] self-center mt-10 border-2 border-main-color rounded-full w-auto relative">
        {photo ? (
          <Image
            source={{ uri: photo }}
            style={{
              width: 150,
              height: 150,
              borderRadius: 100,
            }}
          />
        ) : (
          <View className="w-[150px] h-[150px] justify-center items-center">
            <FAIcons name="camera" size={35} color={Colors.MainColor} />
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
        <View className="mt-4">
          <Text className="text-base font-bold mb-2 text-25">
            Nome do medicamento
          </Text>
          <TextInput
            placeholder="Nome do medicamento"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View className="mt-4">
          <Text className="text-base font-bold mb-2 text-25">Dose</Text>
          <TextInput
            placeholder="Dose do medicamento"
            value={posology}
            onChangeText={setPosology}
          />
        </View>
        <View className="mt-4">
          <Text className="text-base font-bold mb-2 text-25">Descrição</Text>
          <TextInput
            placeholder="Descrição do medicamento"
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <View className="mt-4">
          <Text className="text-base font-bold mb-2 text-25">
            Tipo de medicamento (capsula, comprimido, xarope, etc.)
          </Text>
          <TextInput
            placeholder="Tipo de medicamento"
            value={type}
            onChangeText={setType}
          />
        </View>
        <View className="mt-3">
          <View className="flex-row mb-4 items-center justify-between">
            <View className="flex-row">
              <Text className="text-lg font-bold text-25">Horário: </Text>
              <Text className="text-lg">{formatTime(time)}</Text>
            </View>
            <View className="ml-4">
              <TimePicker onChange={setMedicationTime} />
            </View>
          </View>
        </View>
      </View>

      <View>
        {errors && <FormErrorsContainer errors={errors} />}
        <TouchableOpacity
          onPress={handleAddMedication}
          className="bg-main-color rounded-full py-4 my-10"
        >
          <Text className="text-text-color text-center text-lg">Salvar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
