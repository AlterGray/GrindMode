import React, { useState } from 'react'
import { ThemedView } from '../ThemedView';
import { DayType } from '@/app/types/commonTypes';
import DaysPickerItem from './DaysPickerItem';
import { View } from 'react-native';

// TODO during refactor create enums like for days
type DaysPickerProps = {
  onChange: (days: DayType[]) => void;
  items?: DayType[];
  size?: 'small' | 'regular';
};

// TODO extract to file
type DayItemType = { value: DayType, display: string };

// TODO SAME AS TYPE
const daysList: DayItemType[] = [
  { value: DayType.SUNDAY, display: 'S' },
  { value: DayType.MONDAY, display: 'M' },
  { value: DayType.TUESDAY, display: 'T' },
  { value: DayType.WEDNESDAY, display: 'W' },
  { value: DayType.THURSDAY, display: 'T' },
  { value: DayType.FRIDAY, display: 'F' },
  { value: DayType.SATURDAY, display: 'S' },
];

const DaysPicker: React.FC<DaysPickerProps> = ({ onChange, items = daysList.map((d) => d.value), size = 'regular' }) => {
  const [activeItems, setActiveItems] = useState(daysList.map((d) => d.value));

  const sizeStyle = size === 'regular' ? 'w-8 h-8' : 'w-6 h-6';
  const baseStyles = `align-middle justify-center items-center ${sizeStyle} border-hairline border-light-border rounded-full`;
  const activeStyles = 'border-light-tabActive bg-light-backgroundSurface dark:border-dark-textPrimary dark:bg-dark-backgroundSecondary';
  const inactiveStyles = 'border-light-border bg-light-background dark:border-dark-border dark:bg-dark-backgroundSurface';
  const interactStyles = (isSelected: boolean) => isSelected ? activeStyles : inactiveStyles;

  // TODO remove or keep semicolons?
  const onPress = (day: DayItemType) => {
    let newItems: DayType[] = [];
    const isLastItem = activeItems.length === 1;
    const isInclude = activeItems.map((i) => i).includes(day.value);

    if (!isLastItem && isInclude)
      newItems = activeItems.filter((d) => d !== day.value);
    else if (!isInclude)
      newItems = [...activeItems, day.value];
    else
      newItems = activeItems;

    setActiveItems(newItems);
    onChange(newItems);
  }

  const isActive = (day: DayItemType) => activeItems.includes(day.value) && items.includes(day.value);

  return (
    <View className='flex-row gap-2'>
        {daysList.map((day) =>
          <DaysPickerItem
            key={day.value}
            day={day}
            styles={`${baseStyles} ${interactStyles(isActive(day))}`}
            onPress={() => onPress(day)}  
          />
        )}
    </View>
  )
}

export default DaysPicker