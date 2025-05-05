import { DayType } from "@/app/types/commonTypes";
import { ActionTypes } from "./types";

// TODO as const?
const setTitle = (title: string) =>
  ({
    type: ActionTypes.SET_TITLE,
    payload: title,
  }) as const;
const setDescription = (description: string) =>
  ({
    type: ActionTypes.SET_DESCRIPTION,
    payload: description,
  }) as const;
const setStartTime = (startTime: number) =>
  ({
    type: ActionTypes.SET_START_TIME,
    payload: startTime,
  }) as const;
const setExpectedDuration = (expectedDuration: number) =>
  ({
    type: ActionTypes.SET_EXPECTED_DURATION,
    payload: expectedDuration,
  }) as const;
const setDays = (days: DayType[]) =>
  ({
    type: ActionTypes.SET_DAYS,
    payload: days,
  }) as const;

export { setTitle, setDescription, setStartTime, setExpectedDuration, setDays };
