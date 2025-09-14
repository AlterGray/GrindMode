import { View } from "react-native";

import TimeList from "@features/time/TimeList";
import Timer from "@features/time/Timer";

import { ROUTES } from "@shared/constants/routes";
import { i18n } from "@shared/lib/utils/i18n/i18n-js";
import { RouteType } from "@shared/types/commonTypes";
import CreateButton from "@shared/ui/CreateButton";

const Time = () => {
  const routes: Record<string, RouteType> = {
    timer: ROUTES.CREATE_TIMER,
    tracker: ROUTES.CREATE_TRACKER,
  };

  return (
    <View className="flex-1">
      <View className="flex-1">
        <Timer startDuration={30} />
        <TimeList />
      </View>

      <CreateButton
        options={[
          { label: i18n.t("timer"), value: "timer" },
          { label: i18n.t("tracker"), value: "tracker" },
        ]}
        routes={routes}
      />
    </View>
  );
};

export default Time;
