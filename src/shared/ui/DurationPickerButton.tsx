import { useState } from "react";
import React from "react";

import { formatDurationLabel } from "@shared/lib/utils/common";
import DurationPicker from "@shared/ui/DurationPicker/DurationPicker";
import StyledButton from "@shared/ui/StyledButton";

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
        title={formatDurationLabel(duration)}
        variant="secondary-text-10"
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
