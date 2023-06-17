import { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import FABAdd from "../../../components/FABAdd";
import Calendar from "../../../components/Calendar";
import EventListItem from "../../../components/EventListItem";

import { CalendarScreenProps } from ".";
import { useUserData } from "../../../hooks/useUserData";

export default function CalendarScreen() {
  const navigation = useNavigation<CalendarScreenProps>();
  const { events, getEvents } = useUserData();

  useEffect(() => {
    getEvents();
  }, []);

  function handleAddEvent() {
    navigation.navigate("CreateEvent", { screen: "CreateEvent" });
  }

  return (
    <View>
      <ScrollView>
        <View className="flex-1 px-5 pt-5 bg-white relative min-h-screen">
          <View>
            <Calendar events={events} />
          </View>
          <View className="my-5">
            {events.length > 0 ? (
              events.map((event) => {
                return (
                  <View key={event.id} className="mb-4">
                    <EventListItem event={event} />
                  </View>
                );
              })
            ) : (
              <View className="mt-5">
                <Text className="text-center italic text-lg">
                  Você ainda não possui nenhum evento. Clique no botão com
                  símbolo de "+" para adicionar um novo evento à sua agenda.
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <FABAdd onPress={handleAddEvent} />
    </View>
  );
}
