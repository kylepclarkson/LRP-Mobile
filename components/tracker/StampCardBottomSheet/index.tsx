import { StampCard } from '@/types/types';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

export function StampCardBottomSheet({ stampCard }: { stampCard: StampCard }) {
  return (
    <BottomSheetView style={styles.sheetContainer}>
      <Text style={styles.title}>{stampCard.stampDefinition.title}</Text>
      <Text style={styles.businessName}>{stampCard.stampDefinition.business.name}</Text>
      <Text>{stampCard.stampDefinition.progressionText}</Text>
      <Text>{stampCard.stampDefinition.redemptionText}</Text>
    </BottomSheetView>
  );
}

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
    padding: 36,
    // alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12
  },
  businessName: {
    fontSize: 14,
    fontWeight: '400',

  }
});