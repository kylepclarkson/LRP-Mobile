import { StampCardList } from '@/components/tracker/StampCardList';
import { useRewardsContext } from '@/lib/context/rewards';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function RewardTrackerScreen() {
  const { stampCards = [] } = useRewardsContext();
  return (
    <View>
      <StampCardList
        stampCards={stampCards}
        emptyListComponent={() => { return <Text>No stamps</Text>; }}
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