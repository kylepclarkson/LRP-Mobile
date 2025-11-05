import React, { useCallback, memo } from 'react';
import { View, FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { ProgressBar, Text } from 'react-native-paper';
import { useRewardsContext } from '@/lib/context/rewards';
import { StampCard } from '@/types/types';

type RowProps = {
  item: StampCard;
};

const StampCardRow = memo(function StampCardRow({ item }: RowProps) {
  // created_at may be a string depending on where it's coming from; normalize for display
  const date =
    item.created_at instanceof Date
      ? item.created_at
      : new Date(item.created_at as any);

  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Text variant="titleMedium">{item.definition.title ?? 'Untitled'}</Text>
        {item.definition.description ? (
          <Text variant="bodySmall" style={styles.description}>
            {item.definition.description}
          </Text>
        ) : null}
      </View>

      {/* <View style={styles.right}>
        <Text variant="bodySmall" style={styles.state}>
          {item.state}
        </Text>
        <Text variant="bodySmall" style={styles.date}>
          {date.toLocaleDateString()}
        </Text>
      </View> */}
    </View>
  );
});

export default function RewardTrackerScreen() {
  const { stampCards = [] } = useRewardsContext();

  const keyExtractor = useCallback((item: StampCard) => item.id, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<StampCard>) => <StampCardRow item={item} />,
    []
  );

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.header}>
        Reward tracker
      </Text>
      <Text variant="bodyMedium" style={styles.count}>
        Number of stamp cards: {stampCards.length}
      </Text>

      <FlatList
        data={stampCards}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Text>No stamp cards</Text>
          </View>
        )}
        contentContainerStyle={
          stampCards.length === 0 ? styles.emptyContainer : undefined
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { marginBottom: 8 },
  count: { marginBottom: 12, color: '#444' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  left: { flex: 1 },
  right: { alignItems: 'flex-end' },
  description: { color: '#666' },
  state: { fontWeight: '600' },
  date: { color: '#888' },
  separator: { height: 1, backgroundColor: '#eee', marginLeft: 8 },
  empty: { padding: 24, alignItems: 'center' },
  emptyContainer: { flex: 1, justifyContent: 'center' },
});