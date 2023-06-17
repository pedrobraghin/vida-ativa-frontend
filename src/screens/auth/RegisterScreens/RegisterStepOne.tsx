import { Text, View } from "react-native";
import { Link, useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { AuthScreenProps } from "../../Models";
import { Button } from "../../../components/Button";
import { TextInput } from "../../../components/TextInput";
import { useState } from "react";
import { Checkbox } from "../../../components/Checkbox";
import { registerFormStepOneSchema } from "../../../zodSchemas/registerFormSchemas";
import { useUser } from "../../../hooks/useUser";
import FormErrorsContainer from "../../../components/FormErrorsContainer";

export default function RegisterStepOne() {
  const navigation = useNavigation<AuthScreenProps>();
  const { verifyEmailAvailability } = useUser();

  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  function handleShowPassword(value: boolean) {
    setHidePassword(!value);
  }

  async function onSubmit() {
    setErrors([]);
    if (
      !email.trim() ||
      !emailConfirm.trim() ||
      !password.trim() ||
      !passwordConfirm.trim()
    ) {
      setErrors(["Preencha os campos para continuar!"]);
      return;
    }
    const parsedData = registerFormStepOneSchema.safeParse({
      email,
      password,
      passwordConfirm,
    });
    if (!parsedData.success) {
      return setErrors(parsedData.error.errors.map((err) => err.message));
    }

    if (!email.match(emailConfirm)) {
      setErrors(["Os endereços de e-mail devem ser iguais!"]);
      return;
    }

    if (!password.match(passwordConfirm)) {
      setErrors(["As senhas devem ser iguais!"]);
      return;
    }
    const emailAvailable = await verifyEmailAvailability(email);
    if (!emailAvailable) {
      setErrors([
        "O endereço de e-mail já está sendo utilizado por outra pessoa!",
      ]);
      return;
    }

    navigation.navigate("RegisterStepTwo", {
      name: "RegisterStepTwo",
      data: {
        email,
        password,
        passwordConfirm,
      },
    });
  }

  return (
    <KeyboardAwareScrollView>
      <View className="flex-1 py-5 px-12 items-center justify-between relative">
        <View className="absolute bg-zinc-200 w-60 h-64 rounded-lg -top-[200] rotate-[50deg] left-1/4" />
        <View className="w-full h-max pt-20 pb-10">
          <View>
            <Text className="font-bold text-[32px] text-star text-main-color">
              Criar uma conta
            </Text>
            <Text className="text-xl leading-6">
              Informe um endereço de e-mail e uma senha, depois clique em
              <Text className="text-main-color">“Continuar”</Text>
            </Text>
          </View>
          <View className="flex-col gap-3 mt-5 mb-10">
            <TextInput
              placeholder="Digite seu e-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />
            <TextInput
              placeholder="Confirme o e-mail"
              keyboardType="email-address"
              onChangeText={setEmailConfirm}
              value={emailConfirm}
            />
            <View className="gap-y-2">
              <TextInput
                placeholder="Informe uma senha"
                secureTextEntry={hidePassword}
                onChangeText={setPassword}
                value={password}
              />
              <TextInput
                placeholder="Confirme a senha"
                secureTextEntry={hidePassword}
                onChangeText={setPasswordConfirm}
                value={passwordConfirm}
              />
              <Checkbox onChange={handleShowPassword} label="Exibir senha" />
            </View>
          </View>
          <Button text="Continuar" onPress={onSubmit} />
        </View>
        {errors.length > 0 && <FormErrorsContainer errors={errors} />}
        <Link to="/Login">
          <Text className="text-lg">
            Já possui uma conta?{" "}
            <Text className="text-main-color">Faça login</Text>
          </Text>
        </Link>
      </View>
    </KeyboardAwareScrollView>
  );
}
