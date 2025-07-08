import React, { useState } from "react";
import { Modal, View } from "react-native";

import StyledButton from "@shared/ui/StyledButton";
import AnimatedThemedText from "@shared/ui/ThemedText";
import ThemedView from "@shared/ui/ThemedView";

import HoursPicker from "./HoursPicker";
import MinutesPicker from "./MinutesPicker";

type DurationPickerProps = {
  isVisible: boolean;
  maxDuration?: number;
  hourIndex?: number;
  minuteIndex?: number;
  onConfirm: (minutes: number) => void;
  onCancel: () => void;
};

const DurationPicker: React.FC<DurationPickerProps> = ({
  isVisible,
  maxDuration = 242,
  hourIndex = 0,
  minuteIndex = 0,
  onConfirm,
  onCancel,
}) => {
  const maxHours = Math.floor(maxDuration / 60);
  const maxMinutes = maxDuration % 60;

  const [selectedHour, setSelectedHour] = useState(hourIndex);
  const [selectedMinute, setSelectedMinute] = useState(minuteIndex);

  const totalDuration = selectedHour * 60 + selectedMinute;

  return (
    <Modal transparent visible={isVisible} animationType="fade">
      <View className="flex-1 items-center justify-center bg-black/50">
        <ThemedView className="bg-backgroundSurface w-10/12 rounded-xl p-4">
          <AnimatedThemedText className="mb-2 text-base font-medium">
            Select Duration
          </AnimatedThemedText>

          <ThemedView className="mb-4 flex-row justify-center gap-6">
            <HoursPicker
              initialIndex={hourIndex}
              onChange={setSelectedHour}
              maxHours={maxHours}
            />
            <MinutesPicker
              initialIndex={minuteIndex}
              onChange={setSelectedMinute}
              maxMinutes={selectedHour === maxHours ? maxMinutes : 59}
            />
          </ThemedView>

          {/* Actions */}
          <View className="flex-row justify-end gap-2">
            <StyledButton
              variant="secondary-text-20"
              onPress={onCancel}
              title="Cancel"
            />
            <StyledButton
              variant="primary-contained-20"
              onPress={() => onConfirm(totalDuration)}
              title="Confirm"
            />
          </View>
        </ThemedView>
      </View>
    </Modal>
  );
};

export default DurationPicker;
