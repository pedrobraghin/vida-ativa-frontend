import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";

interface TextInputProps extends RNTextInputProps {}

export function TextInput(props: TextInputProps) {
  return (
    <RNTextInput
      {...props}
      className="px-4 py-4 rounded-md border-zinc-300 border-2 placeholder:text-xl focus:border-main-color-hover"
    />
  );
}
