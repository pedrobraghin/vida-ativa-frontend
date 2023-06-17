import { Link, useNavigation } from "@react-navigation/native";
import { Text, View, Image, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthScreenProps } from "./Models";
import { Button } from "../components/Button";

export default function WelcomeScreen() {
  const navigate = useNavigation<AuthScreenProps>();

  return (
    <SafeAreaView className="flex-1 items-center justify-between py-10">
      <StatusBar barStyle="default" />
      <Text className="text-lg text-main-color">Vida Ativa</Text>
      <Image source={require("../../assets/home-img.png")} />
      <View className="px-10 flex items-center gap-y-4">
        <Text className="font-bold text-xl">
          Bem vindo (a) ao <Text className="text-main-color">Vida Ativa!</Text>
        </Text>
        <Text className="text-center text-lg">
          Seu assistente de saúde pessoal para uma vida saudável e ativa.
        </Text>
      </View>
      <View className="w-full px-10 ">
        <Button
          text="Começar"
          onPress={() => navigate.navigate("Register", { name: "Register" })}
        />
      </View>
      <Link to="/Login">
        <Text className="text-lg">
          Já possui uma conta?{" "}
          <Text className="text-main-color">Faça login</Text>
        </Text>
      </Link>
    </SafeAreaView>
  );
}
