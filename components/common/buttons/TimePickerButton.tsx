import { useState } from "react";
import StyledButton from "../StyledButton";
import { formatTimeLabel } from "@/lib/utils/common";
import React from "react";

import DateTimePicker from "@react-native-community/datetimepicker";

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
        text={formatTimeLabel(time)}
        variant="text"
        size="sm"
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
