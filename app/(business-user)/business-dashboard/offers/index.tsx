import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { BodyText, HeaderText, ListCard, ListRow } from "@/design-system";
import { PrimaryButton } from "@/design-system/components/buttons/PrimaryButton";
import { OfferDefinition } from "@/lib/api/business-resource/business-resource.types";
import { useBusinessMembershipContext } from "@/lib/context/business-membership";
import { useBusinessResourceContext } from "@/lib/context/business-resource";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Text, View } from "react-native";


function OfferPreviewSheet({
  offer,
  onClose,
}: {
  offer: OfferDefinition
  onClose: () => void
}) {
  return (
    <View className="mt-4 p-4">
      <HeaderText level={3}>{offer.title}</HeaderText>
      <BodyText className="mt-1 text-gray-600">{offer.description}</BodyText>

      <View className="mt-6">
        <PrimaryButton
          title="Create Reward"
          onPress={() => {
            onClose();
            router.push({
              pathname: "/(business-user)/business-dashboard/offers/[id]/create-offer-reward",
              params: { id: offer.id }
            })
          }}
        />
      </View>
    </View>
  )
}

export default function OffersScreen() {

  const { activeBusinessRole } = useBusinessMembershipContext();
  const { offerDefinitions, loadingOfferDefinitions } = useBusinessResourceContext();

  if (!activeBusinessRole) {
    return;
  }

  const sheetRef = useRef<TrueSheet>(null);
  const [selectedOffer, setSelectedOffer] = useState<OfferDefinition | null>(null);

  const openSheet = (offer: OfferDefinition) => {
    setSelectedOffer(offer);
    sheetRef.current?.present();
  }

  const closeSheet = () => {
    sheetRef.current?.dismiss();
    setSelectedOffer(null);
  }

  return (
    <View className="flex-1 px-4 py-6">

      {/* Header */}
      <HeaderText level={1} className="mb-1">
        Offers
      </HeaderText>
      <BodyText className="mb-6">
        Available offers for {activeBusinessRole.business.name}
      </BodyText>

      {/* Loading */}
      {loadingOfferDefinitions && (
        <View className="mt-10 items-center">
          <LoadingOverlay />
        </View>
      )}

      {/* Empty state */}
      {!loadingOfferDefinitions && offerDefinitions.length === 0 && (
        <View className="mt-10 items-center">
          <Text className="text-gray-600">No offers defined yet</Text>
        </View>
      )}

      {/* List */}
      {!loadingOfferDefinitions && offerDefinitions.length > 0 && (
        <ListCard>
          {offerDefinitions.map((offer: OfferDefinition, index: number) => (
            <ListRow
              key={offer.id}
              title={offer.title}
              subtitle={offer.description}
              onPress={() => openSheet(offer)}
              showDivider={index < offerDefinitions.length - 1}
            />
          ))}
        </ListCard>
      )}
      <TrueSheet ref={sheetRef} detents={['auto']}>
        {selectedOffer && (
          <OfferPreviewSheet
            offer={selectedOffer}
            onClose={closeSheet}
          />
        )}
      </TrueSheet>
    </View>
  )

}