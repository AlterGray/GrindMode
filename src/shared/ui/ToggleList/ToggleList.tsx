import { useState } from "react";
import { View } from "react-native";

import StyledButton from "@shared/ui/StyledButton";

type ToggleListItemType = {
  label: string;
  value: string;
};

type ToggleListProps = {
  options: ToggleListItemType[];
  vertical?: boolean;
  horizontal?: boolean;
  selectedOption?: string;
  onPress: (option: string) => void;
};

const ToggleList: React.FC<ToggleListProps> = ({
  options,
  vertical,
  horizontal,
  selectedOption,
  onPress,
}) => {
  const isVertical = vertical && !horizontal ? vertical : horizontal;

  let classes = "";
  if (!isVertical) classes = "flex flex-col gap-2";
  else classes = "flex flex-row gap-1";
  return (
    <View className={classes}>
      {options.map((option) => (
        <StyledButton
          key={option.value}
          variant="secondary-sharped-20"
          onPress={() => onPress(option.value)}
          title={option.label}
          className={
            selectedOption === option.value
              ? "border-b-2 border-light-selectedListItemBorder dark:border-dark-selectedListItemBorder"
              : ""
          }
        />
      ))}
    </View>
  );
};

export default ToggleList;

// TODO learn react community custom hooks to learn how to make own
// ALSO CHECK CUSTOM HOOKS FROM OPEN SOURCE APPS
