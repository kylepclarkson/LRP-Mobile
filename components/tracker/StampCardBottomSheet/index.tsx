import { StampCard } from '@/types/types'
import { BottomSheetView } from '@gorhom/bottom-sheet'
import React from 'react'
import { StyleSheet, Text } from 'react-native'

export function StampCardBottomSheet({ stampCard }: { stampCard: StampCard }) {
  return (
    <BottomSheetView style={styles.contentContainer}>
      <Text>{stampCard.stampDefinition.title}</Text>
    </BottomSheetView>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
});