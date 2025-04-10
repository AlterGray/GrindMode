import React from 'react'
import { Stack, Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'

const TabsLayout = () => {
  return (
  <Tabs>
    <Tabs.Screen name='index' options={{
      title: 'Daily routine',
      headerShown: false,
      tabBarIcon: ( {color} ) => <FontAwesome size={28} color={color} name='envira' />
    }} />
    <Tabs.Screen name='Settings' options={{
      title: 'Settings',
      headerShown: false,
      tabBarIcon: ( {color} ) => <FontAwesome size={28} color={color} name='cog' />
    }} />
  </Tabs>
  )
}

export default TabsLayout