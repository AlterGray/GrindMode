import { useCallback, useReducer } from "react";

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

  const handleSetTitle = useCallback(
    (title: string) => dispatch(setTitle(title)),
    [dispatch],
  );
  const handleSetStartTime = useCallback(
    (startTime: number) => dispatch(setStartTime(startTime)),
    [dispatch],
  );
  const handleSetExpectedDuration = useCallback(
    (expectedDuration: number) =>
      dispatch(setExpectedDuration(expectedDuration)),
    [dispatch],
  );
  const handleSetDays = useCallback(
    (days: DayType[]) => dispatch(setDays(days)),
    [dispatch],
  );
  const handleSetIsTimeBased = useCallback(
    (isTimeBased: boolean) => dispatch(setIsTimeBased(isTimeBased)),
    [dispatch],
  );

  return {
    state,
    setTitle: handleSetTitle,
    setStartTime: handleSetStartTime,
    setExpectedDuration: handleSetExpectedDuration,
    setDays: handleSetDays,
    setIsTimeBased: handleSetIsTimeBased,
  };
};
