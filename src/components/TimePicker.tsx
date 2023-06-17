import React, { useState } from "react";
import { Platform, View, Text, TouchableOpacity } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

interface DatePickerProps {
  onChange?(time: Date): void;
}

export function TimePicker({ onChange }: DatePickerProps) {
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  function handleDateChange(selectedTime: Date | undefined) {
    const currentTime = selectedTime || time;
    setShowDatePicker(Platform.OS === "ios");
    setTime(currentTime);
    if (onChange) {
      onChange(currentTime);
    }
  }

  function toggleTimePicker() {
    setShowDatePicker(true);
  }

  return (
    <View>
      <TouchableOpacity
        onPress={toggleTimePicker}
        className="bg-main-color rounded-md px-4 py-2"
      >
        <Text className="text-text-color text-center">Selecionar horário</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={(_, time) => handleDateChange(time)}
        />
      )}
    </View>
  );
}
