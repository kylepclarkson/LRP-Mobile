import { CameraView, useCameraPermissions } from "expo-camera"
import { useEffect, useState } from "react"
import { ActivityIndicator, Pressable, Text, View } from "react-native"

type BadgeScannerProps = {
  onScanned: (rawValue: string) => Promise<void> | void
}

export function BadgeScanner({ onScanned }: BadgeScannerProps) {
  const [permission, requestPermission] = useCameraPermissions()
  const [scanned, setScanned] = useState(false)
  const [validating, setValidating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [torchOn, setTorchOn] = useState(false)

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission()
    }
  }, [permission])

  if (!permission) return <View />

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

  const handleScan = async (raw: string) => {
    if (scanned) return

    setScanned(true)
    setValidating(true)
    setError(null)

    try {
      await onScanned(raw)
    } catch {
      setError("Invalid badge. Please try again.")
      setScanned(false)
    } finally {
      setValidating(false)
    }
  }

  const handleRescan = () => {
    setScanned(false)
    setValidating(false)
    setError(null)
  }

  return (
    <View className="flex-1 bg-black">
      {/* Camera */}
      <CameraView
        style={{ width: "100%", height: "100%" }}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        enableTorch={torchOn}
        onBarcodeScanned={(result) => handleScan(result.data)}
      />

      {/* Overlay */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Dim background */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        />

        {/* Scanning window */}
        <View
          style={{
            width: 256,
            height: 256,
            borderWidth: 2,
            borderColor: "rgba(255,255,255,0.4)",
            borderRadius: 16,
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Corner brackets */}
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 40,
              height: 40,
              borderTopWidth: 4,
              borderLeftWidth: 4,
              borderColor: "white",
              borderTopLeftRadius: 8,
            }}
          />

          <View
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 40,
              height: 40,
              borderTopWidth: 4,
              borderRightWidth: 4,
              borderColor: "white",
              borderTopRightRadius: 8,
            }}
          />

          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: 40,
              height: 40,
              borderBottomWidth: 4,
              borderLeftWidth: 4,
              borderColor: "white",
              borderBottomLeftRadius: 8,
            }}
          />

          <View
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 40,
              height: 40,
              borderBottomWidth: 4,
              borderRightWidth: 4,
              borderColor: "white",
              borderBottomRightRadius: 8,
            }}
          />
        </View>

        {/* Instruction text */}
        {!validating && (
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "500",
              marginTop: 24,
              zIndex: 10,
            }}
          >
            Align the badge inside the frame
          </Text>
        )}

        {/* Loading indicator */}
        {validating && (
          <View style={{ position: "absolute", top: "70%", alignItems: "center" }}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={{ color: "white", marginTop: 12, fontSize: 16 }}>
              Validating…
            </Text>
          </View>
        )}

        {/* Error message */}
        {error && !validating && (
          <View style={{ position: "absolute", bottom: 120 }}>
            <Text style={{ color: "#f87171", fontSize: 16, fontWeight: "600" }}>
              {error}
            </Text>
          </View>
        )}

        {/* Bottom buttons */}
        <View
          style={{
            position: "absolute",
            bottom: 40,
            flexDirection: "row",
            gap: 24,
          }}
        >
          {/* Flashlight toggle */}
          <Pressable
            onPress={() => setTorchOn(!torchOn)}
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "white", fontWeight: "500" }}>
              {torchOn ? "Light Off" : "Light On"}
            </Text>
          </Pressable>

          {/* Rescan button */}
          {scanned && !validating && (
            <Pressable
              onPress={handleRescan}
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "white", fontWeight: "500" }}>Rescan</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  )
}