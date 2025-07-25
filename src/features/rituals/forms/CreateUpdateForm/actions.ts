import { DayType } from "@shared/types/commonTypes";

import { ActionTypes } from "./types";

// TODO as const?
export const setTitle = (title: string) =>
  ({
    type: ActionTypes.SET_TITLE,
    payload: title,
  }) as const;
export const setStartTime = (startTime: number) =>
  ({
    type: ActionTypes.SET_START_TIME,
    payload: startTime,
  }) as const;
export const setExpectedDuration = (expectedDuration: number) =>
  ({
    type: ActionTypes.SET_EXPECTED_DURATION,
    payload: expectedDuration,
  }) as const;
export const setDays = (days: DayType[]) =>
  ({
    type: ActionTypes.SET_DAYS,
    payload: days,
  }) as const;
export const setIsTimeBased = (isTimeBased: boolean) =>
  ({
    type: ActionTypes.SET_IS_TIME_BASED,
    payload: isTimeBased,
  }) as const;
