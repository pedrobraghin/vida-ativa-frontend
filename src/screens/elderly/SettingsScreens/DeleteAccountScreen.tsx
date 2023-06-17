import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useUser } from "../../../hooks/useUser";
import { deleteAccount } from "../../../functions/user";
import { TextInput } from "../../../components/TextInput";
import FormErrorsContainer from "../../../components/FormErrorsContainer";

export default function DeleteAccountScreen() {
  const [error, setError] = useState<string | null>();
  const [password, setPassword] = useState<string>("");
  const { logout } = useUser();

  async function handleDeleteAccount() {
    setError(null);
    if (!password.trim()) {
      setError("É preciso informar sua senha para apagar a sua conta!");
      return;
    }
    try {
      const success = await deleteAccount(password);
      if (!success) throw new Error();
      logout();
    } catch (error) {
      setError("Senha inválida!");
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-5 justify-center">
      <Text className="text-lg text-center">
        Tem certeza que deseja excluir sua conta?
      </Text>
      <Text className="text-lg text-center text-red-300">
        Você perderá todos os dados da sua conta. Essa ação não poderá ser
        desfeita!
      </Text>
      <View className="gap-y-5 mt-5">
        <TextInput
          placeholder="Digite sua senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <View>
          <TouchableOpacity
            className="border-2 border-red-300 p-4 rounded-md"
            onPress={handleDeleteAccount}
          >
            <Text className="text-center text-lg text-red-300 font-bold">
              Apagar conta
            </Text>
          </TouchableOpacity>
        </View>

        <View className="my-4">
          {error && <FormErrorsContainer errors={[error]} />}
        </View>
      </View>
    </SafeAreaView>
  );
}
