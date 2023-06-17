import AntIcons from "@expo/vector-icons/AntDesign";
import FeatherIcons from "@expo/vector-icons/Feather";

import { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Colors } from "../constants/Colors";

interface CheckboxProps {
  onChange(value: boolean): void;
  initialValue?: boolean;
  label?: string;
}

export function Checkbox({
  onChange,
  initialValue = false,
  label,
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(initialValue);

  function handleCheck() {
    setIsChecked((prev) => {
      const checked = !prev;
      onChange(checked);
      return checked;
    });
  }

  return (
    <TouchableOpacity
      onPress={handleCheck}
      className="flex-row gap-2 items-center my-2"
    >
      <View>
        {isChecked ? (
          <AntIcons name="checksquare" color={Colors.MainColor} size={24} />
        ) : (
          <FeatherIcons name="square" color={Colors.Gray_300} size={24} />
        )}
      </View>
      {label && <Text className="text-base">{label}</Text>}
    </TouchableOpacity>
  );
}
