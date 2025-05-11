import ThemedView from "../ThemedView";
import { useState } from "react";
import { PopoverMenuItem } from "../ActionsModal/PopoverMenu";
import ScrollTabsDruggableList from "./ScrollTabsDruggableList";
import { DragEndParams } from "react-native-draggable-flatlist";

type Item = {
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
  onDragEnd: (item: DragEndParams<Item>) => void;
};

const ScrollTabs: React.FC<ScrollTabsProps> = ({
  tabs,
  isReordering,
  onCloseTab,
  onDragEnd,
}) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].id);

  return (
    <ThemedView className="flex-1 flex-col">
      {tabs.length > 1 ? (
        <ThemedView className="bg-light-backgroundSurface px-4 dark:bg-dark-backgroundSurface">
          <ScrollTabsDruggableList
            items={tabs}
            onDragEnd={onDragEnd}
            isReordering={isReordering}
            onPress={setSelectedTab}
            onClose={onCloseTab}
            selectedTab={selectedTab}
          />
        </ThemedView>
      ) : null}
      <ThemedView className="flex-1">
        {tabs.find((tab) => tab.id === selectedTab)?.content}
      </ThemedView>
    </ThemedView>
  );
};

export default ScrollTabs;
