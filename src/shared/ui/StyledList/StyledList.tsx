import React, { ReactNode } from "react";
import { FlatList } from "react-native";

import StyledButton from "@shared/ui/StyledButton";
import ThemedText from "@shared/ui/ThemedText";

import NoItemsInList from "./NoItemsInList";
import StyledItem from "./StyledItem";
import { ItemData } from "./types";

type StyledListProps = {
  selectedItems: string[];
  // change to status?
  isSelecting: boolean;
  onPress: (id: string) => void;
  data: ItemData[];
  renderContent?: (item: ItemData) => ReactNode;
  noItemsText?: string;
  toggleItem: (itemId: string) => void;
};

const StyledList: React.FC<StyledListProps> = ({
  selectedItems,
  isSelecting,
  onPress,
  toggleItem,
  data,
  renderContent = null,
  noItemsText = "No items yet",
}) => {
  if (data.length === 0) {
    return (
      <NoItemsInList
        text={noItemsText}
        actionButton={<StyledButton title="Create new one" />}
      />
    );
  }

  const defaultRenderContent = (item: ItemData) => (
    <ThemedText>{item.title}</ThemedText>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <StyledItem
          item={item}
          isSelecting={isSelecting}
          isSelected={selectedItems.includes(item.id)}
          onLongPress={toggleItem}
          onPress={onPress}
          onSelect={toggleItem}
        >
          {renderContent ? renderContent(item) : defaultRenderContent(item)}
        </StyledItem>
      )}
      className="w-full bg-light-background dark:bg-dark-background"
    />
  );
};

export default StyledList;
