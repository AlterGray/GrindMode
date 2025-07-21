import { DayType } from "@shared/types/commonTypes";

import AnimatedThemedView from "./AnimatedThemedView";
import DaysPicker from "./DaysPicker/DaysPicker";
import AnimatedThemedText from "./ThemedText";

type DaysGridProps = {
  items: DayType[];
  onChange: (days: DayType[]) => void;
};

const DaysGrid: React.FC<DaysGridProps> = ({ items, onChange }) => {
  return (
    <AnimatedThemedView className="gap-2">
      {/* TODO in order to avoid renaming problems like in this commit, keep it as constant */}
      <AnimatedThemedText className="">Ritual days:</AnimatedThemedText>
      <DaysPicker
        onChange={onChange}
        initialItems={items.length ? items : []}
      />
    </AnimatedThemedView>
  );
};

export default DaysGrid;
