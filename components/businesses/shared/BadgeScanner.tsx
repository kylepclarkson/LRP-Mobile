import { useEffect, useState } from "react"
import { View, Text } from "react-native"
import { CameraView, useCameraPermissions } from "expo-camera"

type BadgeScannerProps = {
  onScanned: (customerId: string) => void
}



export function BadgeScanner({ onScanned }: BadgeScannerProps) {
  const [permission, requestPermission] = useCameraPermissions()
  const [scanned, setScanned] = useState(false)

  // Request permission on mount
  useEffect(() => {
    if (!permission?.granted) {
      requestPermission()
    }
  }, [permission])

  // Permission not loaded yet
  if (!permission) {
    return <View />
  }

  // Permission denied
  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-lg font-semibold text-gray-900">
          Camera permission required
        </Text>
        <Text className="text-gray-600 mt-2 text-center">
          Please enable camera access to scan customer badges.
        </Text>
      </View>
    )
  }

  return (
    <CameraView
      className="flex-1"
      barcodeScannerSettings={{
        barcodeTypes: ["qr"],
      }}
      onBarcodeScanned={(result) => {
        if (scanned) return
        setScanned(true)

        const customerId = result.data
        onScanned(customerId)
      }}
    />
  )
}