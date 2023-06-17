import { useState } from "react";
import { View, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { AuthScreenProps } from "../../Models";
import { Button } from "../../../components/Button";
import { TextInput } from "../../../components/TextInput";
import {
  RegisterUserFormSchemaStepOneType,
  registerUserFormStepTwoSchema,
} from "../../../zodSchemas/registerFormSchemas";

import FormErrorsContainer from "../../../components/FormErrorsContainer";

export default function RegisterStepTwo() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const navigation = useNavigation<AuthScreenProps>();
  const route = useRoute();
  const params = route.params as { data: RegisterUserFormSchemaStepOneType };

  function onSubmit() {
    setErrors([]);
    if (!firstName || !lastName || !phoneNumber || !birthDate || !address) {
      return setErrors(["Preencha todos os campos!"]);
    }

    const parsedData = registerUserFormStepTwoSchema.safeParse({
      firstName,
      lastName,
      phoneNumber,
      address,
      birthDate,
    });

    if (!parsedData.success) {
      return setErrors(parsedData.error.errors.map((err) => err.message));
    }

    navigation.navigate("RegisterStepThree", {
      name: "RegisterStepThree",
      data: { ...params.data, ...parsedData.data },
    });
  }

  return (
    <KeyboardAwareScrollView>
      <View>
        <View className="absolute bg-zinc-200 w-60 h-64 rounded-lg -top-[200] rotate-[20deg] left-1/4" />
        <View className="w-full h-max mt-16 px-10 mb-10">
          <View>
            <Text className="font-bold text-[32px] text-star text-main-color">
              Preencha os campos abaixo
            </Text>
            <Text className="text-xl leading-6">
              Preencha os campos abaixo com suas informações pessoais e de
              contato e depois clique em
              <Text className="text-main-color">“Criar Conta”</Text>
            </Text>
          </View>
          <View className="pt-5">
            {errors.length > 0 && <FormErrorsContainer errors={errors} />}
          </View>
          <View className="flex-col gap-3">
            <TextInput
              placeholder="Nome"
              onChangeText={setFirstName}
              value={firstName}
            />
            <TextInput
              placeholder="Sobrenome"
              onChangeText={setLastName}
              value={lastName}
            />
            <TextInput
              placeholder="Telefone"
              onChangeText={setPhoneNumber}
              value={phoneNumber}
              keyboardType="phone-pad"
            />
            <TextInput
              placeholder="Endereço"
              onChangeText={setAddress}
              value={address}
            />
            <TextInput
              placeholder="Data de nascimento"
              onChangeText={setBirthDate}
              value={birthDate}
              keyboardType="number-pad"
            />
          </View>

          <View className="mt-10">
            <Button text="Criar conta" onPress={onSubmit} />
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
