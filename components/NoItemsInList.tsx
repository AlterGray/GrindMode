import React, { ReactNode } from 'react'
import { ThemedView } from './ui/ThemedView'
import { ThemedText } from './ui/ThemedText'

type NoItemsInListProps = {
  text: string,
  actionButton?: ReactNode,
}

const NoItemsInList: React.FC<NoItemsInListProps> = ({ text, actionButton: button }) => {
  return (
    <ThemedView className='justify-center items-center gap-2'>
      <ThemedText variant='h4'>{text}</ThemedText>
      {button}
    </ThemedView>
  )
}

export default NoItemsInList