import { StampCard } from "@/lib/api/stamps/stamps.types";
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';
import { Text, View } from 'react-native';
import { computeStampCardProgress, ProgressBar } from '../ProgressBar';

export function StampCardBottomSheet({ stampCard }: { stampCard: StampCard }) {
  return (
    <BottomSheetView>
      {/* Wrapper */}
      <View className='flex-col px-6'>
        {/* Header */}
        <View className="flex items-start mb-3">
          <Text className='text-2xl font-bold'>{stampCard.stampProgram.title}</Text>
          <View className='flex-row justify-between w-full my-3'>
            <Text className='font-semibold'>{stampCard.stampProgram.business.name}</Text>
            <Text className='font-semibold'>{stampCard.stampRecords.length}/{stampCard.stampProgram.stampsRequired}</Text>
          </View>
        </View>
        {/* Progression bar */}
        <View className='mb-3'>
          <ProgressBar progress={computeStampCardProgress(stampCard)} />
        </View>
        <View className=''>
          {/* Reward description */}
          <View className='mb-3'>
            <Text className='font-semibold text-md mb-2'>Reward details</Text>
            <Text className='p-2 bg-gray-100 rounded-lg'>{stampCard.stampProgram.description}</Text>
          </View>
          {/* Reward progression */}
          <View className='mb-3'>
            <Text className='font-semibold text-md mb-2'>How to earn</Text>
            <Text className='p-2 bg-gray-100 rounded-lg'>{stampCard.stampProgram.progressionText}</Text>
          </View>
          {/* Reward redemption */}
          <View className='mb-3'>
            <Text className='font-semibold text-md mb-2'>How to redeem</Text>
            <Text className='p-2 bg-gray-100 rounded-2xl'>{stampCard.stampProgram.redemptionText}</Text>
          </View>
        </View>
      </View>
    </BottomSheetView>
  );
}