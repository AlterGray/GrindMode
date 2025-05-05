import { DayType } from "@/app/types/commonTypes";

enum ActionTypes {
  SET_TITLE = "SET_TITLE",
  SET_DESCRIPTION = "SET_DESCRIPTION",
  SET_START_TIME = "SET_START_TIME",
  SET_EXPECTED_DURATION = "SET_EXPECTED_DURATION",
  SET_DAYS = "SET_DAYS",
}

// TODO check syntax?
type Action =
  | { type: ActionTypes.SET_TITLE; payload: string }
  | { type: ActionTypes.SET_DESCRIPTION; payload: string }
  | { type: ActionTypes.SET_START_TIME; payload: number }
  | { type: ActionTypes.SET_EXPECTED_DURATION; payload: number }
  | { type: ActionTypes.SET_DAYS; payload: DayType[] };

export { ActionTypes, Action };
