import { StampCard } from '@/types/types';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native';
import { StampCardBottomSheet } from '../StampCardBottomSheet';
import { StampCardListItem } from '../StampCardListItem';

type StampCardListProps = {
  stampCards: StampCard[],
  emptyListComponent: React.FC,
  isLoading: boolean,
  onRefresh: () => void
}

export function StampCardList({
  stampCards,
  emptyListComponent,
  isLoading,
  onRefresh
}: StampCardListProps) {

  const snapPoints = React.useMemo(() => ['80%'], []);
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const [selectedStampCard, setSelectedStampCard] = React.useState<StampCard | null>(null);
  // Need to track index to deterministically open/close the sheet
  // https://stackoverflow.com/questions/75194341
  const [sheetIndex, setSheetIndex] = React.useState<number>(-1);

  const openBottomSheet = React.useCallback((stampCard: StampCard) => {
    setSelectedStampCard(stampCard);
    setSheetIndex(0);
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const closeBottomSheet = React.useCallback(() => {
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
    if (selectedStampCard) {
      // bottomSheetRef.current?.snapToIndex(0);
      setTimeout(() => { bottomSheetRef.current?.snapToIndex(0); }, 10)
    }
  }, [selectedStampCard]);

  return (
    <View className='h-full'>
      <FlatList
        data={stampCards}
        renderItem={({ item }) => <StampCardListItem stampCard={item} onPress={() => openBottomSheet(item)} />}
        ListEmptyComponent={emptyListComponent}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
          />
        }
      />
      {isLoading && (
        <View className="absolute inset-0 bg-white/50 items-center justify-center">
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}

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
    </View>
  );
}

