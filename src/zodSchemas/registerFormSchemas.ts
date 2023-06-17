import z from "zod";

const brazilPhoneNumberRegex = new RegExp(
  /^(\(?\+?[0-9]{2}\)?\s?)?(?:\(?[0-9]{2}\)?[\s.-]?)?(?:[0-9]{4,5}[\s.-]?[0-9]{4})$/
);

const brazilBirthDateRegex = new RegExp(
  /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])(\/|-)(18[0-9]{2}|19[0-9]{2}|20[0-9]{2}|20[0-9]{2}|21[0-9]{2})$/
);

export const registerFormStepOneSchema = z.object({
  email: z
    .string()
    .email("Endereço de e-mail inválido!")
    .nonempty("Informe um endereço de e-mail!"),
  password: z
    .string()
    .min(8, "A senha precisa ter no mínimo 8 caracteres!")
    .nonempty("Informe uma senha!"),
  passwordConfirm: z.string(),
});

export const registerUserFormStepTwoSchema = z.object({
  firstName: z
    .string()
    .min(2, "O nome deve ter no mínimo 2 caracteres")
    .nonempty("Informe seu nome!"),
  lastName: z
    .string()
    .min(2, "O nome deve ter no mínimo 2 caracteres")
    .nonempty("Informe seu nome!"),
  phoneNumber: z
    .string()
    .regex(brazilPhoneNumberRegex, "Número de telefone inválido!")
    .nonempty("Informe um número de telefone!"),
  address: z.string().nonempty("Informe seu endereço!"),
  birthDate: z
    .string()
    .regex(brazilBirthDateRegex, "Formato de data de nascimento inválido!")
    .nonempty("Informe sua data de nascimento!"),
});

export type RegisterUserFormSchemaStepTwoType = z.infer<
  typeof registerUserFormStepTwoSchema
>;

export type RegisterUserFormSchemaStepOneType = z.infer<
  typeof registerFormStepOneSchema
>;
