import { CompletionEntry } from "@features/rituals/statisticStore";

import { RitualStatuses } from "@shared/types/commonTypes";

export const calculateCompletionRate = (completions: CompletionEntry[]) => {
  const doneCompletionsCount = completions.reduce(
    (acc, c) => (c.status === RitualStatuses.Done ? acc + 1 : acc),
    0,
  );
  const overdueCompletionsCount = completions.reduce(
    (acc, c) => (c.status === RitualStatuses.Overdue ? acc + 1 : acc),
    0,
  );

  return (doneCompletionsCount + overdueCompletionsCount) / completions.length;
};
