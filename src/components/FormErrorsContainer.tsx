import { View, Text, ScrollView } from "react-native";

interface FormErrorsContainerProps {
  errors: string[];
}

export default function FormErrorsContainer({
  errors,
}: FormErrorsContainerProps) {
  return (
    <ScrollView className="border-2 border-red-400 rounded-md p-4 w-full">
      <View className="justify-center ">
        {errors.map((error, index) => {
          return (
            <View
              key={index}
              className={index > 0 && index < errors.length ? "mb-2" : ""}
            >
              <Text className="text-red-400">{error}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
