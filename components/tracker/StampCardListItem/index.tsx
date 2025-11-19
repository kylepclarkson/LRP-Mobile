import { StampCard } from '@/types/types';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ProgressBar, computeStampCardProgress } from '../ProgressBar';

export function StampCardListItem({ stampCard, onPress }: { stampCard: StampCard, onPress: (item: StampCard) => void }) {

  return (
    <Pressable onPress={() => onPress(stampCard)}>
      <View style={styles.cardContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{stampCard.stampDefinition.business.name}</Text>
          <Text style={styles.businessName}>{stampCard.stampDefinition.title}</Text>
          <View style={styles.progressBarWrapper}>
            <ProgressBar progress={computeStampCardProgress(stampCard)} />
          </View>
        </View>
      </View>
    </Pressable>
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