import { ActionType } from "./actionModalTypes";
import { useActionModalStore } from "./actionsModalStore";
import { useEffect } from "react";
import { PopoverMenuItem } from "./PopoverMenu";

type UseActionModalProps = {
  actions: ActionType[];
  onReset: () => void;
  isMenuAction: boolean;
  menuActions: PopoverMenuItem[];
};

export const useActionModal = ({
  actions,
  onReset,
  isMenuAction,
  menuActions,
}: UseActionModalProps) => {
  const { isOpen, setActions, setIsMenuAction, setMenuActions } =
    useActionModalStore();

  useEffect(() => {
    if (!isOpen) onReset();

    setActions(actions);
    setMenuActions(menuActions);
    setIsMenuAction(isMenuAction);
  }, [isOpen]);
};
