import React from "react";
import { View } from "react-native";
import DraggableFlatList, {
  DragEndParams,
  RenderItemParams,
} from "react-native-draggable-flatlist";

import Separator from "./Separator";

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
    // TODO animate
    <DraggableFlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      onDragEnd={onDragEnd}
      horizontal
      ItemSeparatorComponent={() => <Separator vertical />}
    />
  );
};

export default DraggableList;
