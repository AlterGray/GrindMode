import { DragEndParams } from "react-native-draggable-flatlist";

import { PopoverMenuItem } from "@shared/ui/PopoverMenu/types";

type TabItemProps = {
  title: string;
  color: string;
  isActive: boolean;
  onPress: () => void;
  onClose: () => void;
  isReordering: boolean;
  menuItems: PopoverMenuItem[];
  onLongPress: () => void;
  filteredTitles: string[];
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
  selectedTab: string;
  tabs: {
    id: string;
    title: string;
    color: string;
    order?: number;
    content: React.ReactNode;
    menuItems: PopoverMenuItem[];
  }[];
  filteredTitles?: string[];
  isReordering: boolean;
  onPress: (itemId: string) => void;
  onCloseTab: (index: string) => void;
  onDragEnd: (item: DragEndParams<ScrollTabsItem>) => void;
};

export type { TabItemProps, ScrollTabsItem, DraggableItem, ScrollTabsProps };
