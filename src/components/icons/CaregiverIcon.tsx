import Svg, { Path } from "react-native-svg";
import { View } from "react-native";
import { Colors } from "../../constants/Colors";

interface CaregiverIconProps {
  active?: boolean;
  onPress?: () => void;
}

export default function CaregiverIcon({
  active = false,
  onPress,
}: CaregiverIconProps) {
  const color = active ? Colors.White : Colors.Black_35;

  return (
    <View
      className={
        "border-2 p-3 py-4 rounded-lg transition-colors " +
        (active ? "border-white bg-main-color" : "")
      }
    >
      <Svg
        width="60"
        height="54"
        viewBox="0 0 60 54"
        fill="none"
        onPress={onPress}
      >
        <Path
          d="M43 3.64539C38 -1.85456 33 3.64538 33 3.64538C29.1844 -0.372487 25 0.645447 23 3.64538C18 9.64543 28 17.6454 33 21.1454C42 15.1454 46.9999 8.64541 43 3.64539Z"
          fill={color}
          stroke={color}
        />
        <Path
          d="M1 34.1454L17.5 27.1454L28.5 24.1454C32.5 22.6454 34 28.1454 31.5 29.1454L24 33.6454C20.2183 35.8997 22 38.1454 23.5 38.6454C23.5 38.6454 37 44.6454 39.5 44.6454C40.5 45.1454 54.5 35.6454 54.5 35.6454C57.5 34.1454 60.5 38.1454 57.5 40.1454L42 51.1454C38.7449 53.4345 35.2062 53.2848 30.5 51.6454L13.5 46.1454L1.5 52.6454M32 37.1454C32 37.1454 36 35.6454 36.5 33.6454C37 31.6454 35 27.6454 35 27.6454C34.5 24.1454 39.5 22.6454 41 26.1454L43.5 34.1454C44.5 38.6454 39 39.6454 39 39.6454"
          stroke={color}
        />
      </Svg>
    </View>
  );
}
