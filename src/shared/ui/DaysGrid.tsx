import { DayType } from "@shared/types/commonTypes";
import DaysPicker from "./DaysPicker/DaysPicker";
import ThemedText from "./ThemedText";
import ThemedView from "./ThemedView";

type DaysGridProps = {
  items: DayType[];
  onChange: (days: DayType[]) => void;
};

const DaysGrid: React.FC<DaysGridProps> = ({ items, onChange }) => {
  return (
    <ThemedView className="gap-2">
      <ThemedText className="">Routine days:</ThemedText>
      <DaysPicker
        onChange={onChange}
        initialItems={items.length ? items : []}
      />
    </ThemedView>
  );
};

export default DaysGrid;
