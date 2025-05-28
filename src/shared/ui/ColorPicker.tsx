import WheelPickerExpo from "react-native-wheel-picker-expo";
import ThemedView from "./ThemedView";
import { ItemType } from "react-native-wheel-picker-expo/lib/typescript/types";
import { useThemeColors } from "@shared/hooks/useThemeColors";

type ColorPickerProps = {
  items: ItemType[];
  onChange: (selectedColor: string) => void;
};

const ColorPicker: React.FC<ColorPickerProps> = ({ items, onChange }) => {
  const theme = useThemeColors();
  const getColorByLabel = (label: string) =>
    items.find((item) => item.label == label)?.value;
  return (
    <ThemedView className="max-h-16 flex-1 justify-center overflow-hidden">
      <WheelPickerExpo
        items={items}
        onChange={({ index }) => onChange(items[index].label)}
        initialSelectedIndex={0}
        height={120}
        renderItem={({ label }) => (
          <ThemedView
            style={{
              backgroundColor: getColorByLabel(label),
              width: 15,
              height: 15,
            }}
          />
        )}
        width={70}
        selectedStyle={{
          borderColor: theme.border,
          borderWidth: 2,
        }}
        backgroundColor={theme.background}
      />
    </ThemedView>
  );
};

export default ColorPicker;
