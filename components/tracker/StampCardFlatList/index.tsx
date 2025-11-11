import { StampCard } from '@/types/types';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ProgressBar } from '../ProgressBar';

export function StampCardFlatListItem({ stampCard }: { stampCard: StampCard }) {

  const computeStampCardProgress = (): number => {
    if (stampCard.stampDefinition.stampsRequired === 0) {
      return 0;
    } else if (stampCard.stampRecords.length >= stampCard.stampDefinition.stampsRequired) {
      return 100;
    } else {
      return (stampCard.stampRecords.length / stampCard.stampDefinition.stampsRequired) * 100;
    }
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{stampCard.stampDefinition.title}</Text>
        <Text style={styles.businessName}>{stampCard.stampDefinition.business.name}</Text>
        <View style={styles.progressBarWrapper}>
          <ProgressBar progress={computeStampCardProgress()} />
        </View>
      </View>
    </View>
  );
}

export function StampCardFlatList({ stampCards }: { stampCards: StampCard[] }) {
  return (
    <FlatList
      data={stampCards}
      renderItem={({ item }) => <StampCardFlatListItem stampCard={item} />}
      keyExtractor={item => item.id}
    />
  );
}


const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row', // Arrange image and content horizontally
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden', // Clip content that extends beyond border radius
  },
  contentContainer: {
    flex: 1, // Take remaining space
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  businessName: {
    fontSize: 14,
    color: '#666',
  },
  progressBarWrapper: {
    marginTop: 20,
    marginBottom: 4
  }
});