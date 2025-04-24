import { Pressable, View } from 'react-native'
import React, { ReactNode } from 'react'
import { ThemedText } from '../ui/ThemedText'

type RoutineStatus = 'done' | 'undone' | 'overdue' | 'failed';

type StyledItemProps = {
  isSelected: boolean;
  isSelectingItems: boolean;
  item: {
    id: string;
    status: RoutineStatus;
  };
  onLongPress?: (id: string) => void;
  onPress?: (id: string) => void;
  onSelectItem: (id: string) => void;
  children: ReactNode;
}

const StyledItem: React.FC<StyledItemProps> = ({ item, isSelected, isSelectingItems, onLongPress, onPress, onSelectItem, children }) => {
  const statusClasses: Record<RoutineStatus, string> = {
    'done': 'bg-emerald-400 dark:bg-emerald-400',
    'undone': 'bg-light-listItemBorder dark:bg-dark-listItemBorder',
    'overdue': 'bg-orange-400 dark:bg-orange-400',
    'failed': 'bg-red-400 dark:bg-red-400',
  };

  return (
    <View>
      <View className={`h-0.5 ml-16 ${statusClasses[item.status]} ${isSelected ? 'bg-light-selectedListItemBorder' : ''}`} />
      <Pressable onLongPress={() => onLongPress?.(item.id)} onPress={() => isSelectingItems ? onSelectItem(item.id) : onPress?.(item.id)} className={`p-4 ${isSelected ? 'bg-light-selectedListItemBackground dark:bg-dark-selectedListItemBackground' : 'bg-light-listItemBackground'} dark:bg-dark-listItemBackground`}>
        <ThemedText>{children}</ThemedText>
      </Pressable>
    </View>
  )
}

export default StyledItem