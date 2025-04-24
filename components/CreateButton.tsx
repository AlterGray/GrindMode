import { Pressable, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { useThemeStore } from '@/stores/themeStore'
import { Colors } from '@/constants/Colors'

type CreateButtonProps = {
  onPress: () => void
}

const CreateButton: React.FC<CreateButtonProps> = ({ onPress }) => {
  const { isDark } = useThemeStore();
  const baseStyles = 'absolute bottom-10 right-10 p-4 rounded-full justify-center elevation-sm items-center h-14 w-14';
  
  return (
    <Pressable 
      onPress={onPress} 
      className={`${baseStyles} bg-light-secondaryBackground dark:bg-dark-buttonSecondaryBackground`}
    >
      <FontAwesome size={24} name='plus'
        color={isDark ? Colors.dark.icon : Colors.light.icon} />
    </Pressable>
  )
}

export default CreateButton