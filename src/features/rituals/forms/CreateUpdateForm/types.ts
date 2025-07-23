import { DayType } from "@shared/types/commonTypes";

export enum ActionTypes {
  SET_TITLE = "SET_TITLE",
  SET_START_TIME = "SET_START_TIME",
  SET_EXPECTED_DURATION = "SET_EXPECTED_DURATION",
  SET_DAYS = "SET_DAYS",
  SET_IS_TIME_BASED = "SET_IS_TIME_BASED",
}

// TODO check syntax?
export type Action =
  | { type: ActionTypes.SET_TITLE; payload: string }
  | { type: ActionTypes.SET_START_TIME; payload: number }
  | { type: ActionTypes.SET_EXPECTED_DURATION; payload: number }
  | { type: ActionTypes.SET_DAYS; payload: DayType[] }
  | { type: ActionTypes.SET_IS_TIME_BASED; payload: boolean };
