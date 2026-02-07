import { CustomerBadgeScanner } from "@/components/businesses/shared/CustomerBadgeSanner";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { HeaderText, PrimaryButton } from "@/design-system";
import { SecondaryButton } from "@/design-system/components/buttons/SecondaryButton";
import { FormTextField } from "@/design-system/components/form/FormTextField";
import { useCreateStampRecordForm } from "@/hooks/forms/create-stamp-record/useCreateStampRecordForm";
import { useBottomSheetContext } from "@/lib/context/bottom-sheet";
import { useBusinessResourceContext } from "@/lib/context/business-resource";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { View } from "react-native";


export default function CreateStampRecordScreen() {
  const { id } = useLocalSearchParams();
  const { stampPrograms, loadingStampPrograms } = useBusinessResourceContext();
  const { open, close } = useBottomSheetContext();

  const form = useCreateStampRecordForm();

  const stampProgram = useMemo(() => {
    if (!stampPrograms) return null;
    return stampPrograms.find(program => program.id === id) ?? null
  }, [stampPrograms, id]);

  const openScanner = () => {
    open(
      <View style={{ height: "100%", backgroundColor: "black" }}>
        <CustomerBadgeScanner
          onScanned={async (payload) => {
            form.applyBadgePayload(payload)
            closeScanner()
          }}
        />
      </View>
    )
  }

  const closeScanner = () => {
    close();
  }

  if (loadingStampPrograms) {
    return <LoadingOverlay />
  }

  if (!stampProgram) {
    return (
      <View className="flex-1 items-center justify-center px-6">
        <HeaderText level={2}>Stamp program not found</HeaderText>
        <HeaderText level={4} className="mt-2 text-center">
          The stamp program you’re trying to use doesn’t exist or was removed.
        </HeaderText>
      </View>
    )
  }

  return (
    <View className="flex-1 px-4 py-6">
      {form.isSubmitting ? (
        <LoadingOverlay />
      ) : (
        <React.Fragment>
          <HeaderText level={1} className="mb-1">Create stamp record</HeaderText>
          <View className="mb-6">
            <FormTextField label="Stamp Program" value={stampProgram.title} editable={false} />
            <FormTextField
              label="Description"
              value={stampProgram.description}
              multiline={true}
              editable={false}
            />
            <FormTextField
              label="Issuance instructions"
              value={stampProgram.triggerInstructions}
              multiline={true}
              editable={false}
            />
            <FormTextField
              label="Employee instructions"
              value={stampProgram.employeeInstructions}
              multiline={true}
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
                title={form.isSubmitting ? "Creating reward..." : "Create reward"}
                className="flex-1"
                onPress={async () => await form.submit(stampProgram.id)}
              // TODO handle response
              // onPress={async () => {
              //   const ok = await form.submit(offerDefinition.business.id, offerDefinition.id)
              //   if (ok) {
              //     Toast.show({
              //       type: "success",
              //       text1: "Offer reward issued!",
              //       text2: `Thank you ${form.customerFullName}! 🎉`
              //     })
              //     router.replace("/(business-user)/business-dashboard/offers");
              //   }
              // }}
              />
            </View>
          )}
        </React.Fragment>
      )}
    </View>
  )
}