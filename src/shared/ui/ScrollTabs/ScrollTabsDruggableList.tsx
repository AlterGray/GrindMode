import DraggableFlatList, {
  DragEndParams,
  OpacityDecorator,
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PopoverMenuItem } from "../ActionsModal/PopoverMenu";
import TabItem from "./TabItem";

type Item = {
  id: string;
  title: string;
  order?: number;
  content: React.ReactNode;
  menuItems: PopoverMenuItem[];
};

// TODO pass just array?
type CustomDruggableListProps = {
  items: Item[];
  onDragEnd: (item: DragEndParams<Item>) => void;
  isReordering: boolean;
  onPress: (index: string) => void;
  onClose: (index: string) => void;
};

// TODO extract draggable list into separate component
const CustomDruggableList = ({
  items,
  onDragEnd,
  isReordering,
  onPress,
  onClose,
}: CustomDruggableListProps) => {
  const renderItem = ({ item, drag }: RenderItemParams<Item>) => {
    return (
      <OpacityDecorator activeOpacity={0.8}>
        <ScaleDecorator activeScale={0.85}>
          <TabItem
            isActive={false}
            isReordering={isReordering}
            menuItems={item.menuItems}
            title={item.title}
            onPress={() => onPress(item.id)}
            onClose={() => onClose(item.id)}
            onLongPress={drag}
          />
        </ScaleDecorator>
      </OpacityDecorator>
    );
  };

  return (
    // TODO move it to root component?
    <GestureHandlerRootView style={{ flexShrink: 0 }}>
      <DraggableFlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onDragEnd={onDragEnd}
        horizontal
      />
    </GestureHandlerRootView>
  );
};

export default CustomDruggableList;
