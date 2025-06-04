export const Colors = {
  light: {
    // TEXT
    textPrimary: "#1a1a1d",
    textSecondary: "#4b5563",
    textMuted: "#9ca3af",
    textAccent: "#64748b",

    // BACKGROUND
    background: "#f8fafc",
    backgroundSecondary: "#e5e7eb",
    backgroundSurface: "#ffffff",

    // LISTS
    listItemBackground: "#ffffff",
    listItemBorder: "#d1d5db",
    selectedListItemBackground: "#e2e8f0",
    selectedListItemBorder: "#cbd5e1",

    // BUTTON VARIANTS
    buttonPrimaryBackground: "#3b82f6",
    buttonPrimaryText: "#ffffff",
    buttonPrimaryBorder: "#3b82f6",

    buttonSecondaryBackground: "#e5e7eb",
    buttonSecondaryText: "#1a1a1d",
    buttonSecondaryBorder: "#cbd5e1",

    buttonTextBackground: "transparent",
    buttonTextText: "#3b82f6",
    buttonTextBorder: "transparent",

    buttonDangerBackground: "#fca5a5",
    buttonDangerText: "#b91c1c",
    buttonDangerBorder: "#f87171",

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
    disabledTab: "#e5e7eb",

    // STATUS COLORS (List Item)
    statusDone: "#22c55e", // green-500
    statusDoneBackground: "#dcfce7", // green-50

    statusUndone: "#3b82f6", // blue-500
    statusUndoneBackground: "#dbeafe", // blue-50

    statusOverdue: "#f59e0b", // amber-500
    statusOverdueBackground: "#fffbeb", // amber-50

    statusFailed: "#ef4444", // red-500
    statusFailedBackground: "#fef2f2", // red-50

    // COMMON
    primary: "#3b82f6", // strong blue for icons/text
    primarySoft: "#eff6ff", // soft/light blue background

    danger: "#ef4444", // strong red for icons/text
    dangerSoft: "#fef2f2", // soft/light red background

    warning: "#f59e0b", // strong orange for icons/text
    warningSoft: "#fffbeb", // soft/light orange background

    success: "#22c55e", // strong green for icons/text
    successSoft: "#f0fdf4", // soft/light green background
  },

  dark: {
    // TEXT
    textPrimary: "#e5e7eb",
    textSecondary: "#9ca3af",
    textMuted: "#6b7280",
    textAccent: "#64748b",

    // BACKGROUND
    background: "#101317",
    backgroundSecondary: "#1c1f24",
    backgroundSurface: "#24282d",

    // LISTS
    listItemBackground: "#1a1d22",
    listItemBorder: "#2f333a",
    selectedListItemBackground: "#3b4048",
    selectedListItemBorder: "#64748b",

    // BUTTON VARIANTS
    buttonPrimaryBackground: "#2563eb",
    buttonPrimaryText: "#ffffff",
    buttonPrimaryBorder: "#2563eb",

    buttonSecondaryBackground: "#374151",
    buttonSecondaryText: "#e5e7eb",
    buttonSecondaryBorder: "#4b5563",

    buttonTextBackground: "transparent",
    buttonTextText: "#2563eb",
    buttonTextBorder: "transparent",

    buttonDangerBackground: "#7f1d1d",
    buttonDangerText: "#fecaca",
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
    disabledTab: "rgba(209, 213, 219, 0.3)",

    // STATUS COLORS (List Item)
    statusDone: "#22c55e",
    statusDoneBackground: "#123824", // slightly lighter green background

    statusUndone: "#3b82f6",
    statusUndoneBackground: "#13294b", // slightly lighter blue background

    statusOverdue: "#f59e0b", // amber-500
    statusOverdueBackground: "#4a3b14", // warm dark amber-like background

    statusFailed: "#ef4444", // red-500
    statusFailedBackground: "#471014", // slightly lighter red background

    // COMMON — opacity removed, замінено на більш суцільні відтінки
    primary: "#3b82f6",
    primarySoft: "#1e40af", // темніший синій без opacity

    danger: "#ef4444",
    dangerSoft: "#b91c1c", // темний червоний без opacity

    warning: "#f59e0b",
    warningSoft: "#b45309", // темний оранжевий без opacity

    success: "#22c55e",
    successSoft: "#15803d", // темний зелений без opacity
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

  routinePhaseColors: {
    INITIATION: {
      light: "#F87171", // red-400
      dark: "#EF4444", // red-500
    },
    CONSOLIDATION: {
      light: "#FDBA74", // orange-300
      dark: "#FB923C", // orange-500
    },
    STABILIZATION: {
      light: "#81C784", // green-300
      dark: "#519657", // green-600
    },
    DEEP_INTEGRATION: {
      light: "#7DA6FF", // blue-300
      dark: "#50A6FF", // blue-500
    },
  },
};
