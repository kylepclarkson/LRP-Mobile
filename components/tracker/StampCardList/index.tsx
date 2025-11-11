import { StampCard } from '@/types/types';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ProgressBar } from '../ProgressBar';
import { StampCardListItem } from '../StampCardListItem';

export function StampCardList({ stampCards }: { stampCards: StampCard[] }) {
  return (
    <FlatList
      data={stampCards}
      renderItem={({ item }) => <StampCardListItem stampCard={item} />}
      keyExtractor={item => item.id}
    />
  );
}