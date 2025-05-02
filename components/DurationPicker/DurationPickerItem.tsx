import React from 'react'
import { ThemedText } from '../ui/ThemedText'


type DurationPickerItemProps = {
    text: string;
}

const DurationPickerItem: React.FC<DurationPickerItemProps> = ({ text }) => {
  return (
    <ThemedText>{text}</ThemedText>
  )
}

export default DurationPickerItem