import { useEffect, useRef } from "react";

import { useRoutinesWithStatus } from "./hooks/useRoutinesWithStatus";
import { useRoutineStore } from "./routineStore";

export const useRoutineDayWatcher = () => {
  const setRoutineStatus = useRoutineStore((state) => state.setRoutineStatus);
  const prevDateRef = useRef(new Date());
  const routinesWithStatus = useRoutinesWithStatus();

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
        routinesWithStatus.forEach((routine) =>
          setRoutineStatus(routine.id, routine.status),
        );
      }
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);
};
