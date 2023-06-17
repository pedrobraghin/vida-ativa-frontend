import { Text, View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import FABAdd from "../../../components/FABAdd";
import Contact from "../../../components/Contact";

import { RootStackScreenProps } from "../RootNavigation";
import { useUserData } from "../../../hooks/useUserData";
import { useEffect } from "react";

export default function EmergencyScreen() {
  const rootNavigation = useNavigation<RootStackScreenProps>();
  const { contacts, getContacts } = useUserData();

  useEffect(() => {
    getContacts();
  }, []);

  function handleAddEmergencyContact() {
    rootNavigation.navigate("EmergencyScreens", {
      screen: "AddEmergencyContact",
    });
  }

  return (
    <SafeAreaView className="flex-1 bg-white items-center">
      {contacts.length > 0 ? (
        <FlatList
          className="w-full px-5 pt-4"
          data={contacts}
          keyExtractor={(contact) => contact.id}
          renderItem={({ item }) => <Contact contact={item} />}
        />
      ) : (
        <View className="flex-1 justify-center">
          <Text className="text-xl text-center italic">
            Você ainda não possui nenhum contato de emergência. Clique no botão
            com o símbolo de "+" para adicionar um novo contato de emergência
          </Text>
        </View>
      )}
      <FABAdd onPress={handleAddEmergencyContact} />
    </SafeAreaView>
  );
}
