import React, { useState } from "react";
import { ScrollView, View } from "react-native";

import DisciplineMetrics from "@features/proofs/DisciplineMetrics/DisciplineMetrics";
import Header from "@features/proofs/Header";
import PhaseDistirbution from "@features/proofs/PhaseDistribution/PhaseDistirbution";
import { useRoutineStore } from "@features/routine/routineStore";

import HorizontalTabBar from "@shared/ui/HorizontalTabBar";

// TODO add exhoustive checks?
export enum TimeFilter {
  LAST_7_DAYS = "last_7_days",
  LAST_30_DAYS = "last_30_days",
  PICK_DATE = "pick",
}
export const TimeFilterLabels = {
  [TimeFilter.LAST_7_DAYS]: "Last 7 Days",
  [TimeFilter.LAST_30_DAYS]: "Last 30 Days",
  [TimeFilter.PICK_DATE]: "Pick Date",
};

const proofs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = Object.values(TimeFilter).map((value) => ({
    label: TimeFilterLabels[value],
    value: value,
    isDisabled: true,
  }));

  const rituals = useRoutineStore((state) => state.routines);

  return (
    <ScrollView className="bg-white dark:bg-black px-4">
      <View className="gap-4 pt-6">
        <Header />
        <HorizontalTabBar
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
        {/* // TODO add exhoustive checks? enum ProofsTimeFilters = */}
        <View className="gap-4">
          <DisciplineMetrics days={7} />
          <PhaseDistirbution rituals={rituals} />

          {/* <AchivementList /> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default proofs;
