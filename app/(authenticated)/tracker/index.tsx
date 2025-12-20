import { useAuthContext } from "@/lib/context/auth";
import { StampCard } from "@/types/stamps";
import { useEffect } from "react";
import { FlatList, Text, View } from "react-native";

export default function RewardTrackerScreen() {

  const { user } = useAuthContext();

  useEffect(() => {

  }, [])

  const renderStampCardItem = ({ item }: { item: StampCard }) => (
    <View></View>
  );

  return (
    <View>
      <View>
        <Text>Rewards tracker</Text>
      </View>
      <View>
        <FlatList
          data={[]}
          keyExtractor={(item: StampCard) => item.id}
          renderItem={({ item }) => renderStampCardItem({ item })}
        />
      </View>
    </View>
  )
}

// export default function RewardTrackerScreen() {
//   const { stampCards = [], isLoading, fetchStampCards } = useRewardsContext();

//   const stampCardRefresh = React.useCallback(() => {
//     fetchStampCards();
//   }, [stampCards]);
//   return (
//     <View>
//       <StampCardList
//         stampCards={stampCards}
//         emptyListComponent={() => { return <Text>No stamps</Text>; }}
//         isLoading={isLoading}
//         onRefresh={stampCardRefresh}
//       />
//     </View>
//   );
// }
