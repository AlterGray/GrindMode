import { RitualPhase } from "./ritualTypes";

// TODO rename to RitualPhaseMap
export const RitualPhaseMap: Record<
  RitualPhase,
  {
    label: string;
    from: number;
    to: number;
    value: number;
  }
> = {
  [RitualPhase.Initiation]: {
    label: "Initiation",
    from: 0,
    to: 14,
    value: 1,
  },
  [RitualPhase.Consolidation]: {
    label: "Consolidation",
    from: 15,
    to: 60,
    value: 2,
  },
  [RitualPhase.Stabilization]: {
    label: "Stabilization",
    from: 61,
    to: 90,
    value: 3,
  },
  [RitualPhase.DeepIntegration]: {
    label: "Deep integration",
    from: 91,
    to: -1,
    value: 4,
  },
};

export const OrderedRitualPhases = [
  RitualPhase.Initiation,
  RitualPhase.Consolidation,
  RitualPhase.Stabilization,
  RitualPhase.DeepIntegration,
];
