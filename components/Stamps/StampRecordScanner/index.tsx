import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function StampRecordScanner({ onScanned }: { onScanned: (id: string) => void }) {
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
    <View style={{ flex: 1 }}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={({ data }) => {
          if (!scanned) {
            setScanned(true);
            onScanned(data); // 👈 data is the string you encoded in your QR
            console.debug("scanned data:", data);
          }
        }}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"], // only scan QR codes
        }}
      />
      {scanned && (
        <Text style={{ position: "absolute", bottom: 20, alignSelf: "center" }}>
          QR scanned!
        </Text>
      )}
    </View>
  );
}