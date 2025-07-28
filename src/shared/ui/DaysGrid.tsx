import { i18n } from "@shared/lib/i18n-js";
import { DayType } from "@shared/types/commonTypes";

import AnimatedThemedText from "./AnimatedThemedText";
import AnimatedThemedView from "./AnimatedThemedView";
import DaysPicker from "./DaysPicker/DaysPicker";

type DaysGridProps = {
  items: DayType[];
  onChange: (days: DayType[]) => void;
};

const DaysGrid: React.FC<DaysGridProps> = ({ items, onChange }) => {
  return (
    <AnimatedThemedView className="gap-2">
      {/* TODO in order to avoid renaming problems like in this commit, keep it as constant */}
      <AnimatedThemedText>{i18n.t("ritualDays")}</AnimatedThemedText>
      <DaysPicker
        onChange={onChange}
        initialItems={items.length ? items : []}
      />
    </AnimatedThemedView>
  );
};

export default DaysGrid;
