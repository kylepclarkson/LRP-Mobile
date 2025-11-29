import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const App = () => {
  // hooks
  const sheetRef = useRef<BottomSheet>(null);

  // variables
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );
  const snapPoints = useMemo(() => ["25%", "40%", "80%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  // render
  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    []
  );
  return (
    <View className="flex-1">
      <View className="flex-col items-center justify-start space-y-4">
        <Pressable onPress={() => handleSnapPress(2)} className="px-4 py-2 bg-blue-500 rounded">
          <Text>Snap to 90%</Text>
        </Pressable>
        <Pressable onPress={() => handleSnapPress(1)} className="px-4 py-2 bg-blue-500 rounded">
          <Text>Snap to 50%</Text>
        </Pressable>
        <Pressable onPress={() => handleSnapPress(0)} className="px-4 py-2 bg-blue-500 rounded">
          <Text>Snap to 25%</Text>
        </Pressable>
        <Pressable onPress={() => handleClosePress()} className="px-4 py-2 bg-red-500 rounded">
          <Text>Close</Text>
        </Pressable>
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChange}
      >
        <BottomSheetFlatList
          data={data}
          keyExtractor={(i) => i}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
        />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: "white",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
});

export default App;