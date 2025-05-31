import { View } from "react-native";
import StyledButton from "../StyledButton";

type ToggleOptions = {
  label: string;
  value: string;
};

// TODO remove selected prop and remove confirm button to forward user right after press
type ToggleListProps = {
  options: ToggleOptions[];
  onPress: (option: string) => void;
};

// TODO refactor it
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
