import { DayType } from "@/app/types/commonTypes";
import DaysPicker from "./ui/DaysPicker/DaysPicker";
import { ThemedText } from "./ui/ThemedText";
import { ThemedView } from "./ui/ThemedView";

type DaysGridProps = {
  onChange: (days: DayType[]) => void;
};

// TODO REMOVE CLASSNAME?
export const DaysGrid: React.FC<DaysGridProps> = ({ onChange }) => {
  return (
    <ThemedView className="gap-2">
      <ThemedText className="">Routine days:</ThemedText>
      <DaysPicker onChange={onChange} />
    </ThemedView>
  );
};
