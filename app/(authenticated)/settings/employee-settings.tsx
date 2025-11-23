import { useBusinessContext } from '@/lib/context/business'
import React from 'react'
import { Text, View } from 'react-native'

export default function EmployeeSettings() {
  const { activeEmployeeGroup } = useBusinessContext();

  return (
    <View>
      <Text>Employee settings</Text>
      <Text>Active employee group: {activeEmployeeGroup?.business.name}</Text>
    </View>
  )
}