import { View } from "react-native";
import StyledButton from "@shared/ui/StyledButton";
import { ButtonProps } from "@shared/types/commonTypes";

type ControlsProps = {
  primary?: ButtonProps;
  secondary?: ButtonProps;
  variant?: "both" | "primary" | "secondary";
  onCancel: () => void;
  onConfirm?: () => void;
};

const Controls: React.FC<ControlsProps> = ({
  primary,
  secondary,
  variant,
  onCancel,
  onConfirm,
}) => {
  const isBothIncluded = variant === "both";
  const isSecondary = isBothIncluded || variant === "secondary";
  const isPrimary = isBothIncluded || variant === "primary";
  return (
    <View className="flex-row justify-end gap-2">
      {isSecondary && (
        <StyledButton
          variant={secondary?.variant}
          title={secondary?.title ?? ""}
          onPress={onCancel}
        />
      )}
      {isPrimary && (
        <StyledButton
          variant={primary?.variant}
          title={primary?.title ?? ""}
          onPress={onConfirm}
        />
      )}
    </View>
  );
};

export default Controls;
