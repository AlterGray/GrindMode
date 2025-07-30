import React, { memo, useMemo } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

import { i18n } from "@shared/lib/utils/i18n/i18n-js";
import AnimatedThemedText from "@shared/ui/AnimatedThemedText";

import PhaseBadge from "../PhaseBadge";
import RitualStatus from "../RitualStatus";
import { Ritual } from "../ritualTypes";

type RitualContentProps = {
  item: Ritual;
  textColor: Partial<{ color: string }>;
};

const RitualContent: React.FC<RitualContentProps> = ({ item, textColor }) => {
  const formatedStartTime = useMemo(
    () =>
      new Date(item.startTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    [item.startTime],
  );

  return (
    <View className="gap-1">
      <View className="gap-2">
        <View className="flex-row w-full justify-between">
          <RitualStatus key={item.status} status={item.status} />
          <Animated.Text style={textColor}>
            {item.isTimeBased
              ? `Start at ${formatedStartTime}`
              : i18n.t("noTimeLimits")}
          </Animated.Text>
        </View>
        <AnimatedThemedText className="text-lg">
          {item.title}
        </AnimatedThemedText>
      </View>
      <PhaseBadge ritualId={item.id} />
    </View>
  );
};

export default memo(RitualContent);
