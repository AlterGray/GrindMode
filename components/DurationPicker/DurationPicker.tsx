import React, { useState } from 'react'
import { Modal, View } from 'react-native'
import { ThemedView } from '../ui/ThemedView'
import { ThemedText } from '../ui/ThemedText'
import DurationPickerItem from './DurationPickerItem'
import StyledButton from '../ui/StyledButton'
import { ThemedWheelPicker } from '../ui/ThemedWheelPicker'

type DurationPickerProps = {
  isVisible: boolean;
  maxDuration?: number;
  hourIndex?: number;
  minuteIndex?: number;
  onConfirm: (minutes: number) => void;
  onCancel: () => void;
}

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

  const durationHours = Math.floor(242 / 60);
  const durationMinutes = (durationHours === 0 || (durationHours % 60 == 0)) ? (maxDuration % 60) : 59;

  const hoursItems = Array.from({ length: durationHours + 1 }, (_, i) => ({
    label: String(i).padStart(2, '0'),
    value: i,
  }));

  const minutesItems = Array.from({ length: durationMinutes + 1 }, (_, i) => ({
    label: String(i).padStart(2, '0'),
    value: i,
  }));

  return (
    <Modal transparent visible={isVisible} animationType="fade">
      <View className="flex-1 items-center justify-center bg-black/50">
        <ThemedView className="bg-backgroundSurface p-4 rounded-xl w-10/12">
          <ThemedText className="text-base font-medium mb-2">Select Duration</ThemedText>

          <ThemedView className="flex-row items-center justify-center overflow-hidden gap-4 mb-4">
            {/* HOURS */}
            <ThemedView className="flex-row items-center">
              <ThemedWheelPicker 
                  items={hoursItems}
                  onChange={(val) => setSelectedHourIndex(val.index)}
                  renderItem={(item) => <DurationPickerItem text={item.label} />}
                />
              <ThemedText className="text-lg ml-1 font-light">H</ThemedText>
            </ThemedView>

            {/* MINUTES */}
            <ThemedView className="flex-row items-center">
              <ThemedWheelPicker 
                items={minutesItems}
                onChange={(val) => setSelectedMinuteIndex(val.index)}
                renderItem={(item) => <DurationPickerItem text={item.label} />}
              />
              <ThemedText className="text-lg ml-1 font-light">M</ThemedText>
            </ThemedView>
          </ThemedView>

          {/* ACTIONS */}
          <View className="flex-row justify-end gap-2">
            <StyledButton variant="text" onPress={onCancel} text="Cancel" color="primary" />
            <StyledButton
              variant="primary"
              onPress={() => onConfirm(hoursItems[selectedHourIndex].value * 60 + minutesItems[selectedMinuteIndex].value)}
              text="Confirm"
            />
          </View>
        </ThemedView>
      </View>
    </Modal>
  );
};
