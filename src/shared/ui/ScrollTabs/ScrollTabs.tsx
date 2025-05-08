import ThemedView from "../ThemedView";
import { ScrollView } from "react-native";
import { useState } from "react";
import TabItem from "./TabItem";

// TODO improve to make using is easy and consice
type ScrollTabsProps = {
  tabs: {
    title: string;
    content: React.ReactNode;
  }[];
};

const ScrollTabs: React.FC<ScrollTabsProps> = ({ tabs }) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <ThemedView className="flex-1">
      {tabs.length > 1 ? (
        <ThemedView className="bg-light-backgroundSecondary px-4 dark:bg-dark-backgroundSecondary">
          <ScrollView
            horizontal
            className="flex-grow-0 overflow-hidden px-4 dark:bg-dark-backgroundSecondary"
          >
            {tabs.map((tab, index) => (
              <TabItem
                key={tab.title}
                title={tab.title}
                isActive={selectedTabIndex === index}
                onPress={() => setSelectedTabIndex(index)}
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
