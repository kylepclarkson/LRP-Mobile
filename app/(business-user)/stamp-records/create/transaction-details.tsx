import { LoadingOverlay } from "@/components/common/LoadingOverlay"
import CreateStampRecordForm from "@/components/forms/CreateStampRecordForm"
import { useBusinessResourceContext } from "@/lib/context/business-resource"
import { useLocalSearchParams } from "expo-router"
import { useMemo } from "react"
import { Text, View } from "react-native"

export default function CreateStampRecordScreen() {
  const { stampDefinitionId } = useLocalSearchParams<{ stampDefinitionId: string }>()
  const { stampDefinitions, loadingStampDefinitions } = useBusinessResourceContext()

  const stampDefinition = useMemo(() => {
    if (!stampDefinitions) return null
    return stampDefinitions.find(def => def.id === stampDefinitionId) ?? null
  }, [stampDefinitions, stampDefinitionId])

  if (loadingStampDefinitions) {
    return <LoadingOverlay />
  }

  if (!stampDefinition) {
    return (
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-lg font-semibold text-gray-800">
          Stamp definition not found
        </Text>
        <Text className="text-gray-600 mt-2 text-center">
          The stamp definition you’re trying to use doesn’t exist or was removed.
        </Text>
      </View>
    )
  }

  return (
    <View className="flex-1 px-6 py-4">
      <Text className="text-2xl font-bold text-gray-900">
        Create Stamp Record
      </Text>

      <Text className="mt-2 text-gray-700">{stampDefinition.title}</Text>
      <CreateStampRecordForm
        onSubmit={async () => console.debug("on submit called")}
      />

    </View>
  )
}