import { ROUTES } from "@shared/constants/routes";
import { i18n } from "@shared/lib/utils/i18n/i18n-js";
import { RouteType } from "@shared/types/commonTypes";
import CreateButton from "@shared/ui/CreateButton";
import ThemedView from "@shared/ui/ThemedView";

const Time = () => {
  const routes: Record<string, RouteType> = {
    timer: ROUTES.CREATE_TIMER,
    tracker: ROUTES.CREATE_TRACKER,
  };
  return (
    <ThemedView className="flex-1">
      <CreateButton
        options={[
          { label: i18n.t("timer"), value: "timer" },
          { label: i18n.t("tracker"), value: "tracker" },
        ]}
        routes={routes}
      />
    </ThemedView>
  );
};

export default Time;
