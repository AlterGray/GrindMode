import React from 'react'
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';

const index = () => {
  return (
    <ThemedView className='flex-1 items-center justify-center dark:bg-black'>
      <ThemedText>Home page</ThemedText>      
    </ThemedView>
  )
}

export default index