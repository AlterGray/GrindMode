import { View } from "react-native";

import StyledButton from "@shared/ui/StyledButton";

type ToggleOptions = {
  label: string;
  value: string;
};

type ToggleListProps = {
  options: ToggleOptions[];
  onPress: (option: string) => void;
};

const ToggleList: React.FC<ToggleListProps> = ({ options, onPress }) => {
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

export default ToggleList;

// TODO learn react community custom hooks to learn how to make own
// ALSO CHECK CUSTOM HOOKS FROM OPEN SOURCE APPS
