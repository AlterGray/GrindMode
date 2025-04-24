import React from 'react'
import { FlatList } from 'react-native'
import StyledItem from './StyledItem'
import NoItemsInList from '../NoItemsInList'
import StyledButton from '../ui/StyledButton'

type StyledListProps = {
  startSelectingItems: (id: string) => void;
  onPress: (id: string) => void;
  data: any[];
  isSelectingItems: boolean;
  onSelectItem: (id: string) => void;
  selectedItems: string[];
}

const StyledList: React.FC<StyledListProps> = ({ startSelectingItems, onPress, data, isSelectingItems: xIsSelectingItems, onSelectItem: xOnSelectItem, selectedItems: xSelectedItems }) => {
  if (data.length === 0) {
    return <NoItemsInList text='No routines' actionButton={ <StyledButton text='Create new one' /> } />;
  }
 
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => 
        <StyledItem item={item} isSelectingItems={xIsSelectingItems} isSelected={xSelectedItems.includes(item.id)} onLongPress={startSelectingItems} onPress={onPress} onSelectItem={xOnSelectItem}>
          {item.title}
        </StyledItem>
        }
      className='w-full'
    />
  )
}

export default StyledList