import { ActionType } from "@/app/types/actionModalTypes";
import { useActionModalStore } from "@/stores/actionsModalStore";
import { useEffect } from "react";

type UseActionDialogProps = {
  actions: ActionType[];
  onReset: () => void;
};

export const useActionDialog = ({ actions, onReset }: UseActionDialogProps) => {
  const { isOpen, setActions } = useActionModalStore();

  useEffect(() => {
    if (!isOpen) onReset();
    setActions(actions);
  }, [isOpen]);
};
