import React from "react";
import { View } from "react-native";

import { router } from "expo-router";

import { ROUTES } from "@shared/constants/routes";
import { i18n } from "@shared/lib/utils/i18n/i18n-js";
import StyledButton from "@shared/ui/StyledButton";
import StyledList from "@shared/ui/StyledList/StyledList";

const TimeList: React.FC = () => {
  const buttons = [
    // TODO aninimate separator for OptionsList
    <StyledButton
      title={i18n.t("createTimer")}
      onPress={() => router.push(ROUTES.CREATE_TIMER)}
      variant="secondary-text-5"
    />,
    <StyledButton
      title={i18n.t("createTracker")}
      onPress={() => router.push(ROUTES.CREATE_TRACKER)}
      variant="secondary-text-5"
    />,
  ];

  return (
    <View className="flex-1">
      <StyledList
        isSelecting
        onPress={() => {}}
        data={[]}
        toggleItem={() => {}}
        actionButtons={buttons}
      />
    </View>
  );
};

export default TimeList;
