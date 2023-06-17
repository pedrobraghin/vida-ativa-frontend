import { useCallback } from "react";
import { View, Image, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import HomeHeader from "../../../components/caregiver/HomeHeader";

import { AddReminder } from "../../../components/caregiver/AddReminder";
import { FriendsList } from "../../../components/caregiver/FriendsList";
import { useUserData } from "../../../hooks/useUserData";

export default function HomeScreen() {
  const { getFriendsList } = useUserData();

  useFocusEffect(
    useCallback(() => {
      getFriendsList();
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 bg-white pt-4 relative">
      <View className="absolute -z-50 left-0 top-0 w-screen">
        <Image
          source={require("../../../../assets/bg-wave.png")}
          className="w-full h-60"
        />
      </View>
      <View className="flex-1 px-5">
        <HomeHeader />
        <View className="my-5">
          <Text className="text-base text-text-color font-bold mb-2">
            Lembretes
          </Text>
          <AddReminder />
        </View>
        <View>
          <Text className="text-base font-bold mb-2 text-main-color">
            Idosos
          </Text>
          <FriendsList />
        </View>
      </View>
    </SafeAreaView>
  );
}
