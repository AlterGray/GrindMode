import React, { ReactNode } from "react";
import { FlatList } from "react-native";
import StyledItem from "./StyledItem";
import NoItemsInList from "./NoItemsInList";
import StyledButton from "../StyledButton";
import ThemedText from "../ThemedText";
import { ItemData } from "./types";

type StyledListProps = {
  startSelectingItems: (id: string) => void;
  onPress: (id: string) => void;
  selectedIds: string[];
  data: ItemData[];
  isSelectingItems: boolean;
  onItemSelect: (id: string) => void;
  renderContent?: (item: ItemData) => ReactNode;
  noItemsText?: string;
};

const StyledList: React.FC<StyledListProps> = ({
  startSelectingItems,
  onPress,
  data,
  isSelectingItems,
  onItemSelect,
  selectedIds,
  renderContent = null,
  noItemsText = "No items yet",
}) => {
  if (data.length === 0) {
    return (
      <NoItemsInList
        text={noItemsText}
        actionButton={<StyledButton text="Create new one" />}
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
          isSelecting={isSelectingItems}
          isSelected={selectedIds.includes(item.id)}
          onLongPress={startSelectingItems}
          onPress={onPress}
          onSelect={onItemSelect}
        >
          {renderContent ? renderContent(item) : defaultRenderContent(item)}
        </StyledItem>
      )}
      className="w-full"
    />
  );
};

export default StyledList;
