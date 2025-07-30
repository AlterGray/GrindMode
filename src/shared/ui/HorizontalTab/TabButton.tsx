import { memo } from "react";

import { Tooltip } from "@features/rituals/Tooltip";

import { useAnimatedColor } from "@shared/hooks/useAnimatedColor";
import { i18n } from "@shared/lib/utils/i18n/i18n-js";
import AnimatedThemedText from "@shared/ui/AnimatedThemedText";

import { AnimatedPressable } from "../AnimatedComponents/AnimatedReactComponents";

type TabButtonProps = {
  isActive: boolean;
  tab: { label: string; isWarning: boolean; id: string };
  onChange: (id: string) => void;
};

export const TabButton: React.FC<TabButtonProps> = ({
  isActive,
  tab,
  onChange,
}) => {
  const getAnimatedActiveBgColor = (active: boolean) =>
    useAnimatedColor(active ? "horizontalTabBackground" : "backgroundSurface");

  return (
    <AnimatedPressable
      key={tab.id}
      style={getAnimatedActiveBgColor(isActive)}
      onPress={() => {
        onChange(tab.id);
      }}
      className={"flex-row justify-around p-2 flex-auto"}
    >
      <AnimatedThemedText className="text-center font-medium">
        {tab.label}
      </AnimatedThemedText>
      {/* TODO change colors as it hard to see */}
      {tab.isWarning && isActive && (
        <Tooltip
          text={i18n.t("dontHaveEnoughtDays")}
          iconName="alert-circle-outline"
          variant="warning"
        />
      )}
    </AnimatedPressable>
  );
};

export default memo(TabButton);
