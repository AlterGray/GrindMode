import { View } from "react-native";

import { Checkbox } from "@features/rituals/CheckBox";

type CheckListItemType = {
  label: string;
  value: string;
};

type CheckListProps = {
  options: CheckListItemType[];
  vertical?: boolean;
  horizontal?: boolean;
  selectedOptions?: string[];
  onPress: (option: string) => void;
};

const CheckList: React.FC<CheckListProps> = ({
  options,
  vertical,
  horizontal,
  selectedOptions,
  onPress,
}) => {
  const isVertical = vertical && !horizontal ? vertical : horizontal;

  let classes = "";
  if (!isVertical) classes = "flex flex-col gap-2";
  else classes = "flex flex-row gap-1";
  return (
    <View className={classes}>
      {options.map((option) => (
        <Checkbox
          key={option.value}
          label={option.label}
          onChange={() => onPress(option.value)}
          checked={selectedOptions?.includes(option.value)}
        />
      ))}
    </View>
  );
};

export default CheckList;

// TODO learn react community custom hooks to learn how to make own
// ALSO CHECK CUSTOM HOOKS FROM OPEN SOURCE APPS
