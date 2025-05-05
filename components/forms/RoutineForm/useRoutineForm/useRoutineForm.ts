import { RoutineFormValues } from "@/app/types/routineTypes";
import { useReducer } from "react";
import { Action, ActionTypes } from "./types";
import {
  setDays,
  setDescription,
  setExpectedDuration,
  setStartTime,
  setTitle,
} from "./actions";
import { DayType } from "@/app/types/commonTypes";

const reducer = (
  state: RoutineFormValues,
  action: Action,
): RoutineFormValues => {
  switch (action.type) {
    case ActionTypes.SET_TITLE:
      return { ...state, title: action.payload };
    case ActionTypes.SET_DESCRIPTION:
      return { ...state, description: action.payload };
    case ActionTypes.SET_START_TIME:
      return { ...state, startTime: action.payload };
    case ActionTypes.SET_EXPECTED_DURATION:
      return { ...state, expectedDuration: action.payload };
    case ActionTypes.SET_DAYS:
      return { ...state, days: action.payload };
    default:
      return state;
  }
};

export const useRoutineForm = (initialValues: RoutineFormValues) => {
  const [state, dispatch] = useReducer(reducer, initialValues);

  const handleSetTitle = (title: string) => dispatch(setTitle(title));
  const handleSetDescription = (description: string) =>
    dispatch(setDescription(description));
  const handleSetStartTime = (startTime: number) =>
    dispatch(setStartTime(startTime));
  const handleSetExpectedDuration = (expectedDuration: number) =>
    dispatch(setExpectedDuration(expectedDuration));
  const handleSetDays = (days: DayType[]) => dispatch(setDays(days));

  return {
    state,
    setTitle: handleSetTitle,
    setDescription: handleSetDescription,
    setStartTime: handleSetStartTime,
    setExpectedDuration: handleSetExpectedDuration,
    setDays: handleSetDays,
  };
};
