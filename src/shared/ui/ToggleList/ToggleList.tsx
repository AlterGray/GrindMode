import { Pressable, View } from "react-native";
import ToggleOptionsItem from "./ToggleListItem";

type ToggleOptions = {
  label: string;
  value: string;
};

// TODO remove selected prop and remove confirm button to forward user right after press
type ToggleListProps = {
  options: ToggleOptions[];
  selectedOption: string;
  onChange: (option: string) => void;
};

// TODO refactor it
const ToggleList: React.FC<ToggleListProps> = ({
  options,
  selectedOption,
  onChange,
}) => {
  return (
    <View>
      {options.map((option) => (
        <Pressable key={option.value} onPress={() => onChange(option.value)}>
          <ToggleOptionsItem
            title={option.label}
            isSelected={selectedOption === option.value}
          />
        </Pressable>
      ))}
    </View>
  );
};

export default ToggleList;

// TODO learn react community custom hooks to learn how to make own
// ALSO CHECK CUSTOM HOOKS FROM OPEN SOURCE APPS
