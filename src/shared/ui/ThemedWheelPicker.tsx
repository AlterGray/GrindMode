import { Colors } from "@/constants/Colors";
import { useThemeStore } from "@/stores/themeStore";
import WheelPickerExpo from "react-native-wheel-picker-expo";
import {
  ItemType,
  RenderItemProps,
} from "react-native-wheel-picker-expo/lib/typescript/types";

// TODO recheck renderItem returns component
export type ThemedWheelPickerProps = {
  renderItem: (props: RenderItemProps) => React.ReactNode;
  items: { label: string; value: any }[];
  widht?: number;
  height?: number;
  initialIndex?: number;
  onChange: (val: { index: number; item: ItemType }) => void;
};

const ThemedWheelPicker: React.FC<ThemedWheelPickerProps> = ({
  items,
  renderItem,
  widht = 60,
  height = 160,
  initialIndex = 0,
  onChange,
}) => {
  const isDark = useThemeStore((state) => state.isDark);

  return (
    <WheelPickerExpo
      width={widht}
      height={height}
      initialSelectedIndex={initialIndex}
      items={items}
      onChange={onChange}
      renderItem={renderItem}
      selectedStyle={{ borderColor: Colors.light.tabActive, borderWidth: 2 }}
      backgroundColor={
        isDark ? Colors.dark.background : Colors.light.background
      }
    />
  );
};

export default ThemedWheelPicker;
