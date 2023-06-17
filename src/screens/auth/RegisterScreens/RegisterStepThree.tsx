import { useState } from "react";
import { SafeAreaView, StatusBar, View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";

import { Button } from "../../../components/Button";
import ElderlyIcon from "../../../components/icons/ElderlyIcon";
import CaregiverIcon from "../../../components/icons/CaregiverIcon";
import {
  RegisterUserFormSchemaStepOneType,
  RegisterUserFormSchemaStepTwoType,
} from "../../../zodSchemas/registerFormSchemas";
import { useUser } from "../../../hooks/useUser";
import { AccountTypes } from "../../../@types/UserType";
import FormErrorsContainer from "../../../components/FormErrorsContainer";

export default function RegisterStepThree() {
  const { createUser } = useUser();
  const route = useRoute();
  const params = route.params as {
    data: RegisterUserFormSchemaStepOneType & RegisterUserFormSchemaStepTwoType;
  };
  const [errors, setErrors] = useState<string[]>([]);
  const [accountType, setAccountType] = useState<AccountTypes | null>(null);

  async function onSubmit() {
    if (!accountType) {
      return setErrors(["Selecione um tipo de conta!"]);
    }
    const {
      email,
      firstName,
      lastName,
      address,
      birthDate,
      password,
      passwordConfirm,
      phoneNumber,
    } = params.data;

    await createUser({
      accountType,
      email: email,
      name: {
        first: firstName,
        last: lastName,
      },
      birthDate,
      password,
      passwordConfirm,
      address,
      phoneNumber,
    });
  }

  return (
    <SafeAreaView>
      <StatusBar barStyle={"light-content"} />
      <View className="absolute bg-zinc-200 w-60 h-64 rounded-lg -top-[200] rotate-[15deg] left-1/4" />
      <View className="w-full h-full justify-center px-10 ">
        <View className="w-full gap-y-2">
          <Text className="font-bold text-[32px] text-star text-main-color">
            Selecione o tipo de conta
          </Text>
          <Text className="text-xl leading-6">
            Quem vai utilizar o aplicativo?
          </Text>
        </View>
        <View className="mt-10 flex-row items-center justify-between">
          <CaregiverIcon
            active={accountType == AccountTypes.CAREGIVER}
            onPress={() => setAccountType(AccountTypes.CAREGIVER)}
          />
          <ElderlyIcon
            active={accountType == AccountTypes.ELDERLY}
            onPress={() => setAccountType(AccountTypes.ELDERLY)}
          />
        </View>
        <View className="flex-col gap-3 mt-10">
          <Button text="Continuar" onPress={onSubmit} />
        </View>
        <View className="mt-10">
          {errors.length > 0 && <FormErrorsContainer errors={errors} />}
        </View>
      </View>
    </SafeAreaView>
  );
}
