import React, { useState } from "react";
import { Modal, View } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import DurationPickerItem from "./DurationPickerItem";
import StyledButton from "../StyledButton";
import { ThemedWheelPicker } from "../ThemedWheelPicker";

type DurationPickerProps = {
  isVisible: boolean;
  maxDuration?: number;
  hourIndex?: number;
  minuteIndex?: number;
  onConfirm: (minutes: number) => void;
  onCancel: () => void;
};

// TODO make 2 components?
export const DurationPicker: React.FC<DurationPickerProps> = ({
  isVisible,
  maxDuration = 240,
  hourIndex = 0,
  minuteIndex = 0,
  onConfirm,
  onCancel,
}) => {
  const [selectedHourIndex, setSelectedHourIndex] = useState(hourIndex);
  const [selectedMinuteIndex, setSelectedMinuteIndex] = useState(minuteIndex);

  const durationHours = Math.floor(maxDuration / 60);
  const durationMinutes =
    durationHours === 0 || durationHours % 60 == 0 ? maxDuration % 60 : 59;

  const hoursItems = Array.from({ length: durationHours + 1 }, (_, i) => ({
    label: String(i).padStart(2, "0"),
    value: i,
  }));

  const minutesItems = Array.from({ length: durationMinutes + 1 }, (_, i) => ({
    label: String(i).padStart(2, "0"),
    value: i,
  }));

  const getTotalDuration = () =>
    hoursItems[selectedHourIndex].value * 60 +
    minutesItems[selectedMinuteIndex].value;

  const hoursPicker = (
    <ThemedView className="flex-row items-center">
      <ThemedWheelPicker
        items={hoursItems}
        onChange={(val) => setSelectedHourIndex(val.index)}
        renderItem={(item) => <DurationPickerItem text={item.label} />}
      />
      <ThemedText className="ml-1 text-lg font-light">H</ThemedText>
    </ThemedView>
  );

  const minutesPicker = (
    <ThemedView className="flex-row items-center">
      <ThemedWheelPicker
        items={minutesItems}
        onChange={(val) => setSelectedMinuteIndex(val.index)}
        renderItem={(item) => <DurationPickerItem text={item.label} />}
      />
      <ThemedText className="ml-1 text-lg font-light">M</ThemedText>
    </ThemedView>
  );

  return (
    <Modal transparent visible={isVisible} animationType="fade">
      <View className="flex-1 items-center justify-center bg-black/50">
        <ThemedView className="bg-backgroundSurface w-10/12 rounded-xl p-4">
          <ThemedText className="mb-2 text-base font-medium">
            Select Duration
          </ThemedText>

          <ThemedView className="mb-4 flex-row items-center justify-center gap-4 overflow-hidden">
            {hoursPicker}
            {minutesPicker}
          </ThemedView>

          {/* ACTIONS */}
          <View className="flex-row justify-end gap-2">
            <StyledButton
              variant="text"
              onPress={onCancel}
              text="Cancel"
              color="primary"
            />
            <StyledButton
              variant="primary"
              onPress={() => onConfirm(getTotalDuration())}
              text="Confirm"
            />
          </View>
        </ThemedView>
      </View>
    </Modal>
  );
};
