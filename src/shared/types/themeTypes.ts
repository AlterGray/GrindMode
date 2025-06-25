import { Colors } from "@shared/constants/Colors";

export type Theme = typeof Colors.light;
export type ColorName = keyof Theme;

export type RitualPhaseColorName = keyof typeof Colors.ritualPhaseColors;
