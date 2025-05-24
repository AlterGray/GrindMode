import { View } from "react-native";
import StyledButton, { Variant } from "../../StyledButton";

// TODO make "Variant" shared type
type ButtonConfig = { variant: Variant; title: string };

// TODO use enum/type?
type ConfirmDialogControlsProps = {
  primary: ButtonConfig;
  secondary: ButtonConfig;
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmModalControls: React.FC<ConfirmDialogControlsProps> = ({
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

export default ConfirmModalControls;
