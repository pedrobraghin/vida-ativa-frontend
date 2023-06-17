import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, ScrollView, View, TouchableOpacity } from "react-native";

import FormErrorsContainer from "../../../components/FormErrorsContainer";

import { formatTime } from "../../../utils/formatTime";
import { createEvent, updateEvent } from "../../../functions/events";
import { useUserData } from "../../../hooks/useUserData";
import { TextInput } from "../../../components/TextInput";
import { DatePicker } from "../../../components/DatePicker";
import { TimePicker } from "../../../components/TimePicker";
import { OutputUserEventsTypeDTO } from "../../../@types/EventsTypes";
import { useParentParams } from "../../../hooks/useParentParams";
import { RootStackScreenProps } from "../RootNavigation";

type ParentParams = {
  event: OutputUserEventsTypeDTO;
  isEditing?: boolean;
};

export default function CreateEventScreen() {
  const navigation = useNavigation<RootStackScreenProps>();
  const params = useParentParams<ParentParams>("CalendarScreens");
  const isEditing = params?.isEditing;
  const event = isEditing ? params?.event : null;

  const [date, setDate] = useState(new Date(event?.date || Date.now()));
  const [time, setTime] = useState(new Date(event?.date || Date.now()));
  const [eventTitle, setEventTitle] = useState<string>(event?.title || "");
  const [eventLocation, setEventLocation] = useState<string>(
    event?.location || ""
  );
  const [errors, setErrors] = useState<string[] | null>(null);
  const { getEvents } = useUserData();

  function handleDateChange(date: Date) {
    setDate(date);
  }

  function handleTimeChange(time: Date) {
    setTime(time);
  }

  async function handleCreateEvent() {
    setErrors(null);

    if (!eventTitle.trim()) {
      return setErrors(["É necessário informar um nome para o evento!"]);
    }

    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes(),
      time.getSeconds()
    );

    const eventDate = newDate.toISOString();

    if (isEditing) {
      await updateEvent(event!.id, {
        date: eventDate,
        title: eventTitle,
        location: eventLocation,
      });
    } else {
      await createEvent({
        date: eventDate,
        title: eventTitle,
        location: eventLocation,
      });
    }

    await getEvents();
    navigation.navigate("CalendarScreens", { screen: "index" });
  }

  return (
    <ScrollView className="flex-1 bg-white px-5">
      <View className="my-5">
        {errors && <FormErrorsContainer errors={errors} />}
      </View>
      <View className="mb-5">
        <View className="gap-y-2">
          <Text
            accessibilityLabel="Nome do evento"
            className="font-bold text-lg text-25"
          >
            Evento
          </Text>
          <TextInput
            placeholder="Nome do evento"
            value={eventTitle}
            onChangeText={setEventTitle}
          />
        </View>
        <View className="gap-y-2 mt-2">
          <Text
            accessibilityLabel="Local do evento"
            className="font-bold text-lg text-25"
          >
            Local (opcional)
          </Text>
          <TextInput
            placeholder="Local do evento"
            value={eventLocation}
            onChangeText={setEventLocation}
          />
        </View>
      </View>

      <View className="gap-y-4">
        <View className="gap-4">
          <Text
            className="font-bold text-xl"
            accessibilityLabel="Selecionar data do evento"
          >
            Selecionar data
          </Text>
          <View className="flex-row justify-between items-center">
            <Text className="text-lg">Data: {date.toLocaleDateString()}</Text>
            <View>
              <DatePicker onChange={handleDateChange} />
            </View>
          </View>
        </View>

        <View className="gap-4 mb-5">
          <Text
            className="font-bold text-xl"
            accessibilityLabel="Selecionar horário do evento"
          >
            Selecionar horário
          </Text>
          <View className="flex-row justify-between items-center">
            <Text className="text-lg">Horário: {formatTime(time)}</Text>
            <View>
              <TimePicker onChange={handleTimeChange} />
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity
        className="self-end w-full bg-main-color px-4 py-4 rounded-full justify-center items-center"
        onPress={handleCreateEvent}
      >
        <Text className="text-text-color text-lg">Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
