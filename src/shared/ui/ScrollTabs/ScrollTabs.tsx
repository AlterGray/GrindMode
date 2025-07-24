import {
  OpacityDecorator,
  ScaleDecorator,
} from "react-native-draggable-flatlist";

import AnimatedThemedView from "@shared/ui/AnimatedThemedView";
import DraggableList from "@shared/ui/DraggableList";

import TabItem from "./TabItem";
import { DraggableItem, ScrollTabsProps } from "./types";

const ScrollTabs: React.FC<ScrollTabsProps> = ({
  selectedTab,
  tabs,
  isReordering,
  onPress,
  onCloseTab,
  onDragEnd,
}) => {
  // TODO add fade animation for folder switching
  const draggableItem = (item: DraggableItem, drag: () => void) => (
    <OpacityDecorator activeOpacity={0.8}>
      <ScaleDecorator activeScale={0.85}>
        {/* TODO too many props */}
        <TabItem
          isActive={selectedTab === item.id}
          isReordering={isReordering}
          menuItems={item.menuItems}
          title={item.title}
          color={item.color}
          onPress={() => onPress(item.id)}
          onClose={() => onCloseTab(item.id)}
          onLongPress={drag}
        />
      </ScaleDecorator>
    </OpacityDecorator>
  );

  return (
    <AnimatedThemedView className="flex-1 flex-col">
      <AnimatedThemedView className="px-4">
        <DraggableList
          items={tabs}
          renderItem={({ item, drag }) => draggableItem(item, drag)}
          onDragEnd={onDragEnd}
        />
      </AnimatedThemedView>

      <AnimatedThemedView className="flex-1">
        {tabs.find((tab) => tab.id === selectedTab)?.content}
      </AnimatedThemedView>
    </AnimatedThemedView>
  );
};

export default ScrollTabs;
