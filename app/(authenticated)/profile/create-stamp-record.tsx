import CommonBottomSheet from '@/components/common/CommonBottomSheet';
import { FormSelectable } from '@/components/forms/FormSelectable';
import { renderSelectableList } from '@/components/forms/RenderSelectableList';
import { useBusinessContext } from '@/lib/context/business';
import { getStampDefinitionLabel, StampDefinition } from '@/types/types';
import BottomSheet from '@gorhom/bottom-sheet';
import { useIsFocused } from '@react-navigation/native';
import React, { JSX, useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';

export default function CreateStampRecord() {

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [sheetContent, setSheetContent] = useState<JSX.Element>(<></>);

  // TODO double tap seems to be required. 
  const openBottomSheet = (sheetContent: JSX.Element) => {
    setSheetContent(sheetContent);
    bottomSheetRef.current?.expand();
  }

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  }
  const isFocused = useIsFocused();
  // Close sheet when navigating away. 
  useEffect(() => {
    if (!isFocused) {
      closeBottomSheet();
    }
  }, [isFocused]);

  const {
    activeEmployeeGroup,
    activeStampDefinition,
    setActiveStampDefinition,
    stampDefinitions
  } = useBusinessContext();

  return (
    <View className='flex-1 mx-4 py-6'>
      <View>
        <Text>Create stamp record</Text>
        <Text>Business: {activeEmployeeGroup?.business.name}</Text>
      </View>
      <View>
        <Text>Select an active stamp to create a record for</Text>
        {(activeStampDefinition && stampDefinitions) && <FormSelectable<StampDefinition>
          label="Active stamp record"
          placeholder="Select a stamp definition"
          activeItem={activeStampDefinition}
          getLabel={getStampDefinitionLabel}
          onOpen={() =>
            openBottomSheet(
              renderSelectableList(
                stampDefinitions,
                getStampDefinitionLabel,
                (item) => {
                  setActiveStampDefinition(item);
                  closeBottomSheet();
                })
            )
          }
        />}
      </View>
      <CommonBottomSheet
        ref={bottomSheetRef}
        content={sheetContent}
        onClose={closeBottomSheet}
      />
    </View>
  )
}