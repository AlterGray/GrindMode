import DateTimePicker from "@react-native-community/datetimepicker";

import { useState } from "react";
import React from "react";

import { formatTimeLabel } from "@shared/lib/utils/common";

import StyledButton from "./StyledButton";

type TimePickerButtonProps = {
  time: number;
  onChange: (value: number) => void;
};

const TimePickerButton: React.FC<TimePickerButtonProps> = ({
  time,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <StyledButton
        title={formatTimeLabel(time)}
        variant="secondary-text-10"
        onPress={() => setIsOpen(true)}
      />
      {isOpen && (
        <DateTimePicker
          value={new Date(time)}
          mode="time"
          is24Hour={false}
          onChange={(_, selectedDate) => {
            if (selectedDate) onChange(selectedDate.getTime());
            setIsOpen(false);
          }}
        />
      )}
    </>
  );
};

export default TimePickerButton;
