import { View } from "react-native";

import StyledButton from "@shared/ui/StyledButton";

type OptionsListItemType = {
  label: string;
  value: string;
};

type OptionsListProps = {
  options: OptionsListItemType[];
  onPress: (option: string) => void;
};

const OptionsList: React.FC<OptionsListProps> = ({ options, onPress }) => {
  return (
    <View>
      {options.map((option) => (
        <StyledButton
          key={option.value}
          variant="secondary-sharped-20"
          onPress={() => onPress(option.value)}
          title={option.label}
        />
      ))}
    </View>
  );
};

export default OptionsList;

// TODO learn react community custom hooks to learn how to make own
// ALSO CHECK CUSTOM HOOKS FROM OPEN SOURCE APPS
