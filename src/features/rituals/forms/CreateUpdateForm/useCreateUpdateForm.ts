import { useReducer } from "react";

import { RitualFormValues } from "@features/rituals/ritualTypes";

import { DayType } from "@shared/types/commonTypes";

import {
  setDays,
  setExpectedDuration,
  setIsTimeBased,
  setStartTime,
  setTitle,
} from "./actions";
import { Action, ActionTypes } from "./types";

const reducer = (state: RitualFormValues, action: Action): RitualFormValues => {
  switch (action.type) {
    case ActionTypes.SET_TITLE:
      return { ...state, title: action.payload };
    case ActionTypes.SET_START_TIME:
      return { ...state, startTime: action.payload };
    case ActionTypes.SET_EXPECTED_DURATION:
      return { ...state, expectedDuration: action.payload };
    case ActionTypes.SET_DAYS:
      return { ...state, days: action.payload };
    case ActionTypes.SET_IS_TIME_BASED:
      return { ...state, isTimeBased: action.payload };
    default:
      return state;
  }
};

export const useCreateUpdateForm = (initialValues: RitualFormValues) => {
  const [state, dispatch] = useReducer(reducer, initialValues);

  const handleSetTitle = (title: string) => dispatch(setTitle(title));
  const handleSetStartTime = (startTime: number) =>
    dispatch(setStartTime(startTime));
  const handleSetExpectedDuration = (expectedDuration: number) =>
    dispatch(setExpectedDuration(expectedDuration));
  const handleSetDays = (days: DayType[]) => dispatch(setDays(days));
  const handleSetIsTimeBased = (isTimeBased: boolean) =>
    dispatch(setIsTimeBased(isTimeBased));

  return {
    state,
    setTitle: handleSetTitle,
    setStartTime: handleSetStartTime,
    setExpectedDuration: handleSetExpectedDuration,
    setDays: handleSetDays,
    setIsTimeBased: handleSetIsTimeBased,
  };
};
