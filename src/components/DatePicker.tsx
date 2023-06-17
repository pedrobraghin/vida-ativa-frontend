import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform, View, TouchableOpacity, Text } from "react-native";

interface DatePickerProps {
  onChange?(date: Date): void;
}

export function DatePicker({ onChange }: DatePickerProps) {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  function handleDateChange(selectedDate: Date | undefined) {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
    if (onChange) {
      onChange(currentDate);
    }
  }

  function toggleDatePicker() {
    setShowDatePicker(true);
  }

  return (
    <View>
      <TouchableOpacity
        onPress={toggleDatePicker}
        className="bg-main-color rounded-md px-4 py-2"
      >
        <Text className="text-text-color text-center">Selecionar data</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={(_, date) => handleDateChange(date)}
        />
      )}
    </View>
  );
}
