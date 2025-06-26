import React, { useState } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

import DisciplineMetrics from "@features/proofs/DisciplineMetrics/DisciplineMetrics";
import Header from "@features/proofs/Header";
import PhaseDistirbution from "@features/proofs/PhaseDistribution/PhaseDistirbution";
import { getActiveDaysCount } from "@features/proofs/utils/common";
import { useRitualStore } from "@features/rituals/ritualStore";
import { useRitualStatisticStore } from "@features/rituals/statisticStore";

import { useAnimatedColor } from "@shared/hooks/useAnimatedColor";
import HorizontalTabBar from "@shared/ui/HorizontalTabBar";

// TODO add exhoustive checks?
export enum TimeFilter {
  LAST_7_DAYS = "last_7_days",
  LAST_30_DAYS = "last_30_days",
  LAST_365_DAYS = "last_365_days",
  ALL_TIME = "all_time",
}
export const TimeFilterMap = {
  [TimeFilter.LAST_7_DAYS]: { label: "7 Days", days: 7 },
  [TimeFilter.LAST_30_DAYS]: { label: "30 Days", days: 30 },
  [TimeFilter.LAST_365_DAYS]: { label: "365 Days", days: 365 },
  [TimeFilter.ALL_TIME]: { label: "All Time", days: -1 }, // TODO
};

const proofs = () => {
  const [activeTab, setActiveTab] = useState(TimeFilter.LAST_7_DAYS);
  const statistic = useRitualStatisticStore((state) => state.statistics);

  const tabs = Object.values(TimeFilter).map((value) => ({
    label: TimeFilterMap[value].label,
    isWarning:
      TimeFilterMap[value].days >
      getActiveDaysCount(statistic, TimeFilterMap[value].days),
    isDisabled: false,
    id: value,
  }));

  const rituals = useRitualStore((state) => state.rituals);

  const animatedStyles = useAnimatedColor("backgroundSurface");

  return (
    <Animated.ScrollView style={animatedStyles} className={"px-4"}>
      <View className="gap-4 pt-6">
        <Header />
        <HorizontalTabBar
          tabs={tabs}
          activeTab={activeTab}
          onChange={(id) => setActiveTab(id as TimeFilter)}
        />
        {/* // TODO add exhoustive checks? enum ProofsTimeFilters = */}
        <View className="gap-4">
          <DisciplineMetrics days={TimeFilterMap[activeTab].days} />
          <PhaseDistirbution rituals={rituals} />

          {/* <AchivementList /> */}
        </View>
      </View>
    </Animated.ScrollView>
  );
};

export default proofs;
