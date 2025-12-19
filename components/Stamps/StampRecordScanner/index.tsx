import { BarcodeScanningResult, CameraView, useCameraPermissions } from "expo-camera";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function StampRecordScanner({
  onScanned
}: {
  onScanned: (scanningResult: BarcodeScanningResult) => void
}) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (!permission.granted) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View className="flex-1">
      <CameraView
        // className="absolute inset-0"   // Tailwind: fills the parent
        style={{ width: "100%", height: "100%" }}
        onBarcodeScanned={(scanningResult: BarcodeScanningResult) => {
          if (!scanned) {
            setScanned(true);
            onScanned(scanningResult);
          }
        }}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />

      {scanned && (
        <View className="absolute bottom-10 w-full items-center">
          <Text className="text-white text-lg mb-2">QR scanned!</Text>
          <Pressable onPress={() => setScanned(false)}>
            <Text className="text-white underline">Scan again</Text>
          </Pressable>
        </View>
      )}
    </View>

  );
}