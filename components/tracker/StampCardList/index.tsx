import { StampCard } from '@/types/types';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import React from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StampCardBottomSheet } from '../StampCardBottomSheet';
import { StampCardListItem } from '../StampCardListItem';

export function StampCardList({ stampCards }: { stampCards: StampCard[] }) {

  const snapPoints = React.useMemo(() => ['70%'], []);
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const [selectedStampCard, setSelectedStampCard] = React.useState<StampCard | null>(null);
  // Need to track index to deterministically open/close the sheet
  // https://stackoverflow.com/questions/75194341
  const [sheetIndex, setSheetIndex] = React.useState<number>(-1);

  const openBottomSheet = React.useCallback((stampCard: StampCard) => {
    console.log("Opening bottom sheet");
    setSelectedStampCard(stampCard);
    setSheetIndex(0);
  }, []);

  const closeBottomSheet = React.useCallback(() => {
    console.info("Closing bottom sheet");
    bottomSheetRef.current?.close();
    setSelectedStampCard(null);
    setSheetIndex(-1);
  }, []);

  /**
   * Renders the backdrop for the bottom sheet, dimming the background content
   * when the sheet is open. 
   */
  const renderBackdrop = React.useCallback((props: any) => {
    return (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    )
  }, [selectedStampCard]);

  /**
   * Opens the bottom sheet whenever a stamp card is selected.
   */
  React.useEffect(() => {
    console.debug("Selected stamp card changed:", selectedStampCard?.id);
    if (selectedStampCard) {
      console.log("Opening bottom sheet");
      // bottomSheetRef.current?.snapToIndex(0);
      setTimeout(() => { console.log('snap attempt', bottomSheetRef.current); bottomSheetRef.current?.snapToIndex(0); }, 50)
    }
  }, [selectedStampCard]);

  return (
    <SafeAreaView>
      <FlatList
        data={stampCards}
        renderItem={({ item }) => <StampCardListItem stampCard={item} onPress={() => openBottomSheet(item)} />}
        keyExtractor={item => item.id}
      />
      <BottomSheet
        index={sheetIndex}
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        onClose={closeBottomSheet}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
      >
        {selectedStampCard && <StampCardBottomSheet stampCard={selectedStampCard} />}
      </BottomSheet>
    </SafeAreaView>
  );
}

