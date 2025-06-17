import { RoutinePhase } from "./routineTypes";

// TODO rename to RitualPhaseMap
export const RoutinePhaseMap: Record<
  RoutinePhase,
  {
    label: string;
    from: number;
    to: number;
    value: number;
  }
> = {
  [RoutinePhase.Initiation]: {
    label: "Initiation",
    from: 0,
    to: 14,
    value: 1,
  },
  [RoutinePhase.Consolidation]: {
    label: "Consolidation",
    from: 15,
    to: 60,
    value: 2,
  },
  [RoutinePhase.Stabilization]: {
    label: "Stabilization",
    from: 61,
    to: 90,
    value: 3,
  },
  [RoutinePhase.DeepIntegration]: {
    label: "Deep integration",
    from: 91,
    to: -1,
    value: 4,
  },
};

export const OrderedRoutinePhases = [
  RoutinePhase.Initiation,
  RoutinePhase.Consolidation,
  RoutinePhase.Stabilization,
  RoutinePhase.DeepIntegration,
];
