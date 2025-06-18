import { useState } from "react";
import { View } from "react-native";

import { FloatingModalVariant } from "@shared/types/commonTypes";
import FloatingModal from "@shared/ui/FloatingModal/FloatingModal";
import ThemedText from "@shared/ui/ThemedText";

import { Checkbox } from "./CheckBox";
import { useRitualStore } from "./ritualStore";
import { useRitualStatisticStore } from "./statisticStore";

type RemoveRitualModalProps = {
  isOpen: boolean;
  ritualIds: string[];
  onClose: () => void;
  onConfirm: () => void;
};

export const RemoveRitualModal: React.FC<RemoveRitualModalProps> = ({
  isOpen,
  ritualIds,
  onClose,
  onConfirm,
}) => {
  const removeRitual = useRitualStore((state) => state.removeRitual);
  const removeStatistic = useRitualStatisticStore(
    (state) => state.removeStatistic,
  );
  const removeRituals = () => {
    ritualIds.forEach(removeRitual);
  };
  const removeStatistics = () => {
    ritualIds.forEach(removeStatistic);
  };

  const [isRemoveStatistics, setIsRemoveStatistics] = useState(false);

  const handleRemove = () => {
    if (isRemoveStatistics) {
      removeStatistics();
    }
    removeRituals();
    onConfirm();
    onClose();
  };

  return (
    <FloatingModal
      title="Remove Ritual"
      isOpen={isOpen}
      variant={FloatingModalVariant.Danger}
      onConfirm={handleRemove}
      onCancel={onClose}
      renderContent={() => (
        <View>
          <ThemedText>Remove rituals?</ThemedText>
          <Checkbox
            label="Also delete ritual statistic?"
            onChange={setIsRemoveStatistics}
            checked={isRemoveStatistics}
            size="sm"
          />
        </View>
      )}
    />
  );
};
