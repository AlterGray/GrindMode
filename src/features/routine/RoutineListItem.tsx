import ThemedText from "@shared/ui/ThemedText";
import DaysPicker from "@shared/ui/DaysPicker/DaysPicker";
import { extractDuration } from "@shared/lib/utils/common";
import { Routine } from "./routineTypes";
import { View } from "react-native";
import { useRoutineStore } from "./routineStore";

type ItemComponentProps = {
  item: Routine;
};

const RoutineListItem: React.FC<ItemComponentProps> = ({ item }) => {
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

export default RoutineListItem;
