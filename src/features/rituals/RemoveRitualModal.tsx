import { useState } from "react";
import { View } from "react-native";

import { FloatingModalVariant } from "@shared/types/commonTypes";
import AnimatedThemedText from "@shared/ui/AnimatedThemedText";
import FloatingModal from "@shared/ui/FloatingModal/FloatingModal";

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
  const markRitualDeleted = useRitualStore((state) => state.markRitualDeleted);
  const markStatisticDeleted = useRitualStatisticStore(
    (state) => state.markStatisticDeleted,
  );

  const removeRituals = () => {
    ritualIds.forEach(removeRitual);
  };
  const removeStatistics = () => {
    ritualIds.forEach(removeStatistic);
  };
  const markRitualsDeleted = () => {
    ritualIds.forEach(markRitualDeleted);
  };
  const markStatisticsDeleted = () => {
    ritualIds.forEach(markStatisticDeleted);
  };

  const [isRemoveStatistics, setIsRemoveStatistics] = useState(false);

  // TODO mark statistic as deleted?
  // TODO clear only deleted items on settings page?
  // TODO remove settings page from tabs and add to header?
  const handleRemove = () => {
    if (isRemoveStatistics) {
      removeStatistics();
      removeRituals();
    } else {
      markRitualsDeleted();
      markStatisticsDeleted();
    }

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
