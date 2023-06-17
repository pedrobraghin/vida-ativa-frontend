import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  createAppointment,
  updateAppointment,
} from "../../../functions/appointments";
import { useUserData } from "../../../hooks/useUserData";
import { TextInput } from "../../../components/TextInput";
import { DatePicker } from "../../../components/DatePicker";
import { useParentParams } from "../../../hooks/useParentParams";
import { OutputAppointmentDTO } from "../../../@types/AppointmentTypes";
import FormErrorsContainer from "../../../components/FormErrorsContainer";
import { MedicationsScreenProps } from ".";

type ParentParams = {
  appointment?: OutputAppointmentDTO;
  isEditing?: boolean;
};

export function AddAppointmentScreen() {
  const navigation = useNavigation<MedicationsScreenProps>();
  const params = useParentParams<ParentParams>("MedicationsScreens");
  const isEditing = params?.isEditing;
  const appointment = params?.appointment;

  const [location, setLocation] = useState<string>(appointment?.location || "");
  const [doctor, setDoctor] = useState<string>(appointment?.doctor || "");
  const [date, setDate] = useState<Date>(
    new Date(appointment?.date || Date.now())
  );
  const [title, setTitle] = useState<string>(appointment?.title || "");
  const [description, setDescription] = useState<string>(
    appointment?.description || ""
  );
  const [errors, setErrors] = useState<string[] | null>(null);

  const { getAppointments } = useUserData();

  useEffect(() => {
    if (isEditing) {
      navigation.setOptions({
        title: "Editar dados da consulta",
      });
    }
  }, []);

  async function handleSaveAppointment() {
    setErrors(null);
    const errors: string[] = [];

    if (!title) {
      errors.push("É necessário informar um nome para a consulta!");
    }

    if (!location) {
      errors.push("É necessário informar a localização da consulta!");
    }

    if (!doctor) {
      errors.push("É necessário informar o nome do médico!");
    }

    if (!date) {
      errors.push("É necessário informar uma data para a consulta!");
    }

    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    if (isEditing) {
      try {
        await updateAppointment(appointment!.id, {
          location,
          doctor,
          date: date.toISOString(),
          title,
          description,
        });
        await getAppointments();
        navigation.navigate("index");
      } catch (e) {
        setErrors([
          "Ocorreu um erro ao editar os dados da consulta! Se o erro persistir contate o suporte do sistema.",
        ]);
      }
    } else {
      try {
        await createAppointment({
          location,
          doctor,
          date: date.toISOString(),
          title,
          description,
        });
        await getAppointments();
        navigation.goBack();
      } catch (e) {
        setErrors([
          "Ocorreu um erro ao adicionar uma consulta! Se o erro persistir contate o suporte do sistema.",
        ]);
      }
    }
  }

  return (
    <KeyboardAwareScrollView className="flex-1 bg-white px-5">
      <View className="mt-4">
        <View>
          <Text className="font-bold mb-2 text-lg text-25">Nome</Text>
          <TextInput
            placeholder="ex.: oftalmogologista"
            value={title}
            onChangeText={setTitle}
          />
        </View>
        <View>
          <Text className="font-bold mb-2 text-lg text-25">Local</Text>
          <TextInput
            placeholder="Local"
            value={location}
            onChangeText={setLocation}
          />
        </View>
        <View>
          <Text className="font-bold mb-2 text-lg text-25">Médico</Text>
          <TextInput
            placeholder="Médico"
            value={doctor}
            onChangeText={setDoctor}
          />
        </View>

        <View>
          <Text className="font-bold mb-2 text-lg text-25">
            Descrição (opcional)
          </Text>
          <TextInput
            placeholder="Descrição"
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <View className="flex-row justify-between items-center mt-4">
          <View className="flex-row items-center">
            <Text className="font-bold text-lg text-25 ">Data: </Text>
            <Text className="text-lg">{date.toLocaleDateString()}</Text>
          </View>
          <DatePicker onChange={setDate} />
        </View>
      </View>
      <View className="my-4">
        {errors && <FormErrorsContainer errors={errors} />}
      </View>
      <TouchableOpacity
        className="bg-main-color rounded-full py-4 mb-10"
        onPress={handleSaveAppointment}
      >
        <Text className="font-bold text-lg text-text-color text-center">
          Salvar
        </Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}
