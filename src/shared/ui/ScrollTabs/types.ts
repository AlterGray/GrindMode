import { DragEndParams } from "react-native-draggable-flatlist";
import { PopoverMenuItem } from "../PopoverMenu/types";

type TabItemProps = {
  title: string;
  color: string;
  isActive: boolean;
  onPress: () => void;
  onClose: () => void;
  isReordering: boolean;
  menuItems: PopoverMenuItem[];
  onLongPress: () => void;
};

type DraggableItem = {
  id: string;
  title: string;
  color: string;
  menuItems: PopoverMenuItem[];
};

type ScrollTabsItem = {
  id: string;
  title: string;
  order?: number;
  content: React.ReactNode;
  menuItems: PopoverMenuItem[];
};

// TODO improve to make using is easy and consice
type ScrollTabsProps = {
  tabs: {
    id: string;
    title: string;
    color: string;
    order?: number;
    content: React.ReactNode;
    menuItems: PopoverMenuItem[];
  }[];
  isReordering: boolean;
  onCloseTab: (index: string) => void;
  onDragEnd: (item: DragEndParams<ScrollTabsItem>) => void;
};

export type { TabItemProps, ScrollTabsItem, DraggableItem, ScrollTabsProps };
