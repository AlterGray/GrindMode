import { RoutinePhase } from "./routineTypes";

export const RoutinePhaseMap: Record<
  RoutinePhase,
  {
    label: string;
    from: number;
    to: number;
  }
> = {
  [RoutinePhase.Initiation]: {
    label: "Initiation",
    from: 0,
    to: 14,
  },
  [RoutinePhase.Consolidation]: {
    label: "Consolidation",
    from: 15,
    to: 60,
  },
  [RoutinePhase.Stabilization]: {
    label: "Stabilization",
    from: 61,
    to: 90,
  },
  [RoutinePhase.DeepIntegration]: {
    label: "Deep integration",
    from: 91,
    to: -1,
  },
};

export const OrderedRoutinePhases = [
  RoutinePhase.Initiation,
  RoutinePhase.Consolidation,
  RoutinePhase.Stabilization,
  RoutinePhase.DeepIntegration,
];
