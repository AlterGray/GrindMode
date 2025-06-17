import { useEffect, useRef } from "react";

import { useRitualStore } from "../ritualStore";
import { useRitualsWithStatus } from "./useRitualsWithStatus";

export const useRitualDayWatcher = () => {
  const setRitualStatus = useRitualStore((state) => state.setRitualStatus);
  const prevDateRef = useRef(new Date());
  const ritualsWithStatus = useRitualsWithStatus();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const prev = prevDateRef.current;
      const isNewDay =
        now.getDate() !== prev.getDate() ||
        now.getMonth() !== prev.getMonth() ||
        now.getFullYear() !== prev.getFullYear();

      if (isNewDay) {
        prevDateRef.current = now;
        ritualsWithStatus.forEach((ritual) =>
          setRitualStatus(ritual.id, ritual.status),
        );
      }
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);
};
