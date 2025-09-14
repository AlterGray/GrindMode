import { View } from "react-native";

import { ButtonVariant } from "@shared/types/commonTypes";
import StyledButton from "@shared/ui/StyledButton";

type TimerControlsProps = {
  onReset: () => void;
  primaryButtonTitle: string;
  primaryButtonVariant?: ButtonVariant;
  onPrimaryButtonPress: () => void;
};

const TimerControls: React.FC<TimerControlsProps> = ({
  onReset,
  primaryButtonTitle,
  primaryButtonVariant = "primary-contained-20",
  onPrimaryButtonPress,
}) => {
  return (
    <View className="flex-row justify-center gap-2">
      <StyledButton
        title={primaryButtonTitle}
        onPress={onPrimaryButtonPress}
        variant={primaryButtonVariant}
      />
      <StyledButton
        title="Reset"
        onPress={onReset}
        variant="remove-contained-20"
        className="bg-light-buttonPrimaryBackground dark:bg-dark-buttonPrimaryBackground"
      />
    </View>
  );
};

export default TimerControls;
