import { CompletionEntry } from "@features/routine/routineStatisticStore";

import { RoutineStatuses } from "@shared/types/commonTypes";

export const calculateCompletionRate = (completions: CompletionEntry[]) => {
  const doneCompletionsCount = completions.reduce(
    (acc, c) => (c.status === RoutineStatuses.Done ? acc + 1 : acc),
    0,
  );
  const overdueCompletionsCount = completions.reduce(
    (acc, c) => (c.status === RoutineStatuses.Overdue ? acc + 1 : acc),
    0,
  );

  return (doneCompletionsCount + overdueCompletionsCount) / completions.length;
};
