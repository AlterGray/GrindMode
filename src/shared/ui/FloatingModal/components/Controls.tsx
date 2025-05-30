import { View } from "react-native";
import StyledButton from "@shared/ui/StyledButton";
import { ButtonProps } from "@shared/types/commonTypes";

type ControlsProps = {
  primary: ButtonProps;
  secondary: ButtonProps;
  onCancel: () => void;
  onConfirm: () => void;
};

const Controls: React.FC<ControlsProps> = ({
  primary,
  secondary,
  onCancel,
  onConfirm,
}) => {
  return (
    <View className="flex-row justify-end gap-2">
      <StyledButton
        variant={secondary.variant}
        title={secondary.title}
        onPress={onCancel}
      />
      <StyledButton
        variant={primary.variant}
        title={primary.title}
        onPress={onConfirm}
      />
    </View>
  );
};

export default Controls;
