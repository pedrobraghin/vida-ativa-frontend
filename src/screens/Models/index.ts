import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  RegisterUserFormSchemaStepOneType,
  RegisterUserFormSchemaStepTwoType,
} from "../../zodSchemas/registerFormSchemas";

export type PropsNavigationStack = {
  Welcome: undefined;
  Register: {
    name: string;
  };
  RegisterStepTwo: {
    name: string;
    data: RegisterUserFormSchemaStepOneType;
  };
  RegisterStepThree: {
    name: string;
    data: RegisterUserFormSchemaStepOneType & RegisterUserFormSchemaStepTwoType;
  };
  Login: {
    name: string;
  };
  ForgotPassword: {
    name: string;
  };
  ResetPassword: {
    name: string;
  };
};

export type AuthScreenProps = NativeStackNavigationProp<PropsNavigationStack>;
