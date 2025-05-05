import { ActionType } from "./actionModalTypes";
import { useActionModalStore } from "./actionsModalStore";
import { useEffect } from "react";

type UseActionModalProps = {
  actions: ActionType[];
  onReset: () => void;
};

export const useActionModal = ({ actions, onReset }: UseActionModalProps) => {
  const { isOpen, setActions } = useActionModalStore();

  useEffect(() => {
    if (!isOpen) onReset();
    setActions(actions);
  }, [isOpen]);
};
