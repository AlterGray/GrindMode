import ThemedView from "../ThemedView";
import { ScrollView } from "react-native";
import { useState } from "react";
import TabItem from "./TabItem";
import { PopoverMenuItem } from "../ActionsModal/PopoverMenu";

// TODO improve to make using is easy and consice
type ScrollTabsProps = {
  tabs: {
    title: string;
    content: React.ReactNode;
    menuItems: PopoverMenuItem[];
  }[];
  onCloseTab: (index: number) => void;
};

const ScrollTabs: React.FC<ScrollTabsProps> = ({ tabs, onCloseTab }) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <ThemedView className="flex-1">
      {tabs.length > 1 ? (
        <ThemedView className="bg-light-backgroundSurface px-4 dark:bg-dark-backgroundSurface">
          <ScrollView
            horizontal
            className="flex-grow-0 overflow-hidden px-4 dark:bg-dark-backgroundSurface"
          >
            {tabs.map((tab, index) => (
              <TabItem
                key={tab.title}
                title={tab.title}
                isActive={selectedTabIndex === index}
                onPress={() => setSelectedTabIndex(index)}
                onClose={() => onCloseTab(index)}
                menuItems={tab.menuItems}
              />
            ))}
          </ScrollView>
        </ThemedView>
      ) : null}
      <ThemedView className="flex-1">
        {tabs[selectedTabIndex].content}
      </ThemedView>
    </ThemedView>
  );
};

export default ScrollTabs;
