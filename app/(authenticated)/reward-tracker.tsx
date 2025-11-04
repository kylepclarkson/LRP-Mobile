
import { useRewardsContext } from '@/lib/context/rewards'
import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

export default function RewardTrackerScreen() {

  const { stampCards } = useRewardsContext();

  return (
    <View>
      <Text>Reward tracker screen</Text>
      <Text>Number of stamp cards: {stampCards.length}</Text>
    </View>
  )
}
