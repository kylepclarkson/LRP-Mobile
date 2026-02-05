import { StampCard } from "@/lib/api/stamps/stamps.types";
import { Pressable, Text, View } from 'react-native';
import { ProgressBar, computeStampCardProgress } from '../ProgressBar';

export function StampCardListItem({ stampCard, onPress }: { stampCard: StampCard, onPress: (item: StampCard) => void }) {

  return (
    <Pressable onPress={() => onPress(stampCard)}>
      <View className='flex-row bg-white rounded-lg shadow-lg elevation-1 overflow-hidden mx-3 mb-4'>
        <View className='flex-1 justify-center p-4'>
          <Text className='text-lg font-bold mb-4'>{stampCard.stampDefinition.business.name}</Text>
          <Text className='text-md font-medium'>{stampCard.stampDefinition.title}</Text>
          <View className='mt-4 mb-2'>
            <ProgressBar progress={computeStampCardProgress(stampCard)} />
          </View>
        </View>
      </View>
    </Pressable>
  );
}