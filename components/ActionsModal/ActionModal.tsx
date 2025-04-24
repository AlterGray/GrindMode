import React, { useEffect } from 'react'
import { ThemedView } from '../ui/ThemedView'
import IconButton from '../ui/IconButton'
import { ThemedText } from '../ui/ThemedText'
import { useActionModalStore } from '@/stores/actionsModalStore'
import { useThemeStore } from '@/stores/themeStore'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

const ActionModal = () => {
  const { isOpen, setIsOpen, text, actions, onCloseDialog } = useActionModalStore()
  const isDark = useThemeStore((state) => state.isDark)

  const iconColor = isDark ? Colors.dark.icon : Colors.light.icon
  const bgColor = isDark ? 'dark:bg-dark-backgroundSecondary' : 'bg-light-backgroundSecondary'

  useEffect(() => {
    if (!isOpen) {
      onCloseDialog()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <ThemedView className={`${bgColor} w-full p-1 flex-row items-center justify-between`}>
      {/* Header section */}
      <ThemedView className='flex-row items-center justify-between px-4 h-16 gap-6 bg-light-backgroundSecondary dark:bg-dark-backgroundSecondary'>
        <IconButton iconName="close-outline" onPress={() => setIsOpen(false)} color={iconColor} />
        {text && <ThemedText className="text-base font-medium">{text}</ThemedText>}
      </ThemedView>

      {/* Actions */}
      {actions.length !== 0 && 
        <ThemedView className='flex-row gap-6 px-4 py-2 bg-light-backgroundSecondary dark:bg-dark-backgroundSecondary'>
          {actions.map((action) => (
            <Ionicons key={action.iconName} name={action.iconName} onPress={action.onPress} color={iconColor} size={26} />
          ))}
        </ThemedView>
      }
    </ThemedView>
  )
}

export default ActionModal
