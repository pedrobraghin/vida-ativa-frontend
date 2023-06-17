import { useState } from "react";
import { Link } from "@react-navigation/native";
import { ActivityIndicator, Text, View } from "react-native";

import { useUser } from "../../hooks/useUser";
import { Colors } from "../../constants/Colors";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import { SafeAreaView } from "react-native-safe-area-context";
import FormErrorsContainer from "../../components/FormErrorsContainer";

export default function LoginScreen() {
  const { login } = useUser();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  function handleEmailChange(email: string) {
    setEmail(email);
  }

  function handlePasswordChange(password: string) {
    setPassword(password);
  }

  async function handleLogin() {
    setError(null);
    if (!email.trim() || !password.trim()) {
      return;
    }
    setIsLoading(true);
    const success = await login(email, password);
    if (!success) {
      setError("E-mail ou senha inválidos!");
    }
    setIsLoading(false);
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 py-10 px-12 items-center justify-center relative">
        <View className="absolute bg-zinc-200 w-60 h-64 rounded-lg -top-[200] rotate-[50deg] left-1/4" />
        <View className="w-full h-max py-20">
          <View>
            <Text className="font-bold text-[32px] text-star text-main-color">
              Fazer login
            </Text>
            <Text className="text-xl leading-6 mt-5">
              Faça login para acessar sua conta
            </Text>
          </View>
          <View className="flex-col gap-3 mt-5 mb-10">
            <TextInput
              placeholder="Digite seu e-mail"
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
            />
            <TextInput
              placeholder="Digite sua senha"
              secureTextEntry
              value={password}
              onChangeText={handlePasswordChange}
            />
            <View className="items-end">
              <Link to="/ForgotPassword">
                <Text className="text-main-color">Esqueceu a senha?</Text>
              </Link>
            </View>
          </View>
          {isLoading ? (
            <ActivityIndicator color={Colors.MainColor} size="small" />
          ) : (
            <Button text="Login" onPress={handleLogin} />
          )}
          <View className="my-4">
            {!isLoading && error && <FormErrorsContainer errors={[error]} />}
          </View>
        </View>
        <Link to="/Register">
          <View className="w-full">
            <Text className="text-lg">
              Não possui uma conta?{" "}
              <Text className="text-main-color">Registre-se</Text>
            </Text>
          </View>
        </Link>
      </View>
    </SafeAreaView>
  );
}
