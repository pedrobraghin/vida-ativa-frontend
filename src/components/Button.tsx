import {
  Text,
  GestureResponderEvent,
  TouchableOpacity as RNButton,
} from "react-native";

interface ButtonProps {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  ariaLabel?: string;
  className?: string;
}

export function Button({ text, onPress, ariaLabel, className }: ButtonProps) {
  return (
    <RNButton
      onPress={onPress}
      className={
        "bg-main-color py-4 rounded-full w-max h-max items-center " + className
      }
      aria-label={ariaLabel}
    >
      <Text className="text-text-color text-lg font-semibold">{text}</Text>
    </RNButton>
  );
}
