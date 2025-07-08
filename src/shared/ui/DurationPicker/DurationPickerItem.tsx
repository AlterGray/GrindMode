import React from "react";

import AnimatedThemedText from "@shared/ui/ThemedText";

type DurationPickerItemProps = {
  text: string;
};

const DurationPickerItem: React.FC<DurationPickerItemProps> = ({ text }) => {
  return <AnimatedThemedText>{text}</AnimatedThemedText>;
};

export default DurationPickerItem;
