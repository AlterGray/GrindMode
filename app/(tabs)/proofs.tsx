import React, { useCallback, useMemo, useState } from "react";
import Animated from "react-native-reanimated";

import DisciplineMetrics from "@features/proofs/DisciplineMetrics/DisciplineMetrics";
import Header from "@features/proofs/Header";
import PhaseDistirbution from "@features/proofs/PhaseDistribution/PhaseDistirbution";
import {
  findFirstDay,
  getActiveDaysCount,
} from "@features/proofs/utils/common";
import { useRitualStore } from "@features/rituals/ritualStore";
import { useRitualStatisticStore } from "@features/rituals/statisticStore";

import { useAnimatedColor } from "@shared/hooks/useAnimatedColor";
import { getDaysDiff } from "@shared/lib/utils/date";
import { i18n } from "@shared/lib/utils/i18n/i18n-js";
import AnimatedThemedView from "@shared/ui/AnimatedThemedView";
import HorizontalTabBar from "@shared/ui/HorizontalTabBar";

// TODO add exhoustive checks?
export enum TimeFilter {
  LAST_7_DAYS = "last_7_days",
  LAST_30_DAYS = "last_30_days",
  LAST_365_DAYS = "last_365_days",
  ALL_TIME = "all_time",
}
export const TimeFilterMap = {
  [TimeFilter.LAST_7_DAYS]: { label: "sevenDays", days: 7 },
  [TimeFilter.LAST_30_DAYS]: { label: "thirtyDays", days: 30 },
  [TimeFilter.LAST_365_DAYS]: { label: "threeHundredSixtyFiveDays", days: 365 },
  [TimeFilter.ALL_TIME]: { label: "allTime", days: -1 }, // TODO
};

const proofs = () => {
  const [activeTab, setActiveTab] = useState(TimeFilter.LAST_7_DAYS);
  const statistic = useRitualStatisticStore((state) => state.statistics);

  const tabs = useMemo(() => {
    return Object.values(TimeFilter).map((value) => {
      const filterDaysCount = TimeFilterMap[value].days;
      const activeDaysCount = getActiveDaysCount(statistic, filterDaysCount);
      const isDaysEnough = filterDaysCount <= activeDaysCount;

      return {
        label: i18n.t(TimeFilterMap[value].label),
        isWarning:
          filterDaysCount === -1 ? activeDaysCount === 0 : !isDaysEnough,
        id: value,
      };
    });
  }, [
    statistic
      .map((s) => s.completitions)
      .flat()
      .map((c) => c.date + c.isDeleted + c.status)
      .join(""),
  ]);

  const rituals = useRitualStore((state) => state.rituals);

  const animatedBgColor = useAnimatedColor("backgroundSurface");

  const totalAvailableDays = useMemo(
    () => getDaysDiff(new Date(), new Date(findFirstDay(statistic))) + 1,
    [
      statistic
        .map((s) => s.completitions)
        .flat()
        .map((c) => c.date + c.isDeleted + c.status)
        .join(""),
    ],
  );
  const days = useMemo(
    () => TimeFilterMap[activeTab].days,
    [totalAvailableDays],
  );

  const onChangeTab = useCallback((id: string) => {
    setActiveTab(id as TimeFilter);
  }, []);

  return (
    <Animated.ScrollView style={animatedBgColor} className={"px-4"}>
      <AnimatedThemedView className="gap-4 pt-6">
        <Header />
        <HorizontalTabBar
          tabs={tabs}
          activeTab={activeTab}
          onChange={onChangeTab}
        />
        {/* // TODO add exhoustive checks? enum ProofsTimeFilters = */}
        <AnimatedThemedView className="gap-4">
          <DisciplineMetrics days={days} />
          <PhaseDistirbution rituals={rituals} />

          {/* <AchivementList /> */}
        </AnimatedThemedView>
      </AnimatedThemedView>
    </Animated.ScrollView>
  );
};

export default proofs;
