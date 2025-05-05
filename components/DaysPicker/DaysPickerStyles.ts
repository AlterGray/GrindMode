const getSizeClass = (size: "small" | "regular") => {
  return size === "regular" ? "w-8 h-8" : "w-6 h-6";
};

const getStyle = (isActive: boolean, size: "small" | "regular") => {
  const base = "justify-center items-center rounded-full border";

  const sizeClass = size === "regular" ? "w-8 h-8" : "w-6 h-6";

  const stateClass = isActive
    ? "border-light-tabActive bg-light-selectedListItemBackground dark:border-dark-tabActive dark:bg-dark-selectedListItemBackground"
    : "border-light-border bg-light-background dark:border-dark-border dark:bg-dark-background";

  return `${base} ${sizeClass} ${stateClass}`;
};

export { getSizeClass, getStyle };
