import { formatTime } from "../utils/formatTime";
import { capitalize } from "../utils/stringUtils";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { OutputUserEventsTypeDTO } from "../@types/EventsTypes";
import { RootStackScreenProps } from "../screens/elderly/RootNavigation";

interface EventListItemProps {
  event: OutputUserEventsTypeDTO;
}

export default function EventListItem({ event }: EventListItemProps) {
  const navigation = useNavigation<RootStackScreenProps>();

  const eventTime = formatTime(new Date(event.date));
  const eventDay = new Date(event.date)
    .toLocaleDateString("pt-BR", {
      weekday: "long",
    })
    .split(",")[0];

  const eventDate = new Date(event.date).getDate();

  function handleViewEvent() {
    navigation.navigate("CalendarScreens", { screen: "Event", event });
  }

  return (
    <TouchableOpacity onPress={handleViewEvent}>
      <View className="flex-row border-2 border-main-color rounded-md min-h-[80px]">
        <View className="mr-5 justify-center items-center pr-3 border-r-2 border-text-color py-2 bg-main-color pl-4 min-w-[115px]">
          <Text className="font-semibold text-xl text-text-color">
            {eventDate}
          </Text>
          <Text className="text-text-color">{capitalize(eventDay)}</Text>
        </View>
        <View className="justify-center items-center flex-1 pr-4">
          <Text className="font-semibold text-lg text-25">{event.title}</Text>
          <Text className="text-lg text-25">{eventTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
