import React, { ReactNode } from "react";
import { FlatList } from "react-native";

import { useNavigationFocus } from "@shared/hooks/useNavigationFocus";
import { useThemeColors } from "@shared/hooks/useThemeColors";
import StyledButton from "@shared/ui/StyledButton";
import ThemedText from "@shared/ui/ThemedText";

import NoItemsInList from "./NoItemsInList";
import StyledItem from "./StyledItem";
import { ItemData } from "./types";

type StyledListProps = {
  // change to status?
  isSelecting: boolean;
  onPress: (id: string) => void;
  data: ItemData[];
  renderContent?: (item: ItemData) => ReactNode;
  noItemsText?: string;
  toggleItem: (itemId: string) => void;
};

const StyledList: React.FC<StyledListProps> = ({
  isSelecting,
  onPress,
  toggleItem,
  data,
  renderContent = null,
  noItemsText = "No items yet",
}) => {
  const isNavigating = useNavigationFocus();

  const backgroundColor = useThemeColors("background");

  const handleItemAction = (itemId: string, isLongPress: boolean) => {
    if (isNavigating) return;

    if (isLongPress || isSelecting) toggleItem(itemId);
    else onPress?.(itemId);
  };

  if (data.length === 0) {
    return (
      <NoItemsInList
        text={noItemsText}
        actionButton={<StyledButton title="Create new one" />}
      />
    );
  }

  const renderItemComponent = ({ item }: { item: ItemData }) => {
    return (
      <StyledItem
        item={item}
        onLongPress={() => handleItemAction(item.id, true)}
        onPress={() => handleItemAction(item.id, false)}
      >
        {renderContent ? (
          renderContent(item)
        ) : (
          // TODO improve it to show correctly selected items
          <ThemedText>{item.title}</ThemedText>
        )}
      </StyledItem>
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItemComponent}
      className={`w-full ${backgroundColor}`}
    />
  );
};

export default StyledList;
