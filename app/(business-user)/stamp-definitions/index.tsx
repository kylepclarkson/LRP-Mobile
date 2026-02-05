import { StampDefinitionList } from "@/components/businesses/stamps/StampDefinitionList"
import { LoadingOverlay } from "@/components/common/LoadingOverlay"
import { StampProgram } from "@/lib/api/stamps/stamps.types"
import { useBusinessResourceContext } from "@/lib/context/business-resource"
import { TrueSheet } from "@lodev09/react-native-true-sheet"
import { useIsFocused } from "@react-navigation/native"
import { router } from "expo-router"
import { useEffect, useRef, useState } from "react"
import { Pressable, Text, View } from "react-native"

function SheetContent({
  stampDefinition,
  onCreatePress,
}: {
  stampDefinition: StampProgram | null
  onCreatePress: (d: StampProgram) => void
}) {
  if (!stampDefinition) return <View style={{ height: 1 }} />

  return (
    <View className="px-5 py-6">
      <Text className="text-xl font-bold text-gray-900">
        {stampDefinition.title}
      </Text>

      {stampDefinition.description ? (
        <Text className="text-gray-600 mt-2">{stampDefinition.description}</Text>
      ) : null}

      <View className="mt-4 space-y-1">
        <Text className="text-gray-700">
          <Text className="font-semibold">Stamps Required:</Text>{" "}
          {stampDefinition.stampsRequired}
        </Text>

        <Text className="text-gray-700">
          <Text className="font-semibold">Progression Text:</Text>{" "}
          {stampDefinition.progressionText}
        </Text>

        <Text className="text-gray-700">
          <Text className="font-semibold">Redemption Text:</Text>{" "}
          {stampDefinition.redemptionText}
        </Text>
      </View>

      <Pressable
        onPressIn={() => onCreatePress(stampDefinition)}
        className="mt-6 bg-blue-600 py-3 rounded-xl active:opacity-80"
      >
        <Text className="text-center text-white font-semibold text-base">
          Create Stamp
        </Text>
      </Pressable>
    </View>
  )
}

export default function StampDefinitionsScreen() {
  const { stampDefinitions, loadingStampDefinitions } = useBusinessResourceContext()

  const sheetRef = useRef<TrueSheet>(null)
  const [stampDefinition, setStampDefinition] = useState<StampProgram | null>(null)

  const isFocused = useIsFocused()

  // Close sheet when leaving screen
  useEffect(() => {
    if (!isFocused) {
      sheetRef.current?.dismiss()
      setStampDefinition(null)
    }
  }, [isFocused])

  const openSheet = (def: StampProgram) => {
    setStampDefinition(def)
    sheetRef.current?.present()
  }

  const navigateToCreateStampRecordScreen = async (def: StampProgram) => {
    setStampDefinition(null)
    router.push({
      pathname: "/(business-user)/stamp-records/create/transaction-details",
      params: { stampDefinitionId: def.id },
    })
    await sheetRef.current?.dismiss()
  }

  if (loadingStampDefinitions) {
    return <LoadingOverlay />
  }

  return (
    <View className="flex-1">
      <StampDefinitionList
        stampDefinitions={stampDefinitions}
        onPress={openSheet}
      />

      <TrueSheet ref={sheetRef} detents={[0.8]}>
        <SheetContent
          stampDefinition={stampDefinition}
          onCreatePress={navigateToCreateStampRecordScreen} />
      </TrueSheet>
    </View>
  )
}