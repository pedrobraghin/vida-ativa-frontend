import { View, TouchableOpacity, Text } from "react-native";
import IoIcons from "@expo/vector-icons/Ionicons";

interface FABAddProps {
  onPress?: () => void;
  right?: number;
  left?: number;
  children?: React.ReactNode;
  badgeCount?: number;
}

export default function FABAdd({
  onPress,
  right = 0,
  left = 330,
  children,
  badgeCount = 0,
}: FABAddProps) {
  return (
    <View
      style={{ position: "absolute", top: "85%", left, right }}
      className="w-16 h-16 rounded-full relative"
    >
      <TouchableOpacity
        className="absolute shadow-md shadow-25 z-50 justify-center items-center w-16 h-16 rounded-full bg-main-color"
        onPress={onPress}
      >
        {children ? children : <IoIcons name="add" color="white" size={42} />}
      </TouchableOpacity>
      {badgeCount > 0 && (
        <View className="absolute justify-center items-center min-w-[24px] min-h-[24px] z-50 -right-0 -top-2 bg-red-400 rounded-full ">
          <Text
            className={
              "text-text-color rounded-full " +
              (badgeCount > 99 ? "text-xs" : "")
            }
          >
            {badgeCount > 99 ? "99+" : badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}
