import React, { ReactNode } from "react";
import { FlatList } from "react-native";
import StyledItem from "./StyledItem";
import NoItemsInList from "../../NoItemsInList";
import StyledButton from "../StyledButton";
import { ThemedText } from "../ThemedText";

type StyledListProps = {
  startSelectingItems: (id: string) => void;
  onPress: (id: string) => void;
  data: any[];
  isSelectingItems: boolean;
  onSelectItem: (id: string) => void;
  selectedItems: string[];
  itemComponent?: (item: any) => ReactNode;
};

const StyledList: React.FC<StyledListProps> = ({
  startSelectingItems,
  onPress,
  data,
  isSelectingItems,
  onSelectItem,
  selectedItems,
  itemComponent = null,
}) => {
  if (data.length === 0) {
    return (
      <NoItemsInList
        text="No routines"
        actionButton={<StyledButton text="Create new one" />}
      />
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <StyledItem
          item={item}
          isSelectingItems={isSelectingItems}
          isSelected={selectedItems.includes(item.id)}
          onLongPress={startSelectingItems}
          onPress={onPress}
          onSelectItem={onSelectItem}
        >
          {/* // TODO hard to understand - simplify */}
          {itemComponent !== null ? (
            itemComponent(item)
          ) : (
            <ThemedText>{item.title}</ThemedText>
          )}
        </StyledItem>
      )}
      className="w-full"
    />
  );
};

export default StyledList;
