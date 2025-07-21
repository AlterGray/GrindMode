export const Colors = {
  light: {
    // TEXT
    textPrimary: "#1a1a1d",
    textSecondary: "#4b5563",
    textMuted: "#9ca3af",
    textAccent: "#64748b",
    textWhite: "#ffffff",
    textInverted: "#000",

    // BACKGROUND
    background: "#f9fbfd",
    backgroundSecondary: "#e8ebf0",
    backgroundSurface: "#ffffff",
    bgTransparent: "transparent",

    // LISTS
    listItemBackground: "#ffffff",
    listItemBorder: "#d1d5db",
    selectedListItemBackground: "#e2e8f0",
    selectedListItemBorder: "#cbd5e1",

    // BUTTON VARIANTS
    buttonPrimaryBackground: "#2563eb",
    buttonPrimaryText: "#ffffff",
    buttonPrimaryBorder: "#2563eb",

    buttonSecondaryBackground: "#f3f4f6",
    buttonSecondaryText: "#1a1a1d",
    buttonSecondaryBorder: "#d1d5db",

    buttonTextBackground: "transparent",
    buttonTextText: "#2563eb",
    buttonTextBorder: "transparent",

    buttonDangerBackground: "#f87171",
    buttonDangerText: "#fff",
    buttonDangerBorder: "#dc2626",

    inputBackground: "#ffffff",
    inputText: "#1a1a1d",
    inputPlaceholder: "#9ca3af",

    // BORDERS / UI
    border: "#d1d5db",
    highlight: "#d1d5db",

    // ICONS / TABS
    icon: "#6b7280",
    disabledIcon: "#cbd5e1",
    tabInactive: "#d1d5db",
    tabActive: "#4b5563",
    tabDisabled: "#e5e7eb",

    // STATUS COLORS (List Item)
    statusDone: "#22c55e",
    statusDoneBackground: "#dcfce7",

    statusUndone: "#3b82f6",
    statusUndoneBackground: "#dbeafe",

    statusOverdue: "#f59e0b",
    statusOverdueBackground: "#fffbeb",

    statusFailed: "#ef4444",
    statusFailedBackground: "#fef2f2",

    // COMMON
    primary: "#2563eb",
    primarySoft: "#eff6ff",

    danger: "#dc2626",
    dangerSoft: "#fef2f2",

    warning: "#f59e0b",
    warningSoft: "#fffbeb",

    success: "#22c55e",
    successSoft: "#15803d",

    white: "#fff",
    black: "#1a1c20",

    // HORIZONTAL TAB BAR
    horizontalTabBackground: "#d1d5db",

    // PROGRESS BAR DEFAULT COLORS
    progressBarBackground: "#d1d5db",
    progressBarProgress: "#3b4048",
  },

  dark: {
    // TEXT
    textPrimary: "#e5e7eb",
    textSecondary: "#9ca3af",
    textMuted: "#6b7280",
    textAccent: "#60a5fa",
    textWhite: "#fff",
    textInverted: "#fff",

    // BACKGROUND
    background: "#0f1115",
    backgroundSecondary: "#1a1c20",
    backgroundSurface: "#24282d",
    bgTransparent: "transparent",

    // LISTS
    listItemBackground: "#1a1d22",
    listItemBorder: "#2f333a",
    selectedListItemBackground: "#3b4048",
    selectedListItemBorder: "#64748b",

    // BUTTON VARIANTS
    buttonPrimaryBackground: "#1d4ed8",
    buttonPrimaryText: "#ffffff",
    buttonPrimaryBorder: "#1d4ed8",

    buttonSecondaryBackground: "#374151",
    buttonSecondaryText: "#e5e7eb",
    buttonSecondaryBorder: "#4b5563",

    buttonTextBackground: "transparent",
    buttonTextText: "#3b82f6",
    buttonTextBorder: "transparent",

    buttonDangerBackground: "#7f1d1d",
    buttonDangerText: "#fff",
    buttonDangerBorder: "#ef4444",

    inputBackground: "#23272f",
    inputText: "#e5e7eb",
    inputPlaceholder: "#6b7280",

    // BORDERS / UI
    border: "#3b3f46",
    highlight: "#2a2e34",

    // ICONS / TABS
    icon: "#d1d5db",
    disabledIcon: "#4b5563",
    tabInactive: "#4b5563",
    tabActive: "#d1d5db",
    tabDisabled: "rgba(209, 213, 219, 0.3)",

    // STATUS COLORS (List Item)
    statusDone: "#22c55e",
    statusDoneBackground: "#123824",

    statusUndone: "#3b82f6",
    statusUndoneBackground: "#13294b",

    statusOverdue: "#f59e0b",
    statusOverdueBackground: "#4a3b14",

    statusFailed: "#ef4444",
    statusFailedBackground: "#471014",

    // COMMON
    primary: "#3b82f6",
    primarySoft: "#1e40af",

    danger: "#ef4444",
    dangerSoft: "#b91c1c",

    warning: "#d97706",
    warningSoft: "#4a3510",

    success: "#22c55e",
    successSoft: "#f0fdf4",

    white: "#ffffff",
    black: "#1a1c20",

    // HORIZONTAL TAB BAR
    horizontalTabBackground: "#3b4048",

    // PROGRESS BAR DEFAULT COLORS
    progressBarBackground: "#3b3f46",
    progressBarProgress: "#e2e8f0",
  },

  folderColors: {
    default: {
      light: "#000",
      dark: "#d1d5db",
    },
    red: {
      light: "#FF7F6B",
      dark: "#FF5733",
    },
    amber: {
      light: "#FFCC80",
      dark: "#FFB233",
    },
    yellow: {
      light: "#FFDE7D",
      dark: "#FFD333",
    },
    green: {
      light: "#81C784",
      dark: "#519657",
    },
    lightBlue: {
      light: "#80D6FF",
      dark: "#50A6FF",
    },
    blue: {
      light: "#7DA6FF",
      dark: "#50A6FF",
    },
    pink: {
      light: "#FF80B5",
      dark: "#FF33A6",
    },
  },

  folderColorsNames: [
    "default",
    "red",
    "amber",
    "yellow",
    "green",
    "lightBlue",
    "blue",
    "pink",
  ],

  // TODO replace with light: { highlight: "#34D399", text: "#10B981", background: "#10B981" } etc
  ritualPhaseColors: {
    light: {
      INITIATION: "#f97316",
      CONSOLIDATION: "#FDBA74",
      STABILIZATION: "#81C784",
      DEEP_INTEGRATION: "#34D399",
      HIGHTLIGHT: "#BE4E74",
      SEPARATOR: "#000",
      BACKGROUND: "#FFF",
    },
    dark: {
      INITIATION: "#D9480F",
      CONSOLIDATION: "#F97316",
      STABILIZATION: "#2E7D32",
      DEEP_INTEGRATION: "#10B981",
      HIGHTLIGHT: "#BE708B",
      SEPARATOR: "#fff",
      BACKGROUND: "#000",
    },
  },
};
