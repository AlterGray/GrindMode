import { useState } from "react";
import DraggableList from "../DraggableList";
import { DraggableItem, ScrollTabsProps } from "./types";
import TabItem from "./TabItem";
import {
  OpacityDecorator,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import ThemedView from "../ThemedView";

const ScrollTabs: React.FC<ScrollTabsProps> = ({
  tabs,
  isReordering,
  onCloseTab,
  onDragEnd,
}) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].id);

  const draggableItem = (item: DraggableItem, drag: () => void) => (
    <OpacityDecorator activeOpacity={0.8}>
      <ScaleDecorator activeScale={0.85}>
        <TabItem
          isActive={selectedTab === item.id}
          isReordering={isReordering}
          menuItems={item.menuItems}
          title={item.title}
          color={item.color}
          onPress={() => setSelectedTab(item.id)}
          onClose={() => onCloseTab(item.id)}
          onLongPress={drag}
        />
      </ScaleDecorator>
    </OpacityDecorator>
  );

  return (
    <ThemedView className="flex-1 flex-col">
      {tabs.length > 1 ? (
        <ThemedView className="bg-light-backgroundSurface px-4 dark:bg-dark-backgroundSurface">
          <DraggableList
            items={tabs}
            renderItem={({ item, drag }) => draggableItem(item, drag)}
            onDragEnd={onDragEnd}
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
