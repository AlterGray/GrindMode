import React from "react";
import DraggableFlatList, {
  DragEndParams,
  RenderItemParams,
} from "react-native-draggable-flatlist";

type DraggableListProps<T> = {
  items: T[];
  renderItem: (params: RenderItemParams<T>) => React.ReactElement;
  onDragEnd: (params: DragEndParams<T>) => void;
};

const DraggableList = <T extends { id: string }>({
  items,
  renderItem,
  onDragEnd,
}: DraggableListProps<T>) => {
  return (
    <DraggableFlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      onDragEnd={onDragEnd}
      horizontal
    />
  );
};

export default DraggableList;
