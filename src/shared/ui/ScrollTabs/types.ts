import { DragEndParams } from "react-native-draggable-flatlist";
import { PopoverMenuItem } from "../ActionsModal/PopoverMenu";

type TabItemProps = {
  title: string;
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
  menuItems: PopoverMenuItem[];
};

type DraggableItemProps<T> = {
  item: T;
  selectedTab: string;
  isReordering: boolean;
  onPress: (id: string) => void;
  onClose: (id: string) => void;
  drag: () => void;
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
    order?: number;
    content: React.ReactNode;
    menuItems: PopoverMenuItem[];
  }[];
  isReordering: boolean;
  onCloseTab: (index: string) => void;
  onDragEnd: (item: DragEndParams<ScrollTabsItem>) => void;
};

export type {
  TabItemProps,
  ScrollTabsItem,
  DraggableItem,
  DraggableItemProps,
  ScrollTabsProps,
};
