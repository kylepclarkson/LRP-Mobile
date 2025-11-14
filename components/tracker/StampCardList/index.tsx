import { StampCard } from '@/types/types';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StampCardListItem } from '../StampCardListItem';

export function StampCardList({ stampCards }: { stampCards: StampCard[] }) {

  const snapPoints = React.useMemo(() => ['70%'], []);
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const [selectedStampCard, setSelectedStampCard] = React.useState<StampCard | null>(null);

  const openBottomSheet = React.useCallback((stampCard: StampCard) => {
    console.info("Opening bottom sheet for stamp card:", stampCard);
    setSelectedStampCard(stampCard);
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const closeBottomSheet = React.useCallback(() => {
    console.info("Closing bottom sheet");
    bottomSheetRef.current?.close();
    setSelectedStampCard(null);
  }, []);

  /**
   * Renders the backdrop for the bottom sheet, dimming the background content
   * when the sheet is open. 
   */
  const renderBackdrop = React.useCallback((props: any) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
    />
  ), []);

  return (
    <SafeAreaView>
      <FlatList
        data={stampCards}
        renderItem={({ item }) => <StampCardListItem stampCard={item} onPress={() => openBottomSheet(item)} />}
        keyExtractor={item => item.id}
      />
      <BottomSheet
        index={-1}
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        onClose={closeBottomSheet}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
      >
        {selectedStampCard &&
          <BottomSheetView style={styles.contentContainer}>
            <Text>TODO details about selected item</Text>
          </BottomSheetView>}
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
});