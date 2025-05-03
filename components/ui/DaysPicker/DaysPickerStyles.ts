const getSizeClass = (size: "small" | "regular") => {
  return size === "regular" ? "w-8 h-8" : "w-6 h-6";
};

const getStyle = (isActive: boolean, size: "small" | "regular") => {
  const base =
    "align-middle justify-center items-center rounded-full border-hairline";
  const sizeClass = getSizeClass(size);

  const stateClass = isActive
    ? "border-light-tabActive bg-light-backgroundSurface dark:border-dark-textPrimary dark:bg-dark-backgroundSecondary"
    : "border-light-border bg-light-background dark:border-dark-border dark:bg-dark-backgroundSurface";

  return `${base} ${sizeClass} ${stateClass}`;
};

export { getSizeClass, getStyle };
