import { LoadingOverlay } from "@/components/common/LoadingOverlay"
import CreateStampRecordForm from "@/components/forms/CreateStampRecordForm"
import { CreateStampRecordFormData } from "@/components/forms/CreateStampRecordForm/types"
import { useBusinessResourceContext } from "@/lib/context/business-resource"
import { router, useLocalSearchParams } from "expo-router"
import { useMemo } from "react"
import { Text, View } from "react-native"

export default function CreateStampRecordScreen() {
  const { stampProgramId } = useLocalSearchParams<{ stampProgramId: string }>()
  const { stampPrograms, loadingstampPrograms } = useBusinessResourceContext()

  const stampProgram = useMemo(() => {
    if (!stampPrograms) return null
    return stampPrograms.find(def => def.id === stampProgramId) ?? null
  }, [stampPrograms, stampProgramId])

  if (loadingstampPrograms) {
    return <LoadingOverlay />
  }

  if (!stampProgram) {
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

  const handleFormSubmission = (values: CreateStampRecordFormData) => {
    router.push({
      pathname: "/(business-user)/stamp-records/create/scan-customer",
      params: {
        stampProgramId,
        amount: values.currencyAmount,
        currency: values.currencyCode,
        notes: values.details ?? ""
      }
    })
  }

  return (
    <View className="flex-1 px-6 py-4">
      <Text className="text-2xl font-bold text-gray-900">
        Create Stamp Record
      </Text>

      <Text className="mt-2 text-gray-700">{stampProgram.title}</Text>
      <CreateStampRecordForm
        onSubmit={handleFormSubmission}
      />

    </View>
  )
}