import ThemedText from "../common/ThemedText";
import DaysPicker from "../DaysPicker/DaysPicker";
import { extractDuration } from "@/lib/utils/common";
import { Routine } from "@/app/types/routineTypes";
import { View } from "react-native";
import { useRoutineStore } from "@/stores/routineStore";

type ItemComponentProps = {
  item: Routine;
};

export const RoutineListItem: React.FC<ItemComponentProps> = ({ item }) => {
  const updateRoutine = useRoutineStore((state) => state.updateRoutine);
  const formatedStartTime = new Date(item.startTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View className="gap-2">
      <View className="flex-row items-center justify-between gap-2">
        <ThemedText>{item.title}</ThemedText>
        <ThemedText className="text-light-textAccent">
          {formatedStartTime}
        </ThemedText>
      </View>

      <View className="flex-row justify-between">
        <DaysPicker
          size="small"
          onChange={(days) => updateRoutine({ ...item, days })}
          initialItems={item.days}
        />
        <ThemedText>
          Duration: {extractDuration(item.expectedDuration)}
        </ThemedText>
      </View>
    </View>
  );
};
