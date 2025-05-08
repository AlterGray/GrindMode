import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import ToggleOptionsItem from "./ToggleOptionsItem";

type ToggleOptions = {
  label: string;
  value: string;
};

type ToggleOptionsProps = {
  options: ToggleOptions[];
  onChange: (option: string) => void;
};

// TODO refactor it
const ToggleOptions: React.FC<ToggleOptionsProps> = ({ options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(options[0].value);

  useEffect(() => {
    setSelectedOption(options[0].value);
    onChange(options[0].value);
  }, []);

  return (
    <View>
      {options.map((option) => (
        <Pressable
          key={option.value}
          onPress={() => {
            setSelectedOption(option.value);
            onChange(option.value);
          }}
        >
          <ToggleOptionsItem
            title={option.label}
            isSelected={selectedOption === option.value}
          />
        </Pressable>
      ))}
    </View>
  );
};

export default ToggleOptions;
