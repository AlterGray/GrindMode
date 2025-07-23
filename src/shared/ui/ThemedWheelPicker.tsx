import WheelPickerExpo from "react-native-wheel-picker-expo";
import {
  ItemType,
  RenderItemProps,
} from "react-native-wheel-picker-expo/lib/typescript/types";

import { useThemeColors } from "@shared/hooks/useThemeColors";

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
  const theme = useThemeColors();

  return (
    <WheelPickerExpo
      width={widht}
      height={height}
      initialSelectedIndex={initialIndex}
      items={items}
      onChange={onChange}
      renderItem={renderItem}
      selectedStyle={{ borderColor: theme.tabActive, borderWidth: 2 }}
      backgroundColor={theme.backgroundSurface}
    />
  );
};

export default ThemedWheelPicker;
