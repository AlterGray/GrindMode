import React from "react";
import { ScrollView, View } from "react-native";

import AchivementList from "@features/proofs/Achivement/AchivementList";
import DisciplineMetrics from "@features/proofs/DisciplineMetrics/DisciplineMetrics";
import Header from "@features/proofs/Header";
import PhaseDistirbution from "@features/proofs/PhaseDistribution/PhaseDistirbution";
import ProgressRow from "@features/proofs/ProgressRow";

import HorizontalTabBar from "@shared/ui/HorizontalTabBar";

const proofs = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  const tabs = [
    { label: "This week" },
    { label: "This month" },
    { label: "This year" },
    { label: "All time" },
  ];

  return (
    <ScrollView className="bg-white dark:bg-black px-8">
      <View className="gap-4 pt-6">
        <Header />
        <HorizontalTabBar
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        <View className="gap-10">
          {/* Responsive Ring Group */}
          <ProgressRow />

          <PhaseDistirbution />
          <DisciplineMetrics />
          <AchivementList />
        </View>
      </View>
    </ScrollView>
  );
};

export default proofs;
