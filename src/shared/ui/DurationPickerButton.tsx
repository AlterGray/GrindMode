import DurationPicker from "@ui/DurationPicker/DurationPicker";
import StyledButton from "@ui/StyledButton";
import { useState } from "react";
import { formatDurationLabel } from "@lib/utils/common";
import React from "react";

type DurationPickerButtonProps = {
  duration: number;
  onChange: (value: number) => void;
};

const DurationPickerButton: React.FC<DurationPickerButtonProps> = ({
  duration,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <StyledButton
        text={formatDurationLabel(duration)}
        variant="text"
        size="sm"
        onPress={() => setIsOpen(true)}
      />
      <DurationPicker
        isVisible={isOpen}
        onConfirm={(value) => {
          onChange(value);
          setIsOpen(false);
        }}
        onCancel={() => setIsOpen(false)}
        hourIndex={Math.floor(duration / 60)}
        minuteIndex={duration % 60}
      />
    </>
  );
};

export default DurationPickerButton;
