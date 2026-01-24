import { CustomerBadgeScanner } from "@/components/businesses/shared/CustomerBadgeSanner";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { HeaderText } from "@/design-system";
import { PrimaryButton } from "@/design-system/components/buttons/PrimaryButton";
import { SecondaryButton } from "@/design-system/components/buttons/SecondaryButton";
import { FormTextField } from "@/design-system/components/form/FormTextField";
import { useCreateOfferRewardForm } from "@/hooks/forms/create-offer-reward/useCreateOfferRewardForm";
import { OfferTypeText } from "@/lib/api/business-resource/business-resource.types";
import { useBusinessResourceContext } from "@/lib/context/business-resource";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { useLocalSearchParams } from "expo-router";
import { useMemo, useRef, useState } from "react";
import { Text, View } from "react-native";

export default function CreateOfferRewardScreen() {
  const { id } = useLocalSearchParams();
  const { offerDefinitions, loadingOfferDefinitions } = useBusinessResourceContext();
  const form = useCreateOfferRewardForm();
  const sheetRef = useRef<TrueSheet>(null);
  const [scannerOpen, setScannerOpen] = useState<boolean>(false);


  const offerDefinition = useMemo(() => {
    if (!offerDefinitions) return null
    return offerDefinitions.find(def => def.id === id) ?? null
  }, [offerDefinitions, id]);

  const openScanner = () => {
    setScannerOpen(true)
    sheetRef.current?.present()
  }

  const closeScanner = () => {
    sheetRef.current?.dismiss()
    setScannerOpen(false)
  }


  if (loadingOfferDefinitions) {
    return <LoadingOverlay />
  }

  if (!offerDefinition) {
    return (
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-lg font-semibold text-gray-800">
          Offer definition not found
        </Text>
        <Text className="text-gray-600 mt-2 text-center">
          The offer definition you’re trying to use doesn’t exist or was removed.
        </Text>
      </View>
    )
  }
  return (
    <View className="flex-1 px-4 py-6">
      <HeaderText level={1} className="mb-1">Create reward</HeaderText>
      <View className="mb-6">
        <FormTextField label="Offer title" value={offerDefinition.title} editable={false} />
        <FormTextField label="Description" value={offerDefinition.description} editable={false} multiline />
        <FormTextField label="Offer type" value={OfferTypeText[offerDefinition.offerType]} editable={false} />
        <FormTextField
          label="Customer name"
          value={!form.customerFullName ? "Scan customer badge" : form.customerFullName}
          editable={false}
        />
      </View>
      {!form.customerId ? (
        <PrimaryButton
          title="Scan customer badge"
          className="mt-6"
          onPress={openScanner}
        />
      ) : (
        <View className="flex-row gap-4 mt-6">
          <SecondaryButton
            title="Clear badge"
            className="flex-1"
            onPress={() => form.clearForm()}
          />
          <PrimaryButton
            title="Create reward"
            className="flex-1"
            onPress={async () => await form.submit(offerDefinition.business.id, offerDefinition.id)}
          />
        </View>
      )}
      <TrueSheet ref={sheetRef} detents={[0.8]}>
        {scannerOpen && (
          <View style={{ height: "100%", backgroundColor: "black" }}>
            <CustomerBadgeScanner
              onScanned={async (payload) => {
                form.applyBadgePayload(payload)
                closeScanner()
              }}
            />
          </View>
        )}
      </TrueSheet>

    </View>
  )
}
